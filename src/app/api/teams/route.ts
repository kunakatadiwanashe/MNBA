import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import dbConnect from "@/lib/mongodb";
import Team from "@/models/Team";
import User from "@/models/User";

export async function GET() {
  await dbConnect();
  try {
    const teams = await Team.find({});
    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch teams" }, { status: 500 });
    console.log(error)
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const data = await request.json();
    const { managerEmail, managerPassword, ...teamData } = data;

    // Validate required fields
    const requiredFields = ['name', 'logo', 'managerName', 'managerPic', 'headCoach', 'coachPic', 'phone', 'email', 'city'];
    for (const field of requiredFields) {
      if (!teamData[field] || teamData[field].trim() === '') {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    // Check if team name already exists
    const existingTeam = await Team.findOne({ name: teamData.name });
    if (existingTeam) {
      return NextResponse.json({ error: "Team name already exists" }, { status: 400 });
    }

    // Check if team email already exists
    const existingTeamEmail = await Team.findOne({ email: teamData.email });
    if (existingTeamEmail) {
      return NextResponse.json({ error: "Team email already exists" }, { status: 400 });
    }

    // Create team
    const team = new Team(teamData);
    await team.save();

    // If managerEmail and managerPassword provided, create manager user
    if (managerEmail && managerPassword) {
      // Check if manager email already exists
      const existingUser = await User.findOne({ email: managerEmail });
      if (existingUser) {
        return NextResponse.json({ error: "Manager email already exists" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(managerPassword, 12);
      const managerUser = new User({
        name: teamData.managerName,
        email: managerEmail,
        password: hashedPassword,
        role: 'team-manager',
        teamId: team._id,
      });
      await managerUser.save();
      // Update team with managerId
      team.managerId = managerUser._id;
      await team.save();
    }

    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create team" }, { status: 500 });
  }
}

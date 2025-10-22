import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Match from "@/models/Match";


export async function GET() {
  await dbConnect();
  try {
    const matches = await Match.find({}).populate('homeTeam', 'name').populate('awayTeam', 'name');
    return NextResponse.json(matches);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const data = await request.json();
    const { homeTeam, awayTeam, homeScore, awayScore, date, venue } = data;

    // Validate required fields
    if (!homeTeam || !awayTeam || homeScore === undefined || awayScore === undefined || !date || !venue) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if teams are different
    if (homeTeam === awayTeam) {
      return NextResponse.json({ error: "Home and away teams must be different" }, { status: 400 });
    }

    // Create match
    const match = new Match({
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      date,
      venue,
    });
    await match.save();

    return NextResponse.json(match, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create match" }, { status: 500 });
  }
}

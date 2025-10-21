import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import dbConnect from "@/lib/mongodb";
import Player from "@/models/Player";
import User from "@/models/User";

export async function GET() {
  await dbConnect();
  try {
    const players = await Player.find({});
    return NextResponse.json(players);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch players" }, { status: 500 });
    console.log(error)
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const data = await request.json();
    const { email, password, ...playerData } = data;

    // Restructure contact
    playerData.contact = {
      phone: playerData.phone,
      email: playerData.email,
    };
    delete playerData.phone;
    delete playerData.email;

    // Create player
    const player = new Player(playerData);
    await player.save();

    // If email and password provided, create user for login
    if (email && password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        name: playerData.fullName,
        email,
        password: hashedPassword,
        role: 'player',
        teamId: playerData.teamId,
      });
      await user.save();
    }

    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create player" }, { status: 500 });
  }
}

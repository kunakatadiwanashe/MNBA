// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import dbConnect from "@/lib/mongodb";
// import Player from "@/models/Player";


// export async function GET(
//   request: NextRequest,
//    { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params;
//   await dbConnect();
//   try {
//     const session = await getServerSession();
//     if (!session || session.user.role !== 'team-manager') {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const player = await Player.findById(params.id);
//     if (!player) {
//       return NextResponse.json({ error: "Player not found" }, { status: 404 });
//     }

//     // Check if the player belongs to the manager's team
//     if (player.teamId.toString() !== session.user.teamId) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     return NextResponse.json(player);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch player" }, { status: 500 });
//     console.log(error);
//   }
// }

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   await dbConnect();
//   try {
//     const session = await getServerSession();
//     if (!session || session.user.role !== 'team-manager') {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const player = await Player.findById(params.id);
//     if (!player) {
//       return NextResponse.json({ error: "Player not found" }, { status: 404 });
//     }

//     // Check if the player belongs to the manager's team
//     if (player.teamId.toString() !== session.user.teamId) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     const data = await request.json();
//     // Restructure contact if provided
//     if (data.phone || data.email) {
//       data.contact = {
//         phone: data.phone,
//         email: data.email,
//       };
//       delete data.phone;
//       delete data.email;
//     }

//     const updatedPlayer = await Player.findByIdAndUpdate(params.id, data, { new: true });

//     return NextResponse.json(updatedPlayer);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to update player" }, { status: 500 });
//     console.log(error);
//   }
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   await dbConnect();
//   try {
//     const session = await getServerSession();
//     if (!session || session.user.role !== 'team-manager') {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const player = await Player.findById(params.id);
//     if (!player) {
//       return NextResponse.json({ error: "Player not found" }, { status: 404 });
//     }

//     // Check if the player belongs to the manager's team
//     if (player.teamId.toString() !== session.user.teamId) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     await Player.findByIdAndDelete(params.id);

//     return NextResponse.json({ message: "Player deleted successfully" });

//   } catch (error) {
//     return NextResponse.json({ error: "Failed to delete player" }, { status: 500 });
//     console.log(error)
//   }
// }



import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Player from "@/models/Player";

// GET Player
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'team-manager') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const player = await Player.findById(id);
    if (!player) return NextResponse.json({ error: "Player not found" }, { status: 404 });

    if (player.teamId.toString() !== session.user.teamId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(player);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch player" }, { status: 500 });
  }
}

// PUT Player (UPDATE)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ Fix here
) {
  const { id } = await params;
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'team-manager') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const player = await Player.findById(id);
    if (!player) return NextResponse.json({ error: "Player not found" }, { status: 404 });

    if (player.teamId.toString() !== session.user.teamId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const data = await request.json();

    if (data.phone || data.email) {
      data.contact = {
        phone: data.phone,
        email: data.email,
      };
      delete data.phone;
      delete data.email;
    }

    const updatedPlayer = await Player.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updatedPlayer);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to update player" }, { status: 500 });
  }
}

// DELETE Player
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ Fix here
) {
  const { id } = await params;
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'team-manager') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const player = await Player.findById(id);
    if (!player) return NextResponse.json({ error: "Player not found" }, { status: 404 });

    if (player.teamId.toString() !== session.user.teamId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await Player.findByIdAndDelete(id);
    return NextResponse.json({ message: "Player deleted successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to delete player" }, { status: 500 });
  }
}

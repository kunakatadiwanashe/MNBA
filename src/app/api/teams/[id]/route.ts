

// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import dbConnect from "@/lib/mongodb";
// import Team from "@/models/Team";

// // GET team by ID
// export async function GET(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> } // ✅ Fixed type
// ) {
//   const { id } = await params; // Must await
//   await dbConnect();

//   try {
//     const session = await getServerSession();
//     if (!session || session.user.role !== 'team-manager') {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const team = await Team.findById(id);
//     if (!team) return NextResponse.json({ error: "Team not found" }, { status: 404 });

//     if (team._id.toString() !== session.user.teamId) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     return NextResponse.json(team);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
//   }
// }

// // PUT team by ID (update)
// export async function PUT(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> } // ✅ Fixed type
// ) {
//   const { id } = await params;
//   await dbConnect();

//   try {
//     const session = await getServerSession();
//     if (!session || session.user.role !== 'team-manager') {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const team = await Team.findById(id);
//     if (!team) return NextResponse.json({ error: "Team not found" }, { status: 404 });

//     if (team._id.toString() !== session.user.teamId) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     const data = await request.json();
//     const updatedTeam = await Team.findByIdAndUpdate(id, data, { new: true });

//     return NextResponse.json(updatedTeam);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: "Failed to update team" }, { status: 500 });
//   }
// }

// // (Optional) DELETE team by ID
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> } // ✅ Must await
// ) {
//   const { id } = await params;
//   await dbConnect();

//   try {
//     const session = await getServerSession();
//     if (!session || session.user.role !== 'team-manager') {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const team = await Team.findById(id);
//     if (!team) return NextResponse.json({ error: "Team not found" }, { status: 404 });

//     if (team._id.toString() !== session.user.teamId) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     await Team.findByIdAndDelete(id);
//     return NextResponse.json({ message: "Team deleted successfully" });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: "Failed to delete team" }, { status: 500 });
//   }
// }





import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Team from "@/models/Team";

// ✅ Correct typing for params (no Promise)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params; // ❌ no need to await
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "team-manager") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const team = await Team.findById(id);
    if (!team) return NextResponse.json({ error: "Team not found" }, { status: 404 });

    if (team._id.toString() !== session.user.teamId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(team);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "team-manager") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const team = await Team.findById(id);
    if (!team) return NextResponse.json({ error: "Team not found" }, { status: 404 });

    if (team._id.toString() !== session.user.teamId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const data = await request.json();
    const updatedTeam = await Team.findByIdAndUpdate(id, data, { new: true });

    return NextResponse.json(updatedTeam);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update team" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "team-manager") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const team = await Team.findById(id);
    if (!team) return NextResponse.json({ error: "Team not found" }, { status: 404 });

    if (team._id.toString() !== session.user.teamId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await Team.findByIdAndDelete(id);
    return NextResponse.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete team" }, { status: 500 });
  }
}

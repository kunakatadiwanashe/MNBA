// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import dbConnect from "@/lib/mongodb";
// import Team from "@/models/Team";


// export async function GET(
//   request: NextRequest,
//   // { params }: { params: { id: string } }
//    context: { params: Promise<{ id: string }> }
// ) {
//   // const { id } = params; 
//   const { id } = await context.params;
//   await dbConnect();

//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "team-manager") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const team = await Team.findById(id);
//     if (!team) return NextResponse.json({ error: "Team not found" }, { status: 404 });

//     if (team._id.toString() !== session.user.teamId) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     return NextResponse.json(team);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
//   }
// }

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;
//   await dbConnect();

//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "team-manager") {
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
//     console.error(error);
//     return NextResponse.json({ error: "Failed to update team" }, { status: 500 });
//   }
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;
//   await dbConnect();

//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "team-manager") {
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
//     console.error(error);
//     return NextResponse.json({ error: "Failed to delete team" }, { status: 500 });
//   }
// }




import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Team from "@/models/Team";

// ------------------ GET ------------------
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
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

// ------------------ PUT ------------------
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
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

// ------------------ DELETE ------------------
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
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

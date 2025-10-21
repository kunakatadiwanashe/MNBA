

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role?: "admin" | "team-manager" | "player"; // Add your roles
      teamId?: string; // Optional if needed
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "team-manager" | "player";
    teamId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string;
    role: "admin" | "team-manager" | "player";
    teamId?: string;
  }
}



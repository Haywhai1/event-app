import  { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;

    gender?: string;
    bio?: string;
    location?: string;

    role: "user" | "admin"; 
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;

      gender?: string;
      bio?: string;
      location?: string;

      role: "user" | "admin"; // 🔥 FIX
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;

    gender?: string;
    bio?: string;
    location?: string;

    role: "user" | "admin"; // 🔥 FIX
  }
}
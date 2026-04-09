import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    gender: string;
    bio: string;
    location: string;
  }

  interface Session {
    user: {
      id: string;
      gender: string;
      bio: string;
      location: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    gender: string;
    bio: string;
    location: string;
  }
}
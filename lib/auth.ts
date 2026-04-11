import CredentialsProvider from "next-auth/providers/credentials";
import { type AuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "./db";

/* ✅ ROLE TYPE */
type UserRole = "user" | "admin";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        await connectDB();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await User.findOne({
          email: credentials.email,
        }).lean();

        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          gender: user.gender || "",
          bio: user.bio || "",
          location: user.location || "",
          role: (user.role as UserRole) || "user", // ✅ FIXED
        };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    /* ✅ JWT */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.gender = user.gender;
        token.bio = user.bio;
        token.location = user.location;

        // ✅ ROLE
        token.role = (user.role as UserRole) || "user";
      }

      return token;
    },

    /* ✅ SESSION */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.gender = token.gender as string;
        session.user.bio = token.bio as string;
        session.user.location = token.location as string;

        // ✅ ROLE
        session.user.role = token.role as UserRole;
      }

      return session;
    },
  },
};
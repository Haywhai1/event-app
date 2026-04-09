import CredentialsProvider from "next-auth/providers/credentials";
import { type AuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "./db";

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

        if (!credentials?.email || !credentials?.password) return null;

        const user = await User.findOne({ email: credentials.email }).lean();
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          gender: user.gender || "",
          bio: user.bio || "",
          location: user.location || "",
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.gender = user.gender;
        token.bio = user.bio;
        token.location = user.location;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.gender = token.gender;
        session.user.bio = token.bio;
        session.user.location = token.location;
      }
      return session;
    },
  },
};
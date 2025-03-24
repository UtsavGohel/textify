import { connectToDB } from "@/app/lib/mongodb";
import User from "@/app/model/user";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";

export const authOption = {
  providers: [
    CredentialsProvider({
      name: "CredentialsProvider",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();

        const user = await User.findOne({ email: credentials?.email });

        if (!user) throw new Error("User does not exist");

        const isValidPassword = await bcrypt.compare(
          credentials?.password || "",
          user.password
        );

        if (!isValidPassword) throw new Error("Invalid credentials");

        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt" as const,
  } satisfies AuthOptions["session"],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id; // ✅ Ensure session has user ID
      }

      return session;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };

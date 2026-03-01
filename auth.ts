import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "./database/drizzle";
import { users } from "./database/schema";

export const { handlers, signOut, signIn, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET!,

   providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toString()))
          .limit(1);

        if (user.length === 0) return null;

        if (!user[0]?.password) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password.toString(),
          user[0].password,
        );

        if (!isPasswordValid) return null;

        return {
          id: user[0].id,
          email: user[0].email,
          name: user[0].name,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (!account || !user.email) return false;

      // Check if user exists
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email))
        .limit(1);

      let userId: string;

      if (existingUser.length === 0) {
        const newUser = await db
          .insert(users)
          .values({
            email: user.email,
            name: user.name,
          })
          .returning();

        userId = newUser[0]!.id;
      } else {
        userId = existingUser[0]!.id;
      }

      user.id = userId;
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});
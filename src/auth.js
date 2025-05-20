import NextAuth from "next-auth";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserByEmail, getUserById } from "@/lib/data";
import authConfig from "@/auth.config";
import { SendVerifyEmail } from "./lib/email/action";

export const options = {
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login",
    newUser: '/login?error=EmailSignin'
  },

  events: {
    async createUser({ user }) {
      // Este evento se dispara solo al crearse el usuario por primera vez
      if (user?.email && user?.id) {
        await SendVerifyEmail(user.email, user.id);
       
      }
    },

    async linkAccount({ user }) {
      // Solo para OAuth: si conecta una cuenta externa, marca el email como verificado
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  callbacks: {
    async signIn({ user }) {
      
       const dbUser = await getUserByEmail(user.email);

    if (!dbUser) {
      return true
    }

      if (!dbUser.emailVerified) {
        return "/login?error=EmailSignin";
      }

      if (!dbUser.active) {
        return "/login?error=AccessDenied";
      }

      return true;
    },

    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.active = token.active;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);
      if (!user || user.active === false) return null;

      token.role = user.role;
      token.active = user.active;
      return token;
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({ ...options, ...authConfig });

export class AuthError extends Error {
  constructor(code) {
    super(code);
    this.name = code;
  }
}

import NextAuth from "next-auth"
import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserByEmail, getUserById } from "@/lib/data"
import authConfig from "@/auth.config"


export const options = {
    session: { strategy: 'jwt' },
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/login'
    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user }) {
    const dbUser = await getUserByEmail(user.email);
    if (!dbUser || !dbUser.active) return false;
    return true;
  },
        async session({ session, token }) {
            session.user.id = token?.sub;     // Para recuperar ID de usuario desde el token
            session.user.role = token?.role 
            session.user.active = token?.active   // Para recuperar rol de usuario desde el token
            return session
        },

        async jwt({ token }) {
            if (!token.sub) return token;
            if (token.active == false) return token;
            const user = await getUserById(token.sub)
            if (!user.active ) return token;
             

            token.role = user?.role
            token.active = user?.active
            return token
        }
    },
}



export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({ ...options, ...authConfig })

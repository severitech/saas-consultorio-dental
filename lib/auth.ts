import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const opcionesAuth: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        // Obtener información adicional del usuario desde la base de datos
        const usuarioDB = await prisma.usuario.findUnique({
          where: { correo: user.email || "" },
          include: {
            rolSistema: true,
            empresa: true,
          },
        });

        if (usuarioDB) {
          (session.user as any).id = usuarioDB.id;
          (session.user as any).rolId = usuarioDB.rolSistemaId;
          (session.user as any).rol = usuarioDB.rolSistema?.nombre;
          (session.user as any).empresaId = usuarioDB.empresaId;
          (session.user as any).empresa = usuarioDB.empresa?.nombre;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/iniciar-sesion",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

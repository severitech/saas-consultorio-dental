import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import prisma from "@/lib/prisma";

export const opcionesAuth: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Cuando el usuario inicia sesión por primera vez
      if (account && user) {
        token.id = user.id;
        token.email = user.email;
        
        // Buscar o crear el usuario en la base de datos usando nombres en español
        const usuarioDB = await prisma.usuario.upsert({
          where: { correo: user.email || "" },
          update: {
            nombre: user.name || "",
            imagen: user.image,
            emailVerified: new Date(),
          },
          create: {
            correo: user.email || "",
            nombre: user.name || "",
            imagen: user.image,
            emailVerified: new Date(),
            rolId: "", // Vacío por defecto, se asignará después
            estado: true, // Estado activo por defecto
          },
          include: {
            rolSistema: true,
            empresa: true,
          },
        });

        // Validar que el usuario esté activo
        if (!usuarioDB.estado) {
          throw new Error("Usuario inactivo. Contacta al administrador.");
        }

        // Guardar la cuenta OAuth usando los campos en español
        const cuentaExistente = await prisma.cuenta.findFirst({
          where: {
            proveedor: account.provider,
            idCuentaProveedor: account.providerAccountId,
          },
        });

        await prisma.cuenta.upsert({
          where: {
            id: cuentaExistente?.id || "",
          },
          update: {
            tokenAcceso: account.access_token,
            expiraEn: account.expires_at,
            tokenRefresco: account.refresh_token,
            idToken: account.id_token,
            tipoToken: account.token_type,
            alcance: account.scope,
          },
          create: {
            usuarioId: usuarioDB.id,
            tipo: account.type,
            proveedor: account.provider,
            idCuentaProveedor: account.providerAccountId,
            tokenAcceso: account.access_token,
            expiraEn: account.expires_at,
            tokenRefresco: account.refresh_token,
            idToken: account.id_token,
            tipoToken: account.token_type,
            alcance: account.scope,
          },
        });

        token.usuarioId = usuarioDB.id;
        token.rolId = usuarioDB.rolSistemaId ?? undefined;
        token.rol = usuarioDB.rolSistema?.nombre;
        token.empresaId = usuarioDB.empresaId ?? undefined;
        token.empresa = usuarioDB.empresa?.nombre;
        token.name = usuarioDB.nombre ?? undefined;
        token.email = usuarioDB.correo ?? undefined;
        token.image = usuarioDB.imagen ?? undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.usuarioId;
        (session.user as any).rolId = token.rolId;
        (session.user as any).rol = token.rol;
        (session.user as any).empresaId = token.empresaId;
        (session.user as any).empresa = token.empresa;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
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

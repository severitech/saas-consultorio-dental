import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      rolId?: string;
      rol?: string;
      empresaId?: string;
      empresa?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    rolId?: string;
    rol?: string;
    empresaId?: string;
    empresa?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    rolId?: string;
    rol?: string;
    empresaId?: string;
    empresa?: string;
  }
}

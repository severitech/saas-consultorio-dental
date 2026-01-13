"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ProveedorSesionProps {
  children: ReactNode;
}

export default function ProveedorSesion({ children }: ProveedorSesionProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectorRutaProps {
  children: React.ReactNode;
  rolesPermitidos?: string[];
  redireccionarA?: string;
}

export default function ProtectorRuta({
  children,
  rolesPermitidos,
  redireccionarA = "/auth/iniciar-sesion",
}: ProtectorRutaProps) {
  const { data: sesion, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!sesion) {
      router.push(redireccionarA);
      return;
    }

    if (rolesPermitidos && rolesPermitidos.length > 0) {
      const usuarioRol = (sesion.user as any)?.rol;
      if (!usuarioRol || !rolesPermitidos.includes(usuarioRol)) {
        router.push("/no-autorizado");
      }
    }
  }, [sesion, status, router, rolesPermitidos, redireccionarA]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!sesion) {
    return null;
  }

  if (rolesPermitidos && rolesPermitidos.length > 0) {
    const usuarioRol = (sesion.user as any)?.rol;
    if (!usuarioRol || !rolesPermitidos.includes(usuarioRol)) {
      return null;
    }
  }

  return <>{children}</>;
}

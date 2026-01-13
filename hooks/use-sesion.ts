"use client";

import { useSession, signOut } from "next-auth/react";

export function useSesion() {
  const { data: sesion, status } = useSession();
  
  const cargando = status === "loading";
  const autenticado = status === "authenticated";
  const usuario = sesion?.user;

  return {
    sesion,
    usuario,
    cargando,
    autenticado,
    cerrarSesion: () => signOut({ callbackUrl: "/auth/iniciar-sesion" }),
  };
}

export function useRol() {
  const { usuario } = useSesion();
  
  const esAdmin = usuario?.rol === "SUPER_ADMIN" || usuario?.rol === "ADMINISTRADOR";
  const esDoctor = usuario?.rol === "DOCTOR";
  const esAsistente = usuario?.rol === "ASISTENTE";
  const esPaciente = usuario?.rol === "PACIENTE";

  const tieneRol = (roles: string[]) => {
    if (!usuario?.rol) return false;
    return roles.includes(usuario.rol);
  };

  return {
    esAdmin,
    esDoctor,
    esAsistente,
    esPaciente,
    tieneRol,
    rol: usuario?.rol,
  };
}

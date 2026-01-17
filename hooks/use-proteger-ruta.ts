"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSesion } from "./use-sesion";

export function useProtegerRuta() {
  const router = useRouter();
  const { usuario, cargando } = useSesion();

  useEffect(() => {
    if (!cargando && !usuario) {
      router.push("/auth/iniciar-sesion");
    }
  }, [usuario, cargando, router]);

  return { usuario, cargando };
}

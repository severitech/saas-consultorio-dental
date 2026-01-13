"use client";

import { useSesion, useRol } from "@/hooks/use-sesion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconLogout, IconUser, IconSettings } from "@tabler/icons-react";

export default function MenuUsuario() {
  const { usuario, cerrarSesion, autenticado } = useSesion();
  const { rol } = useRol();

  if (!autenticado || !usuario) {
    return null;
  }

  const iniciales = usuario.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={usuario.image || ""} alt={usuario.name || ""} />
            <AvatarFallback>{iniciales}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{usuario.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {usuario.email}
            </p>
            {rol && (
              <p className="text-xs leading-none text-muted-foreground mt-1">
                Rol: {rol}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <IconUser className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconSettings className="mr-2 h-4 w-4" />
          <span>Configuración</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => cerrarSesion()}>
          <IconLogout className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

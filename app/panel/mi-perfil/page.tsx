"use client";

import { useProtegerRuta } from "@/hooks/use-proteger-ruta";
import { useSesion } from "@/hooks/use-sesion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeaderPanel } from "@/components/Panel/Header-Panel";

export default function MiPerfilPage() {
  const { usuario, cargando } = useProtegerRuta();
  const { cerrarSesion } = useSesion();

  if (cargando) {
    return (
      <div className="flex flex-1 flex-col">
        <HeaderPanel titulo="Mi Perfil" />
        <div className="flex items-center justify-center flex-1">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return null; // El hook ya redirige
  }

  return (
    <div className="flex flex-1 flex-col">
      <HeaderPanel titulo="Mi Perfil" />
      <div className="p-4 md:p-6 lg:p-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">Mi Perfil</CardTitle>
            <p className="text-muted-foreground">
              Información de tu cuenta
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar y Nombre */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={usuario.image || ""} alt={usuario.name || ""} />
                <AvatarFallback className="text-2xl">
                  {usuario.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{usuario.name || "Usuario"}</h2>
                <p className="text-muted-foreground">{usuario.email}</p>
              </div>
            </div>

            {/* Información Detallada */}
            <div className="space-y-4 border-t pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">ID de Usuario</p>
                  <p className="font-mono text-sm">{(usuario as any).id || "No disponible"}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Rol</p>
                  {(usuario as any).rol ? (
                    <Badge variant="secondary">{(usuario as any).rol}</Badge>
                  ) : (
                    <p className="text-sm text-muted-foreground">No asignado</p>
                  )}
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Empresa</p>
                  <p className="text-sm">
                    {(usuario as any).empresa || "No asignada"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Email Verificado</p>
                  <Badge variant="default">✓ Verificado</Badge>
                </div>
              </div>
            </div>

            {/* Información Adicional */}
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">📌 Información</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Tu sesión expira en 30 días</li>
                <li>• Puedes cerrar sesión en cualquier momento</li>
                <li>• Para asignar un rol, contacta al administrador</li>
              </ul>
            </div>

            {/* Acciones */}
            <div className="flex gap-3">
              <Button onClick={cerrarSesion} variant="destructive" className="flex-1">
                Cerrar Sesión
              </Button>
              <Button variant="outline" className="flex-1">
                Editar Perfil
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

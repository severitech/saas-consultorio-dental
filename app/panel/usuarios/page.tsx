"use client";

import { useProtegerRuta } from "@/hooks/use-proteger-ruta";
import { HeaderPanel } from "@/components/Panel/Header-Panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UsuariosAdminPage() {
  const { usuario, cargando } = useProtegerRuta();

  if (cargando) {
    return (
      <div className="flex flex-1 flex-col">
        <HeaderPanel 
          titulo="Usuarios" 
          breadcrumbs={[
            { label: "Usuarios" }
          ]} 
        />
        <div className="flex items-center justify-center flex-1">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <HeaderPanel 
        titulo="Usuarios" 
        breadcrumbs={[
          { label: "Usuarios" }
        ]} 
      />
      <div className="p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Usuarios - Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Contenido de gestión de usuarios administrador</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

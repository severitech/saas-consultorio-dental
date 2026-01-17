"use client";

import { useProtegerRuta } from "@/hooks/use-proteger-ruta";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeaderPanel } from "@/components/Panel/Header-Panel";

function Page() {
  const { usuario, cargando } = useProtegerRuta();

  if (cargando) {
    return (
      <div className="flex flex-1 flex-col">
        <HeaderPanel titulo="Panel de Administración" />
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
      <HeaderPanel titulo="Panel de Administración" />
      <div className="p-4 md:p-8 space-y-4">
      <h1 className="text-3xl font-bold">Panel de Administración</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Información de Usuario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={usuario?.image || ""} alt={usuario?.name || ""} />
              <AvatarFallback>{usuario?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-lg">{usuario?.name || "Sin nombre"}</p>
              <p className="text-sm text-muted-foreground">{usuario?.email || "Sin email"}</p>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <h3 className="font-semibold">Datos completos:</h3>
            <pre className="bg-muted p-4 rounded-md overflow-auto">
              {JSON.stringify(usuario, null, 2)}
            </pre>
          </div>

          
        </CardContent>
      </Card>
      </div>
    </div>
  );
}

export default Page;
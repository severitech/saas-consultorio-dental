"use client";

import { useSesion } from "@/hooks/use-sesion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

function Page() {
  const { usuario, cargando, autenticado } = useSesion();

  if (cargando) {
    return (
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <div className="p-4 md:p-8">Cargando sesión...</div>
      </div>
    );
  }

  if (!autenticado) {
    return (
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <div className="p-4 md:p-8">No autenticado</div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Panel de Administración</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
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
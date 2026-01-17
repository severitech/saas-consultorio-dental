"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { PlanInterface } from "@/interface/suscripciones";

interface TablaplanesProps {
  planes: PlanInterface[];
  onEditar: (plan: PlanInterface) => void;
  onEliminar: (id: string) => void;
  cargando: boolean;
}

export function TablaPlanes({
  planes,
  onEditar,
  onEliminar,
  cargando,
}: TablaplanesProps) {
  if (cargando) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (planes.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No hay planes registrados. Crea tu primer plan para comenzar.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>Lista de planes de suscripción disponibles</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio Mensual</TableHead>
            <TableHead className="hidden md:table-cell">Descripción</TableHead>
            <TableHead className="hidden sm:table-cell">Creado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {planes.map((plan) => (
            <TableRow key={plan.id}>
              <TableCell className="font-medium">{plan.nombre}</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  ${plan.precioMensual.toFixed(2)} / mes
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell max-w-xs truncate">
                {plan.descripcion || (
                  <span className="text-muted-foreground italic">
                    Sin descripción
                  </span>
                )}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {new Date(plan.createdAt).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditar(plan)}
                    title="Editar plan"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEliminar(plan.id)}
                    title="Eliminar plan"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

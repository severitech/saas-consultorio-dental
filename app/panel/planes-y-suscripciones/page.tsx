"use client";

import { useState, useEffect } from "react";
import { useProtegerRuta } from "@/hooks/use-proteger-ruta";
import { HeaderPanel } from "@/components/Panel/Header-Panel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { FormularioPlan } from "@/components/Panel/plan/FormularioPlan";
import { TablaPlanes } from "@/components/Panel/plan/TablaPlanes";
import { PlanInterface } from "@/interface/suscripciones";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function PlanesYSuscripcionesPage() {
  const { usuario, cargando: cargandoSesion } = useProtegerRuta();
  const [planes, setPlanes] = useState<PlanInterface[]>([]);
  const [cargandoPlanes, setCargandoPlanes] = useState(true);
  const [modalFormulario, setModalFormulario] = useState(false);
  const [planEditar, setPlanEditar] = useState<PlanInterface | null>(null);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [planEliminar, setPlanEliminar] = useState<string | null>(null);

  const cargarPlanes = async () => {
    setCargandoPlanes(true);
    try {
      const response = await fetch("/api/planes");
      if (!response.ok) throw new Error("Error al cargar planes");
      const data = await response.json();
      setPlanes(data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al cargar los planes");
    } finally {
      setCargandoPlanes(false);
    }
  };

  useEffect(() => {
    if (usuario) {
      cargarPlanes();
    }
  }, [usuario]);

  const handleNuevoPlan = () => {
    setPlanEditar(null);
    setModalFormulario(true);
  };

  const handleEditarPlan = (plan: PlanInterface) => {
    setPlanEditar(plan);
    setModalFormulario(true);
  };

  const handleEliminarClick = (id: string) => {
    setPlanEliminar(id);
    setModalEliminar(true);
  };

  const handleEliminarConfirmar = async () => {
    if (!planEliminar) return;

    try {
      const response = await fetch(`/api/planes/${planEliminar}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error al eliminar el plan");
      }

      toast.success("Plan eliminado correctamente");
      cargarPlanes();
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error instanceof Error ? error.message : "Error al eliminar el plan"
      );
    } finally {
      setModalEliminar(false);
      setPlanEliminar(null);
    }
  };

  const handleFormularioSuccess = () => {
    cargarPlanes();
  };

  if (cargandoSesion) {
    return (
      <div className="flex flex-1 flex-col">
        <HeaderPanel
          titulo="Planes y Suscripciones"
          breadcrumbs={[
            { label: "Super Admin", href: "/panel/super-admin" },
            { label: "Planes y Suscripciones" },
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
        titulo="Planes y Suscripciones"
        breadcrumbs={[
          { label: "Super Admin", href: "/panel/super-admin" },
          { label: "Planes y Suscripciones" },
        ]}
      />
      <div className="p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">Gestión de Planes</CardTitle>
                <CardDescription className="mt-1.5">
                  Administra los planes de suscripción disponibles
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={cargarPlanes}
                  disabled={cargandoPlanes}
                  title="Recargar planes"
                >
                  <RefreshCw className={`h-4 w-4 ${cargandoPlanes ? "animate-spin" : ""}`} />
                </Button>
                <Button onClick={handleNuevoPlan}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Plan
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <TablaPlanes
              planes={planes}
              onEditar={handleEditarPlan}
              onEliminar={handleEliminarClick}
              cargando={cargandoPlanes}
            />
          </CardContent>
        </Card>
      </div>

      {/* Modal Formulario */}
      <FormularioPlan
        open={modalFormulario}
        onOpenChange={setModalFormulario}
        planEditar={planEditar}
        onSuccess={handleFormularioSuccess}
      />

      {/* Modal Confirmar Eliminación */}
      <AlertDialog open={modalEliminar} onOpenChange={setModalEliminar}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El plan será eliminado
              permanentemente de la base de datos.
              {planEliminar && (
                <span className="block mt-2 font-medium text-foreground">
                  Nota: No se pueden eliminar planes con suscripciones activas.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleEliminarConfirmar}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

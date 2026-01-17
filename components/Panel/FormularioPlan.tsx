"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlanInterface } from "@/interface/suscripciones";
import { toast } from "sonner";

interface FormularioPlanProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planEditar?: PlanInterface | null;
  onSuccess: () => void;
}

export function FormularioPlan({
  open,
  onOpenChange,
  planEditar,
  onSuccess,
}: FormularioPlanProps) {
  const [guardando, setGuardando] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    nombre: "",
    precioMensual: "",
    descripcion: "",
  });

  // Cargar datos si es edición
  useEffect(() => {
    if (planEditar) {
      setFormData({
        nombre: planEditar.nombre,
        precioMensual: planEditar.precioMensual.toString(),
        descripcion: planEditar.descripcion || "",
      });
    } else {
      setFormData({
        nombre: "",
        precioMensual: "",
        descripcion: "",
      });
    }
    setErrores({});
  }, [planEditar, open]);

  const validarFormulario = () => {
    const nuevosErrores: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }

    if (!formData.precioMensual) {
      nuevosErrores.precioMensual = "El precio es obligatorio";
    } else if (parseFloat(formData.precioMensual) < 0) {
      nuevosErrores.precioMensual = "El precio no puede ser negativo";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    setGuardando(true);

    try {
      const url = planEditar
        ? `/api/planes/${planEditar.id}`
        : "/api/planes";
      
      const method = planEditar ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre.trim(),
          precioMensual: parseFloat(formData.precioMensual),
          descripcion: formData.descripcion.trim() || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error al guardar el plan");
      }
      
      onSuccess();
      onOpenChange(false);
      toast.success(
        planEditar ? "Plan actualizado correctamente" : "Plan creado correctamente"
      );
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Error al guardar el plan");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {planEditar ? "Editar Plan" : "Crear Nuevo Plan"}
            </DialogTitle>
            <DialogDescription>
              {planEditar
                ? "Modifica los datos del plan"
                : "Completa los datos para crear un nuevo plan"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Nombre */}
            <div className="grid gap-2">
              <Label htmlFor="nombre">
                Nombre del Plan <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                placeholder="Ej: Plan Básico, Plan Premium"
                disabled={guardando}
              />
              {errores.nombre && (
                <p className="text-sm text-red-500">{errores.nombre}</p>
              )}
            </div>

            {/* Precio Mensual */}
            <div className="grid gap-2">
              <Label htmlFor="precioMensual">
                Precio Mensual (USD) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="precioMensual"
                type="number"
                step="0.01"
                min="0"
                value={formData.precioMensual}
                onChange={(e) =>
                  setFormData({ ...formData, precioMensual: e.target.value })
                }
                placeholder="0.00"
                disabled={guardando}
              />
              {errores.precioMensual && (
                <p className="text-sm text-red-500">{errores.precioMensual}</p>
              )}
            </div>

            {/* Descripción */}
            <div className="grid gap-2">
              <Label htmlFor="descripcion">Descripción (opcional)</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                placeholder="Describe las características del plan..."
                rows={4}
                disabled={guardando}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={guardando}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={guardando}>
              {guardando
                ? "Guardando..."
                : planEditar
                ? "Actualizar Plan"
                : "Crear Plan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

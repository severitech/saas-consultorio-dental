"use client";

import { useState, useEffect } from "react";
import { useProtegerRuta } from "@/hooks/use-proteger-ruta";
import { HeaderPanel } from "@/components/Panel/Header-Panel";
import { Card } from "@/components/ui/card";
import { CalendarioComponente } from "@/components/Panel/calendario";
import { citasEjemplo } from "@/components/Panel/calendario/datos-ejemplo";
import type { Cita } from "@/components/Panel/calendario";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "@/components/Panel/calendario/calendario.css";

export default function CalendarioPage() {
  const { usuario, cargando: cargandoSesion } = useProtegerRuta();
  const [citas, setCitas] = useState<Cita[]>(citasEjemplo); // Usar datos de ejemplo por defecto
  const [cargando, setCargando] = useState(false); // Cambiar a false porque ya tenemos datos

  // Cargar citas desde el API (comentado para usar datos de ejemplo)
  useEffect(() => {
    if (usuario) {
      // Descomentar cuando tengas el API listo
      // cargarCitas();
    }
  }, [usuario]);

  const cargarCitas = async () => {
    setCargando(true);
    try {
      const response = await fetch("/api/citas");
      if (!response.ok) {
        // Si falla el API, usar datos de ejemplo
        setCitas(citasEjemplo);
        return;
      }
      const data = await response.json();
      setCitas(data);
    } catch (error) {
      console.error("Error:", error);
      // En caso de error, usar datos de ejemplo
      setCitas(citasEjemplo);
      toast.info("Mostrando datos de ejemplo", {
        description: "No se pudo conectar con el servidor.",
      });
    } finally {
      setCargando(false);
    }
  };

  // Función para actualizar una cita cuando se arrastra
  const actualizarCita = async (id: string, inicio: Date, fin: Date) => {
    try {
      // Actualizar localmente primero
      setCitas(prevCitas => 
        prevCitas.map(cita => 
          cita.id === id 
            ? { ...cita, start: inicio, end: fin }
            : cita
        )
      );

      // Descomentar cuando tengas el API listo
      /*
      const response = await fetch(`/api/citas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fecha_inicio: inicio.toISOString(),
          fecha_fin: fin.toISOString(),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error al actualizar la cita");
      }

      // Recargar citas
      await cargarCitas();
      */
    } catch (error) {
      throw error; // Re-lanzar para que el calendario maneje el error
    }
  };

  // Función para crear una nueva cita cuando se selecciona un rango
  const crearCita = (inicio: Date, fin: Date) => {
    toast.info('Crear nueva cita', {
      description: `${format(inicio, "d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })} - ${format(fin, 'HH:mm', { locale: es })}`,
      action: {
        label: 'Crear',
        onClick: () => {
          // Aquí puedes abrir un modal para crear la cita
          console.log('Crear cita:', { inicio, fin });
        },
      },
    });
  };

  if (cargandoSesion) {
    return (
      <div className="flex flex-1 flex-col">
        <HeaderPanel
          titulo="Calendario"
          breadcrumbs={[
            { label: "Calendario" },
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
    <div className="flex flex-1 flex-col h-screen">
      <HeaderPanel
        titulo="Calendario de Citas"
        breadcrumbs={[
          { label: "Calendario" },
        ]}
      />
      
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
        <Card className="h-full p-4">
          {cargando ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <CalendarioComponente 
              onCrearCita={crearCita}
              citas={citas} 
              onActualizarCita={actualizarCita}
            />
          )}
        </Card>
      </div>
    </div>
  );
}

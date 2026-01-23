'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { Cita } from '@/components/Panel/calendario/tipos';

// Importar calendario de forma dinámica para evitar problemas de SSR
const CalendarioComponente = dynamic(
  () => import('@/components/Panel/calendario/Calendario'),
  { ssr: false }
);

interface ProgramarCitaProps {
  proximaCita: string;
  onProximaCitaChange: (fecha: string) => void;
  consultaId?: string;
  pacienteId?: string;
  nombrePaciente?: string;
}

export function ProgramarCita({
  proximaCita,
  onProximaCitaChange,
  consultaId,
  pacienteId,
  nombrePaciente
}: ProgramarCitaProps) {
  const [citasExistentes] = useState<Cita[]>([]);

  const handleCrearCita = (inicio: Date, fin: Date) => {
    const fechaFormateada = inicio.toISOString().slice(0, 16);
    onProximaCitaChange(fechaFormateada);
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <Card className="p-2 bg-linear-to-br from-blue-50 to-cyan-50 border-blue-200">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-sm text-blue-900">Programar Próxima Cita</h3>
        </div>
        <p className="text-[10px] text-blue-700 mt-1">
          Selecciona fecha y hora en el calendario
        </p>
      </Card>

      {/* Fecha seleccionada */}
      {proximaCita && (
        <Card className="p-2 bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-green-600" />
              <span className="text-xs font-semibold text-green-900">Cita Programada:</span>
            </div>
            <Badge variant="outline" className="text-[9px] px-1.5 py-0.5">
              Confirmada
            </Badge>
          </div>
          <div className="mt-1.5">
            <p className="text-sm font-bold text-green-700">
              {new Date(proximaCita).toLocaleDateString('es-MX', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-xs text-green-600 mt-0.5">
              Hora: {new Date(proximaCita).toLocaleTimeString('es-MX', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </Card>
      )}

      {/* Calendario */}
      <Card className="p-1 overflow-hidden">
        <div className="rounded overflow-hidden">
          <CalendarioComponente
            citas={citasExistentes}
            onCrearCita={handleCrearCita}
            consultaId={consultaId}
            pacienteId={pacienteId}
            modoCompacto={true}
            alturaMinima="450px"
          />
        </div>
      </Card>

      {/* Ayuda */}
      <Card className="p-2 bg-gray-50 border-gray-200">
        <p className="text-[9px] text-gray-600 text-center">
          Haz clic en un espacio disponible del calendario para programar la cita
        </p>
      </Card>
    </div>
  );
}

"use client";

import { format, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import type { EventoCita } from './tipos';

interface CeldaMesProps {
  date: Date;
  events: EventoCita[];
}

export function CeldaMes({ date, events }: CeldaMesProps) {
  // Filtrar eventos del día
  const citasDelDia = events.filter(event => isSameDay(new Date(event.start), date));
  
  const totalCitas = citasDelDia.length;

  return (
    <div className="h-full flex flex-col p-1">
      {/* Número del día */}
      <div className="text-sm font-semibold mb-1">
        {format(date, 'd')}
      </div>
      
      {/* Contador de citas */}
      {totalCitas > 0 && (
        <div className="mt-auto">
          <Badge 
            variant="secondary" 
            className="text-xs px-1.5 py-0.5"
          >
            {totalCitas} {totalCitas === 1 ? 'cita' : 'citas'}
          </Badge>
        </div>
      )}
    </div>
  );
}

"use client";

import { format, isSameDay } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export function CitaCountCell({
  date,
  events,
}: {
  date: Date;
  events: any[];
}) {
  // Filtrar eventos del día usando date-fns
  const citasDelDia = events.filter(event => 
    isSameDay(new Date(event.start), date)
  );
  
  const count = citasDelDia.length;

  return (
    <div className="h-full flex flex-col p-1.5 min-h-[80px]">
      {/* Número del día */}
      <div className="text-sm font-semibold mb-1 text-foreground">
        {format(date, 'd')}
      </div>
      
      {/* Contador de citas */}
      {count > 0 && (
        <div className="mt-auto">
          <Badge 
            variant="default" 
            className="text-xs px-2 py-0.5 bg-primary/90 hover:bg-primary"
          >
            {count} {count === 1 ? 'cita' : 'citas'}
          </Badge>
        </div>
      )}
    </div>
  );
}
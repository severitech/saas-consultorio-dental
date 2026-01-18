"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Clock, User, UserCog, FileText } from 'lucide-react';
import type { EventoCita } from './tipos';

interface EventoCitaProps {
  event: EventoCita;
}

export function EventoCita({ event }: EventoCitaProps) {
  const estadoBadge = {
    pendiente: 'default',
    confirmada: 'default',
    cancelada: 'destructive',
    completada: 'secondary',
  } as const;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div className="cursor-pointer w-full h-full flex items-center px-1">
            <span className="text-xs font-medium truncate">{event.title}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="w-80 p-0">
          <div className="p-4 space-y-3">
            {/* Título y estado */}
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-semibold text-base">{event.motivo || event.title}</h4>
              <Badge variant={estadoBadge[event.estado as keyof typeof estadoBadge] || 'default'}>
                {event.estado}
              </Badge>
            </div>

            {/* Información del paciente */}
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Paciente:</span>
              <span>{event.paciente || 'No asignado'}</span>
            </div>

            {/* Información del doctor */}
            {event.doctor && (
              <div className="flex items-center gap-2 text-sm">
                <UserCog className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Doctor:</span>
                <span>{event.doctor}</span>
              </div>
            )}

            {/* Horario */}
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Horario:</span>
              </div>
              <div className="pl-6 text-muted-foreground">
                <p>{format(event.start, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}</p>
                <p>
                  {format(event.start, 'HH:mm', { locale: es })} - {format(event.end, 'HH:mm', { locale: es })}
                </p>
              </div>
            </div>

            {/* Consultorio */}
            {event.consultorio && (
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Consultorio:</span>
                <span>{event.consultorio}</span>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
 
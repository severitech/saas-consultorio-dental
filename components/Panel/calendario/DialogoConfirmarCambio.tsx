"use client";

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
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock } from 'lucide-react';

interface DialogoConfirmarCambioProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  fechaAnterior?: Date;
  fechaNueva?: Date;
}

export function DialogoConfirmarCambio({
  open,
  onConfirm,
  onCancel,
  fechaAnterior,
  fechaNueva,
}: DialogoConfirmarCambioProps) {
  return (
    <AlertDialog open={open} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            ¿Confirmar cambio de fecha?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3 pt-2">
              <p>Se modificará el horario de la cita:</p>
              
              {fechaAnterior && fechaNueva && (
                <div className="space-y-2 rounded-lg bg-muted p-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Fecha anterior:</p>
                      <p className="text-muted-foreground">
                        {format(fechaAnterior, "EEEE, d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="h-px bg-border" />
                  
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Nueva fecha:</p>
                      <p className="text-foreground">
                        {format(fechaNueva, "EEEE, d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Confirmar cambio
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

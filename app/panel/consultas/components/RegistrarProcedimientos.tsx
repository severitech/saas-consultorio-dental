'use client';

import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { SesionTratamiento } from '../constas';

interface RegistrarProcedimientosProps {
  sesionActual: SesionTratamiento;
  procedimientosRealizados: string[];
  observaciones: string;
  onProcedimientoToggle: (procedimiento: string) => void;
  onObservacionesChange: (observaciones: string) => void;
}

export function RegistrarProcedimientos({
  sesionActual,
  procedimientosRealizados,
  observaciones,
  onProcedimientoToggle,
  onObservacionesChange
}: RegistrarProcedimientosProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4">Registrar Procedimientos Realizados</h3>
        <p className="text-sm text-gray-600 mb-4">
          Marca los procedimientos que se completaron en esta sesión:
        </p>

        <div className="space-y-3">
          {sesionActual.procedimientos.map((procedimiento, idx) => (
            <div key={idx} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200">
              <Checkbox 
                id={`proc-${idx}`}
                checked={procedimientosRealizados.includes(procedimiento)}
                onCheckedChange={() => onProcedimientoToggle(procedimiento)}
              />
              <Label 
                htmlFor={`proc-${idx}`}
                className="flex-1 cursor-pointer text-gray-900"
              >
                {procedimiento}
              </Label>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Label htmlFor="observaciones" className="mb-2 block">
            Observaciones de la Sesión
          </Label>
          <Textarea 
            id="observaciones"
            placeholder="Escribe cualquier observación importante sobre los procedimientos realizados..."
            value={observaciones}
            onChange={(e) => onObservacionesChange(e.target.value)}
            rows={4}
            className="w-full"
          />
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>Procedimientos Completados:</strong> {procedimientosRealizados.length} de {sesionActual.procedimientos.length}
          </p>
        </div>
      </Card>
    </div>
  );
}

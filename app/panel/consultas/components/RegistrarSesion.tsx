'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, CheckCircle2, Plus, FileText } from 'lucide-react';
import type { SesionTratamiento } from '../constas';

interface RegistrarSesionProps {
  sesionCronograma: SesionTratamiento;
  onMontoChange: (monto: number) => void;
  onObservacionesChange: (observaciones: string) => void;
  onProcedimientoToggle: (procedimiento: string) => void;
  procedimientosRealizados: string[];
  monto: number;
  observaciones: string;
  usarCronograma: boolean;
  onUsarCronogramaChange: (usar: boolean) => void;
  nuevoProcedimiento: string;
  onNuevoProcedimientoChange: (procedimiento: string) => void;
  onAgregarNuevoProcedimiento: () => void;
  procedimientosNuevos: string[];
}

export function RegistrarSesion({
  sesionCronograma,
  onMontoChange,
  onObservacionesChange,
  onProcedimientoToggle,
  procedimientosRealizados,
  monto,
  observaciones,
  usarCronograma,
  onUsarCronogramaChange,
  nuevoProcedimiento,
  onNuevoProcedimientoChange,
  onAgregarNuevoProcedimiento,
  procedimientosNuevos
}: RegistrarSesionProps) {
  
  const procedimientosDisponibles = usarCronograma 
    ? sesionCronograma.procedimientos 
    : procedimientosNuevos;

  return (
    <div className="space-y-2">
      {/* Selector de modo compacto */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant={usarCronograma ? "default" : "outline"}
          size="sm"
          className="flex-1 h-9"
          onClick={() => onUsarCronogramaChange(true)}
        >
          <Calendar className="w-3.5 h-3.5 mr-1.5" />
          <span className="text-xs">Plan Original</span>
        </Button>
        <Button
          type="button"
          variant={!usarCronograma ? "default" : "outline"}
          size="sm"
          className="flex-1 h-9"
          onClick={() => onUsarCronogramaChange(false)}
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          <span className="text-xs">Sesión Extra</span>
        </Button>
      </div>

      {/* Info de sesión cronograma (compacta) */}
      {usarCronograma && (
        <div className="px-2 py-1.5 bg-blue-50 rounded-md border border-blue-200">
          <p className="text-[10px] text-blue-700">
            <span className="font-semibold">Sesión {sesionCronograma.numeroSesion}:</span> {sesionCronograma.descripcion}
          </p>
        </div>
      )}

      {/* Grid de 2 columnas para optimizar espacio */}
      <div className="grid lg:grid-cols-2 gap-2">
        {/* Columna 1: Procedimientos */}
        <Card className="p-2">
          <div className="flex items-center justify-between mb-1.5">
            <Label className="text-xs font-semibold flex items-center gap-1">
              <FileText className="w-3 h-3" />
              Procedimientos
            </Label>
            <Badge variant="secondary" className="text-[9px] px-1.5 py-0.5">
              {procedimientosRealizados.length}/{procedimientosDisponibles.length}
            </Badge>
          </div>

          <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
            {procedimientosDisponibles.length > 0 ? (
              procedimientosDisponibles.map((procedimiento, index) => (
                <label 
                  key={index}
                  className="flex items-center gap-1.5 p-1.5 rounded hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-all"
                >
                  <Checkbox
                    id={`proc-${index}`}
                    checked={procedimientosRealizados.includes(procedimiento)}
                    onCheckedChange={() => onProcedimientoToggle(procedimiento)}
                  />
                  <span className="text-[11px] flex-1">
                    {procedimiento}
                  </span>
                  {procedimientosRealizados.includes(procedimiento) && (
                    <CheckCircle2 className="w-3 h-3 text-green-600 flex-shrink-0" />
                  )}
                </label>
              ))
            ) : (
              <p className="text-[10px] text-gray-500 text-center py-4">
                {usarCronograma ? 'No hay procedimientos en el cronograma' : 'Agrega procedimientos abajo'}
              </p>
            )}
          </div>

          {!usarCronograma && (
            <div className="mt-2 pt-2 border-t flex gap-1">
              <Input
                placeholder="Agregar procedimiento..."
                value={nuevoProcedimiento}
                onChange={(e) => onNuevoProcedimientoChange(e.target.value)}
                className="text-[11px] h-7 flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && nuevoProcedimiento.trim()) {
                    onAgregarNuevoProcedimiento();
                  }
                }}
              />
              <Button
                type="button"
                size="sm"
                onClick={onAgregarNuevoProcedimiento}
                disabled={!nuevoProcedimiento.trim()}
                className="h-7 px-2"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          )}
        </Card>

        {/* Columna 2: Monto y Observaciones */}
        <div className="space-y-2">
          {/* Monto */}
          <Card className="p-2">
            <Label className="text-xs font-semibold flex items-center gap-1 mb-1.5">
              <DollarSign className="w-3 h-3 text-green-600" />
              Monto
            </Label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={monto}
                onChange={(e) => onMontoChange(parseFloat(e.target.value) || 0)}
                className="pl-6 text-sm h-8"
                placeholder="0.00"
              />
            </div>
          </Card>

          {/* Observaciones */}
          <Card className="p-2">
            <Label className="text-xs font-semibold mb-1.5 block">Observaciones</Label>
            <Textarea
              placeholder="Notas, hallazgos, complicaciones..."
              value={observaciones}
              onChange={(e) => onObservacionesChange(e.target.value)}
              rows={4}
              className="text-[11px] resize-none"
            />
          </Card>
        </div>
      </div>

      {/* Resumen compacto */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-green-50 rounded-md border border-green-200">
        <div className="flex items-center gap-3 text-[10px]">
          <span className="text-gray-600">
            <span className="font-semibold text-green-900">{procedimientosRealizados.length}</span> procedimientos
          </span>
          <span className="w-px h-3 bg-green-300"></span>
          <span className="text-gray-600">
            <span className="font-semibold text-green-900">${monto.toFixed(2)}</span>
          </span>
          <span className="w-px h-3 bg-green-300"></span>
          <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-white">
            {usarCronograma ? 'Plan original' : 'Extra'}
          </Badge>
        </div>
      </div>
    </div>
  );
}

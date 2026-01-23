'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Odontograma } from './Odontograma';
import { SelectorCarasDiente } from './SelectorCarasDiente';
import { VisualizadorEstadoDiente } from './VisualizadorEstadoDiente';
import type { DienteEstado } from '../constas';
import { useEffect } from 'react';

interface AgregarTratamientosProps {
  odontograma: DienteEstado[];
  dienteSeleccionado: number | null;
  carasSeleccionadas: string[];
  tratamientoSeleccionado: string;
  notasTratamiento: string;
  onDienteSelect: (diente: number | null) => void;
  onCaraToggle: (cara: string) => void;
  onTratamientoChange: (tratamiento: string) => void;
  onNotasChange: (notas: string) => void;
  onAgregarTratamiento: () => void;
  onCarasReset?: () => void;
}

const tratamientosDisponibles = [
  { value: 'caries', label: 'Caries', color: 'bg-red-500', afectaTodo: false },
  { value: 'curacion', label: 'Curación/Obturación', color: 'bg-green-500', afectaTodo: false },
  { value: 'corona', label: 'Corona', color: 'bg-blue-500', afectaTodo: true },
  { value: 'endodoncia', label: 'Endodoncia', color: 'bg-yellow-500', afectaTodo: true },
  { value: 'extraccion', label: 'Extracción', color: 'bg-red-900', afectaTodo: true },
  { value: 'perdido', label: 'Diente Perdido', color: 'bg-black', afectaTodo: true },
  { value: 'resina', label: 'Resina Compuesta', color: 'bg-purple-500', afectaTodo: false }
];

export function AgregarTratamientos({
  odontograma,
  dienteSeleccionado,
  carasSeleccionadas,
  tratamientoSeleccionado,
  notasTratamiento,
  onDienteSelect,
  onCaraToggle,
  onTratamientoChange,
  onNotasChange,
  onAgregarTratamiento,
  onCarasReset
}: AgregarTratamientosProps) {
  const dienteSeleccionadoData = dienteSeleccionado 
    ? odontograma.find(d => d.numero === dienteSeleccionado) 
    : null;

  const tratamientoActual = tratamientosDisponibles.find(t => t.value === tratamientoSeleccionado);
  const permitSeleccionCaras = tratamientoActual && !tratamientoActual.afectaTodo;

  // Auto-seleccionar todas las caras si el tratamiento afecta todo el diente
  useEffect(() => {
    if (tratamientoActual?.afectaTodo && carasSeleccionadas.length === 0) {
      // Seleccionar todas las caras automáticamente
      ['vestibular', 'distal', 'oclusal', 'mesial', 'lingual'].forEach(cara => {
        onCaraToggle(cara);
      });
    }
  }, [tratamientoSeleccionado]);

  return (
    <div className="space-y-3">
      <Card className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm text-gray-900">Agregar Nuevos Tratamientos</h3>
          {dienteSeleccionado && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 text-xs px-2 py-0.5">
              Diente #{dienteSeleccionado}
            </Badge>
          )}
        </div>
        <p className="text-xs text-gray-600 mb-2">
          Selecciona el diente en el odontograma para agregar tratamientos
        </p>

        <Odontograma 
          dientes={odontograma}
          onDienteSelect={onDienteSelect}
          dienteSeleccionado={dienteSeleccionado}
        />

        {dienteSeleccionadoData && (
          <div className="mt-3 space-y-2">
            {/* Tipo de tratamiento */}
            <div className="p-2 bg-gray-50 rounded border border-gray-200">
              <Label className="text-xs font-semibold text-gray-700 mb-1.5 block">Tipo de tratamiento:</Label>
              <div className="space-y-1">
                {tratamientosDisponibles.map((trat) => (
                  <button
                    key={trat.value}
                    onClick={() => onTratamientoChange(trat.value)}
                    className={`
                      w-full flex items-center p-1.5 rounded border transition-all text-left
                      ${tratamientoSeleccionado === trat.value 
                        ? 'bg-white border-gray-400 shadow-sm ring-1 ring-gray-300' 
                        : 'bg-white border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full mr-2 ${trat.color} flex-shrink-0`}></div>
                    <span className="text-xs text-gray-800 font-medium">{trat.label}</span>
                    {trat.afectaTodo && (
                      <Badge variant="outline" className="ml-auto text-[9px] px-1.5 py-0 bg-blue-50 text-blue-700 border-blue-200">
                        Todo el diente
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Selectores de caras - Uno al lado del otro */}
            {tratamientoSeleccionado && (
              <div className="p-2 bg-white rounded border border-gray-200">
                <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                  {permitSeleccionCaras ? 'Selecciona las superficies a tratar:' : 'Estado del diente'}
                </Label>
                <div className="flex justify-center items-start gap-4">
                  {/* Estado Actual */}
                  <div className="flex-1 flex justify-center">
                    <VisualizadorEstadoDiente diente={dienteSeleccionadoData} />
                  </div>
                  
                  {/* Selector de Nuevo Tratamiento */}
                  <div className="flex-1 flex justify-center">
                    <SelectorCarasDiente
                      carasSeleccionadas={carasSeleccionadas}
                      onCaraToggle={onCaraToggle}
                      colorTratamiento={tratamientoActual?.color || 'bg-blue-500'}
                      disabled={!permitSeleccionCaras}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notas del tratamiento */}
            <div className="p-2 bg-gray-50 rounded border border-gray-200">
              <Label htmlFor="notas-tratamiento" className="text-xs font-semibold text-gray-700 mb-1.5 block">
                Notas adicionales:
              </Label>
              <Textarea 
                id="notas-tratamiento"
                placeholder="Observaciones sobre el tratamiento..."
                value={notasTratamiento}
                onChange={(e) => onNotasChange(e.target.value)}
                rows={2}
                className="w-full text-xs"
              />
            </div>

            {/* Botón de agregar */}
            <Button 
              onClick={onAgregarTratamiento}
              className="w-full"
              size="sm"
              disabled={!tratamientoSeleccionado || (permitSeleccionCaras && carasSeleccionadas.length === 0)}
            >
              Agregar Tratamiento
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

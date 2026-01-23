'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Calendar, DollarSign, FileText, Pill, Activity } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface TratamientoRegistrado {
  diente: number;
  caras: string[];
  tipo: string;
  notas: string;
}

interface ResumenFinalProps {
  procedimientosRealizados: string[];
  observaciones: string;
  monto: number;
  proximaCita: string;
  tratamientos: TratamientoRegistrado[];
  usarCronograma: boolean;
  numeroSesion?: number;
}

export function ResumenFinal({
  procedimientosRealizados,
  observaciones,
  monto,
  proximaCita,
  tratamientos,
  usarCronograma,
  numeroSesion
}: ResumenFinalProps) {
  return (
    <div className="space-y-2">
      {/* Header */}
      <Card className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-sm text-blue-900">Resumen de la Consulta</h3>
          </div>
          <Badge variant="outline" className="text-[9px] px-1.5 py-0.5">
            {usarCronograma ? `Sesión ${numeroSesion}` : 'Sesión Extra'}
          </Badge>
        </div>
      </Card>

      {/* Grid responsivo de 2 columnas */}
      <div className="grid lg:grid-cols-2 gap-2">
        {/* Columna 1: Procedimientos y Tratamientos */}
        <div className="space-y-2">
          {/* Procedimientos Realizados */}
          <Card className="p-2">
            <div className="flex items-center gap-1 mb-1.5">
              <Activity className="w-3 h-3 text-green-600" />
              <h4 className="text-xs font-semibold text-gray-900">Procedimientos</h4>
              <Badge variant="secondary" className="text-[8px] px-1 py-0 ml-auto">
                {procedimientosRealizados.length}
              </Badge>
            </div>
            <div className="space-y-1">
              {procedimientosRealizados.length > 0 ? (
                procedimientosRealizados.map((proc, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[10px] p-1 bg-gray-50 rounded">
                    <CheckCircle2 className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{proc}</span>
                  </div>
                ))
              ) : (
                <p className="text-[10px] text-gray-500 text-center py-2">Sin procedimientos</p>
              )}
            </div>
          </Card>

          {/* Tratamientos Agregados */}
          <Card className="p-2">
            <div className="flex items-center gap-1 mb-1.5">
              <Pill className="w-3 h-3 text-purple-600" />
              <h4 className="text-xs font-semibold text-gray-900">Tratamientos Nuevos</h4>
              <Badge variant="secondary" className="text-[8px] px-1 py-0 ml-auto">
                {tratamientos.length}
              </Badge>
            </div>
            <div className="space-y-1">
              {tratamientos.length > 0 ? (
                tratamientos.map((trat, idx) => (
                  <div key={idx} className="p-1.5 bg-purple-50 rounded border border-purple-200">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-semibold text-purple-900">
                        Diente #{trat.diente}
                      </span>
                      <Badge variant="outline" className="text-[8px] px-1 py-0">
                        {trat.tipo}
                      </Badge>
                    </div>
                    {trat.caras.length > 0 && (
                      <div className="flex gap-0.5 mt-1">
                        {trat.caras.map((cara, i) => (
                          <span key={i} className="text-[9px] px-1 py-0.5 bg-purple-100 rounded text-purple-700">
                            {cara}
                          </span>
                        ))}
                      </div>
                    )}
                    {trat.notas && (
                      <p className="text-[9px] text-gray-600 mt-1">{trat.notas}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-[10px] text-gray-500 text-center py-2">Sin tratamientos nuevos</p>
              )}
            </div>
          </Card>
        </div>

        {/* Columna 2: Detalles de la sesión */}
        <div className="space-y-2">
          {/* Información Financiera */}
          <Card className="p-2 bg-green-50 border-green-200">
            <div className="flex items-center gap-1 mb-1.5">
              <DollarSign className="w-3 h-3 text-green-600" />
              <h4 className="text-xs font-semibold text-green-900">Monto de la Sesión</h4>
            </div>
            <p className="text-2xl font-bold text-green-700">${monto.toFixed(2)}</p>
            <p className="text-[9px] text-green-600 mt-0.5">Cobrado en esta sesión</p>
          </Card>

          {/* Próxima Cita */}
          {proximaCita && (
            <Card className="p-2 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-1 mb-1.5">
                <Calendar className="w-3 h-3 text-blue-600" />
                <h4 className="text-xs font-semibold text-blue-900">Próxima Cita</h4>
              </div>
              <p className="text-sm font-semibold text-blue-700">
                {new Date(proximaCita).toLocaleDateString('es-MX', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="text-xs text-blue-600 mt-0.5">
                {new Date(proximaCita).toLocaleTimeString('es-MX', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </Card>
          )}

          {/* Observaciones */}
          {observaciones && (
            <Card className="p-2">
              <div className="flex items-center gap-1 mb-1.5">
                <FileText className="w-3 h-3 text-gray-600" />
                <h4 className="text-xs font-semibold text-gray-900">Observaciones</h4>
              </div>
              <p className="text-[10px] text-gray-700 leading-relaxed">{observaciones}</p>
            </Card>
          )}
        </div>
      </div>

      {/* Información adicional */}
      <Card className="p-2 bg-gray-50 border-gray-200">
        <p className="text-[9px] text-gray-600 text-center">
          Al confirmar, toda esta información se guardará en el expediente del paciente
        </p>
      </Card>
    </div>
  );
}

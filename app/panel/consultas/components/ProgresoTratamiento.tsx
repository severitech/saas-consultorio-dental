'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PlanTratamiento } from '../constas';

interface ProgresoTratamientoProps {
  planTratamiento: PlanTratamiento;
}

export function ProgresoTratamiento({ planTratamiento }: ProgresoTratamientoProps) {
  const sesionActual = planTratamiento.sesiones[planTratamiento.sesionActual - 1];
  const sesionesCompletadas = planTratamiento.sesiones.filter(s => s.estado === 'completado');
  const sesionesTotales = planTratamiento.totalSesiones;

  return (
    <div className="space-y-6">
      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-primary/5 border-primary/30">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Sesión Actual</p>
            <p className="text-3xl font-bold text-primary">
              {planTratamiento.sesionActual} <span className="text-lg text-gray-500">/ {sesionesTotales}</span>
            </p>
          </div>
        </Card>

        <Card className="p-4 bg-green-50 border-green-200">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Completadas</p>
            <p className="text-3xl font-bold text-green-600">
              {sesionesCompletadas.length}
            </p>
          </div>
        </Card>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Progreso General</p>
            <p className="text-3xl font-bold text-blue-600">
              {Math.round((sesionesCompletadas.length / sesionesTotales) * 100)}%
            </p>
          </div>
        </Card>
      </div>

      {/* Detalles de la Sesión Actual */}
      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4">Sesión Actual: {sesionActual.numeroSesion}</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Descripción:</p>
            <p className="text-gray-900">{sesionActual.descripcion}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Procedimientos Planificados:</p>
            <ul className="list-disc list-inside space-y-1">
              {sesionActual.procedimientos.map((proc, idx) => (
                <li key={idx} className="text-gray-700">{proc}</li>
              ))}
            </ul>
          </div>

          {sesionActual.dientesAfectados && sesionActual.dientesAfectados.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-2">Dientes a Tratar:</p>
              <div className="flex gap-2 flex-wrap">
                {sesionActual.dientesAfectados.map(diente => (
                  <Badge key={diente} variant="outline" className="font-mono">
                    #{diente}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {sesionActual.proximaCita && (
            <div>
              <p className="text-sm text-gray-600 mb-1">Fecha Programada:</p>
              <p className="text-gray-900 font-semibold">
                {new Date(sesionActual.proximaCita).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Historial de Sesiones */}
      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4">Historial de Sesiones</h3>
        <div className="space-y-3">
          {planTratamiento.sesiones.map((sesion, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-lg border-2 ${
                sesion.estado === 'completado' 
                  ? 'bg-green-50 border-green-200' 
                  : sesion.estado === 'en-progreso'
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Sesión {sesion.numeroSesion}</h4>
                <Badge variant={
                  sesion.estado === 'completado' ? 'default' :
                  sesion.estado === 'en-progreso' ? 'secondary' : 'outline'
                }>
                  {sesion.estado === 'completado' ? 'Completada' :
                   sesion.estado === 'en-progreso' ? 'En Progreso' : 'Pendiente'}
                </Badge>
              </div>
              <p className="text-sm text-gray-700">{sesion.descripcion}</p>
              {sesion.observaciones && (
                <p className="text-xs text-gray-600 mt-2 italic">{sesion.observaciones}</p>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

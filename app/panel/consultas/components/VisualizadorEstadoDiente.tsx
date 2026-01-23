'use client';

import { useState } from 'react';
import type { DienteEstado } from '../constas';

interface VisualizadorEstadoDienteProps {
  diente: DienteEstado;
}

const getColorEstado = (estado: string) => {
  switch (estado) {
    case 'caries':
      return 'bg-red-500';
    case 'curacion':
    case 'tratado':
      return 'bg-green-500';
    case 'corona':
      return 'bg-blue-500';
    case 'endodoncia':
      return 'bg-yellow-500';
    case 'extraccion':
      return 'bg-red-900';
    case 'perdido':
    case 'ausente':
      return 'bg-black';
    case 'resina':
      return 'bg-purple-500';
    default:
      return 'bg-white';
  }
};

const getNombreEstado = (estado: string) => {
  switch (estado) {
    case 'caries':
      return 'Caries';
    case 'curacion':
    case 'tratado':
      return 'Curación/Obturación';
    case 'corona':
      return 'Corona';
    case 'endodoncia':
      return 'Endodoncia';
    case 'extraccion':
      return 'Extracción';
    case 'perdido':
    case 'ausente':
      return 'Diente Perdido';
    case 'resina':
      return 'Resina Compuesta';
    case 'sano':
      return 'Sano';
    default:
      return estado;
  }
};

export function VisualizadorEstadoDiente({ diente }: VisualizadorEstadoDienteProps) {
  const [hoveredCara, setHoveredCara] = useState<string | null>(null);

  const caras = diente.caras || {
    vestibular: 'sano',
    distal: 'sano',
    oclusal: 'sano',
    mesial: 'sano',
    lingual: 'sano'
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs font-semibold text-gray-700 mb-3">Estado Actual</p>
      
      <div className="relative w-28 h-36">
        {/* Vestibular - Arriba */}
        <div
          onMouseEnter={() => setHoveredCara('vestibular')}
          onMouseLeave={() => setHoveredCara(null)}
          className={`
            absolute top-0 left-1/2 -translate-x-1/2 w-20 h-8 rounded-t-lg border-2 border-gray-700
            ${getColorEstado(caras.vestibular)}
            flex items-center justify-center
          `}
        >
          <span className={`text-[10px] font-medium ${caras.vestibular === 'sano' ? 'text-gray-700' : 'text-white'}`}>
            V
          </span>
        </div>

        {/* Contenedor central para Distal, Oclusal, Mesial */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-16 flex">
          {/* Distal - Izquierda */}
          <div
            onMouseEnter={() => setHoveredCara('distal')}
            onMouseLeave={() => setHoveredCara(null)}
            className={`
              w-6 h-full border-2 border-r-0 border-gray-700
              ${getColorEstado(caras.distal)}
              flex items-center justify-center
            `}
          >
            <span className={`text-[10px] font-medium ${caras.distal === 'sano' ? 'text-gray-700' : 'text-white'}`}>
              D
            </span>
          </div>

          {/* Oclusal - Centro */}
          <div
            onMouseEnter={() => setHoveredCara('oclusal')}
            onMouseLeave={() => setHoveredCara(null)}
            className={`
              flex-1 border-2 border-x-0 border-gray-700
              ${getColorEstado(caras.oclusal)}
              flex items-center justify-center
            `}
          >
            <span className={`text-[10px] font-medium ${caras.oclusal === 'sano' ? 'text-gray-700' : 'text-white'}`}>
              O
            </span>
          </div>

          {/* Mesial - Derecha */}
          <div
            onMouseEnter={() => setHoveredCara('mesial')}
            onMouseLeave={() => setHoveredCara(null)}
            className={`
              w-6 h-full border-2 border-l-0 border-gray-700
              ${getColorEstado(caras.mesial)}
              flex items-center justify-center
            `}
          >
            <span className={`text-[10px] font-medium ${caras.mesial === 'sano' ? 'text-gray-700' : 'text-white'}`}>
              M
            </span>
          </div>
        </div>

        {/* Lingual - Abajo */}
        <div
          onMouseEnter={() => setHoveredCara('lingual')}
          onMouseLeave={() => setHoveredCara(null)}
          className={`
            absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-12 rounded-b-lg border-2 border-gray-700
            ${getColorEstado(caras.lingual)}
            flex items-center justify-center
          `}
        >
          <span className={`text-[10px] font-medium ${caras.lingual === 'sano' ? 'text-gray-700' : 'text-white'}`}>
            L
          </span>
        </div>

        {/* Tooltip para cara hover */}
        {hoveredCara && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded whitespace-nowrap z-10">
            {hoveredCara.charAt(0).toUpperCase() + hoveredCara.slice(1)}: {getNombreEstado(caras[hoveredCara as keyof typeof caras])}
          </div>
        )}
      </div>

      {/* Info del estado general */}
      {diente.notas && (
        <p className="text-xs text-gray-600 mt-6 text-center italic">
          {diente.notas}
        </p>
      )}
    </div>
  );
}

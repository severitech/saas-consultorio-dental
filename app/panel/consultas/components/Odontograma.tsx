'use client';

import { useState } from 'react';
import { DienteEstado, DIENTES_SUPERIORES, DIENTES_INFERIORES, CaraDiente } from '../constas';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface OdontogramaProps {
  dientes: DienteEstado[];
  onDienteSelect?: (numero: number) => void;
  dienteSeleccionado?: number | null;
  readonly?: boolean;
}

export function Odontograma({ dientes, onDienteSelect, dienteSeleccionado, readonly = false }: OdontogramaProps) {
  const [hoveredCara, setHoveredCara] = useState<{numero: number, cara: string} | null>(null);

  const getDiente = (numero: number) => {
    return dientes.find(d => d.numero === numero);
  };

  const getColorEstado = (estado: string) => {
    switch (estado) {
      case 'caries':
        return 'bg-red-500';
      case 'corona':
        return 'bg-blue-500';
      case 'tratado':
        return 'bg-yellow-500';
      case 'resina':
        return 'bg-purple-500';
      default:
        return 'bg-white';
    }
  };

  const renderDiente = (numero: number) => {
    const diente = getDiente(numero);
    const isSeleccionado = dienteSeleccionado === numero;
    const caras: CaraDiente = diente?.caras || {
      vestibular: 'sano',
      distal: 'sano',
      oclusal: 'sano',
      mesial: 'sano',
      lingual: 'sano'
    };

    const estadoDiente = diente?.estado || 'sano';

    return (
      <div key={numero} className="flex flex-col items-center gap-1">
        <span className="text-[10px] text-gray-600 font-mono">{numero}</span>
        <button
          onClick={() => !readonly && onDienteSelect && onDienteSelect(numero)}
          disabled={readonly}
          className={`
            relative w-12 h-16 transition-all duration-200
            ${isSeleccionado ? 'scale-110' : 'hover:scale-105'}
            ${readonly ? 'cursor-default' : 'cursor-pointer'}
          `}
        >
          {estadoDiente === 'ausente' ? (
            <div className="w-full h-full flex items-center justify-center">
              <X className="w-10 h-10 text-gray-400" strokeWidth={2} />
            </div>
          ) : (
            <div className={`
              w-full h-full rounded-lg border-2 
              ${isSeleccionado ? 'border-primary ring-2 ring-primary/30' : 'border-gray-300'}
              bg-white shadow-md overflow-hidden
            `}>
              {/* Vestibular */}
              <div 
                className={`h-[18%] ${getColorEstado(caras.vestibular)} border-b border-gray-300 relative group`}
                onMouseEnter={() => setHoveredCara({numero, cara: 'vestibular'})}
                onMouseLeave={() => setHoveredCara(null)}
              >
                {hoveredCara?.numero === numero && hoveredCara?.cara === 'vestibular' && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                    Vestibular
                  </div>
                )}
              </div>

              {/* Fila media: Distal, Oclusal, Mesial */}
              <div className="h-[52%] flex">
                {/* Distal */}
                <div 
                  className={`w-[22%] ${getColorEstado(caras.distal)} border-r border-gray-300 relative group`}
                  onMouseEnter={() => setHoveredCara({numero, cara: 'distal'})}
                  onMouseLeave={() => setHoveredCara(null)}
                >
                  {hoveredCara?.numero === numero && hoveredCara?.cara === 'distal' && (
                    <div className="absolute -left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                      Distal
                    </div>
                  )}
                </div>

                {/* Oclusal */}
                <div 
                  className={`flex-1 ${getColorEstado(caras.oclusal)} relative group`}
                  onMouseEnter={() => setHoveredCara({numero, cara: 'oclusal'})}
                  onMouseLeave={() => setHoveredCara(null)}
                >
                  {hoveredCara?.numero === numero && hoveredCara?.cara === 'oclusal' && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                      Oclusal
                    </div>
                  )}
                </div>

                {/* Mesial */}
                <div 
                  className={`w-[22%] ${getColorEstado(caras.mesial)} border-l border-gray-300 relative group`}
                  onMouseEnter={() => setHoveredCara({numero, cara: 'mesial'})}
                  onMouseLeave={() => setHoveredCara(null)}
                >
                  {hoveredCara?.numero === numero && hoveredCara?.cara === 'mesial' && (
                    <div className="absolute -right-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                      Mesial
                    </div>
                  )}
                </div>
              </div>

              {/* Lingual */}
              <div 
                className={`h-[30%] ${getColorEstado(caras.lingual)} border-t border-gray-300 relative group`}
                onMouseEnter={() => setHoveredCara({numero, cara: 'lingual'})}
                onMouseLeave={() => setHoveredCara(null)}
              >
                {hoveredCara?.numero === numero && hoveredCara?.cara === 'lingual' && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                    Lingual
                  </div>
                )}
              </div>
            </div>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {/* Leyenda */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        <Badge variant="outline" className="bg-white border-gray-400 text-gray-700 text-[10px] px-2 py-0.5">Sano</Badge>
        <Badge variant="outline" className="bg-red-500 border-red-600 text-white text-[10px] px-2 py-0.5">Caries</Badge>
        <Badge variant="outline" className="bg-blue-500 border-blue-600 text-white text-[10px] px-2 py-0.5">Corona</Badge>
        <Badge variant="outline" className="bg-yellow-500 border-yellow-600 text-white text-[10px] px-2 py-0.5">Tratado</Badge>
        <Badge variant="outline" className="bg-purple-500 border-purple-600 text-white text-[10px] px-2 py-0.5">Resina</Badge>
      </div>

      {/* Odontograma */}
      <div className="bg-white rounded-lg p-3 space-y-4 border border-gray-200 shadow-sm">
        {/* Arcada Superior */}
        <div className="space-y-2">
          <p className="text-[10px] text-gray-600 text-center uppercase tracking-wider font-semibold">
            Arco Dental Superior (Maxilar)
          </p>
          <div className="flex justify-center items-center gap-1.5 flex-wrap">
            {DIENTES_SUPERIORES.map(renderDiente)}
          </div>
        </div>

        <div className="border-t border-gray-300" />

        {/* Arcada Inferior */}
        <div className="space-y-2">
          <div className="flex justify-center items-center gap-1.5 flex-wrap">
            {DIENTES_INFERIORES.map(renderDiente)}
          </div>
          <p className="text-[10px] text-gray-600 text-center uppercase tracking-wider font-semibold">
            Arco Dental Inferior (Mandibular)
          </p>
        </div>
      </div>
    </div>
  );
}

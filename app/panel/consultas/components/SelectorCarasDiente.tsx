'use client';

import { useState } from 'react';

interface SelectorCarasDienteProps {
  carasSeleccionadas: string[];
  onCaraToggle: (cara: string) => void;
  colorTratamiento?: string;
  disabled?: boolean;
}

export function SelectorCarasDiente({ 
  carasSeleccionadas, 
  onCaraToggle, 
  colorTratamiento = 'bg-blue-500',
  disabled = false 
}: SelectorCarasDienteProps) {
  const [hoveredCara, setHoveredCara] = useState<string | null>(null);

  const isSelected = (cara: string) => carasSeleccionadas.includes(cara);

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs text-gray-600 mb-3 text-center">
        Haz clic en las superficies del diente que quieres tratar
      </p>
      
      <div className="relative w-28 h-36">
        {/* Vestibular - Arriba */}
        <button
          onClick={() => !disabled && onCaraToggle('vestibular')}
          onMouseEnter={() => setHoveredCara('vestibular')}
          onMouseLeave={() => setHoveredCara(null)}
          disabled={disabled}
          className={`
            absolute top-0 left-1/2 -translate-x-1/2 w-20 h-8 rounded-t-lg border-2 
            transition-all duration-200
            ${isSelected('vestibular') 
              ? `${colorTratamiento} border-gray-700` 
              : 'bg-white border-gray-400 hover:border-gray-600 hover:bg-gray-50'
            }
            ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          `}
        >
          <span className={`text-[10px] font-medium ${isSelected('vestibular') ? 'text-white' : 'text-gray-700'}`}>
            V
          </span>
        </button>

        {/* Contenedor central para Distal, Oclusal, Mesial */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-16 flex">
          {/* Distal - Izquierda */}
          <button
            onClick={() => !disabled && onCaraToggle('distal')}
            onMouseEnter={() => setHoveredCara('distal')}
            onMouseLeave={() => setHoveredCara(null)}
            disabled={disabled}
            className={`
              w-6 h-full border-2 border-r-0
              transition-all duration-200
              ${isSelected('distal') 
                ? `${colorTratamiento} border-gray-700` 
                : 'bg-white border-gray-400 hover:border-gray-600 hover:bg-gray-50'
              }
              ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            `}
          >
            <span className={`text-[10px] font-medium ${isSelected('distal') ? 'text-white' : 'text-gray-700'}`}>
              D
            </span>
          </button>

          {/* Oclusal - Centro */}
          <button
            onClick={() => !disabled && onCaraToggle('oclusal')}
            onMouseEnter={() => setHoveredCara('oclusal')}
            onMouseLeave={() => setHoveredCara(null)}
            disabled={disabled}
            className={`
              flex-1 border-2 border-x-0
              transition-all duration-200
              ${isSelected('oclusal') 
                ? `${colorTratamiento} border-gray-700` 
                : 'bg-white border-gray-400 hover:border-gray-600 hover:bg-gray-50'
              }
              ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            `}
          >
            <span className={`text-[10px] font-medium ${isSelected('oclusal') ? 'text-white' : 'text-gray-700'}`}>
              O
            </span>
          </button>

          {/* Mesial - Derecha */}
          <button
            onClick={() => !disabled && onCaraToggle('mesial')}
            onMouseEnter={() => setHoveredCara('mesial')}
            onMouseLeave={() => setHoveredCara(null)}
            disabled={disabled}
            className={`
              w-6 h-full border-2 border-l-0
              transition-all duration-200
              ${isSelected('mesial') 
                ? `${colorTratamiento} border-gray-700` 
                : 'bg-white border-gray-400 hover:border-gray-600 hover:bg-gray-50'
              }
              ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            `}
          >
            <span className={`text-[10px] font-medium ${isSelected('mesial') ? 'text-white' : 'text-gray-700'}`}>
              M
            </span>
          </button>
        </div>

        {/* Lingual - Abajo */}
        <button
          onClick={() => !disabled && onCaraToggle('lingual')}
          onMouseEnter={() => setHoveredCara('lingual')}
          onMouseLeave={() => setHoveredCara(null)}
          disabled={disabled}
          className={`
            absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-12 rounded-b-lg border-2
            transition-all duration-200
            ${isSelected('lingual') 
              ? `${colorTratamiento} border-gray-700` 
              : 'bg-white border-gray-400 hover:border-gray-600 hover:bg-gray-50'
            }
            ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          `}
        >
          <span className={`text-[10px] font-medium ${isSelected('lingual') ? 'text-white' : 'text-gray-700'}`}>
            L
          </span>
        </button>

        {/* Tooltip para cara hover */}
        {hoveredCara && !disabled && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded whitespace-nowrap z-10">
            {hoveredCara.charAt(0).toUpperCase() + hoveredCara.slice(1)}
          </div>
        )}
      </div>

      {carasSeleccionadas.length > 0 && (
        <p className="text-xs text-gray-600 mt-6">
          {carasSeleccionadas.length} superficie{carasSeleccionadas.length > 1 ? 's' : ''} seleccionada{carasSeleccionadas.length > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}

'use client';

interface Paso {
  numero: number;
  titulo: string;
}

interface StepHeaderProps {
  pasos: Paso[];
  pasoActual: number;
  onPasoChange: (paso: number) => void;
}

export function StepHeader({ pasos, pasoActual, onPasoChange }: StepHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      {pasos.map((paso, idx) => (
        <div key={paso.numero} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => onPasoChange(paso.numero)}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs
                transition-all duration-200
                ${pasoActual === paso.numero 
                  ? 'bg-primary text-white ring-2 ring-primary/30 scale-105' 
                  : pasoActual > paso.numero
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
                }
              `}
            >
              {paso.numero}
            </button>
            <p className={`
              text-[10px] text-center leading-tight hidden sm:block
              ${pasoActual === paso.numero ? 'text-primary font-semibold' : 'text-gray-600'}
            `}>
              {paso.titulo}
            </p>
          </div>
          {idx < pasos.length - 1 && (
            <div className={`
              flex-1 h-0.5 mx-1.5 rounded-full
              ${pasoActual > paso.numero ? 'bg-green-500' : 'bg-gray-200'}
            `} />
          )}
        </div>
      ))}
    </div>
  );
}

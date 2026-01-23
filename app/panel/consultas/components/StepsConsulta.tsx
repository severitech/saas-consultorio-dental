'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { PlanTratamiento, DienteEstado } from '../constas';
import { StepHeader } from './StepHeader';
import { ProgresoTratamiento } from './ProgresoTratamiento';
import { RegistrarProcedimientos } from './RegistrarProcedimientos';
import { AgregarTratamientos } from './AgregarTratamientos';
import { RegistrarSesion } from './RegistrarSesion';
import { ProgramarCita } from './ProgramarCita';
import { ResumenFinal } from './ResumenFinal';
import { AgregarReceta } from './AgregarReceta';

interface TratamientoRegistrado {
  diente: number;
  caras: string[];
  tipo: string;
  notas: string;
}

interface Medicamento {
  nombre: string;
  dosis: string;
  frecuencia: string;
  duracion: string;
}

interface StepsConsultaProps {
  planTratamiento: PlanTratamiento;
  odontograma: DienteEstado[];
  consultaId?: string;
  pacienteId?: string;
  nombrePaciente?: string;
}

export function StepsConsulta({ 
  planTratamiento, 
  odontograma,
  consultaId,
  pacienteId,
  nombrePaciente
}: StepsConsultaProps) {
  const [pasoActual, setPasoActual] = useState(1);
  const [procedimientosRealizados, setProcedimientosRealizados] = useState<string[]>([]);
  const [observaciones, setObservaciones] = useState('');
  const [dienteSeleccionado, setDienteSeleccionado] = useState<number | null>(null);
  const [proximaCita, setProximaCita] = useState('');
  const [carasSeleccionadas, setCarasSeleccionadas] = useState<string[]>([]);
  const [tratamientoSeleccionado, setTratamientoSeleccionado] = useState<string>('');
  const [notasTratamiento, setNotasTratamiento] = useState('');
  const [montoSesion, setMontoSesion] = useState(0);
  const [observacionesSesion, setObservacionesSesion] = useState('');
  const [usarCronograma, setUsarCronograma] = useState(true);
  const [nuevoProcedimiento, setNuevoProcedimiento] = useState('');
  const [procedimientosNuevos, setProcedimientosNuevos] = useState<string[]>([]);
  const [tratamientosRegistrados, setTratamientosRegistrados] = useState<TratamientoRegistrado[]>([]);
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [indicacionesReceta, setIndicacionesReceta] = useState('');

  const sesionActual = planTratamiento.sesiones[planTratamiento.sesionActual - 1];

  const pasos = [
    { numero: 1, titulo: 'Progreso' },
    { numero: 2, titulo: 'Procedimientos' },
    { numero: 3, titulo: 'Tratamientos' },
    { numero: 4, titulo: 'Sesión' },
    { numero: 5, titulo: 'Cita' },
    { numero: 6, titulo: 'Resumen' },
    { numero: 7, titulo: 'Receta' }
  ];

  const handleProcedimientoToggle = (procedimiento: string) => {
    setProcedimientosRealizados(prev => 
      prev.includes(procedimiento) 
        ? prev.filter(p => p !== procedimiento)
        : [...prev, procedimiento]
    );
  };

  const handleCaraToggle = (cara: string) => {
    setCarasSeleccionadas(prev => 
      prev.includes(cara) 
        ? prev.filter(c => c !== cara)
        : [...prev, cara]
    );
  };

  const handleAgregarTratamiento = () => {
    if (!dienteSeleccionado || carasSeleccionadas.length === 0 || !tratamientoSeleccionado) {
      alert('Por favor selecciona el diente, las caras y el tipo de tratamiento');
      return;
    }
    
    const nuevoTratamiento: TratamientoRegistrado = {
      diente: dienteSeleccionado,
      caras: [...carasSeleccionadas],
      tipo: tratamientoSeleccionado,
      notas: notasTratamiento
    };

    setTratamientosRegistrados(prev => [...prev, nuevoTratamiento]);
    setCarasSeleccionadas([]);
    setTratamientoSeleccionado('');
    setNotasTratamiento('');
    alert(`Tratamiento agregado al diente #${dienteSeleccionado}`);
  };

  const handleAgregarNuevoProcedimiento = () => {
    if (nuevoProcedimiento.trim()) {
      setProcedimientosNuevos(prev => [...prev, nuevoProcedimiento.trim()]);
      setNuevoProcedimiento('');
    }
  };

  const handleFinalizar = () => {
    const datosConsulta = {
      procedimientosRealizados,
      observaciones: observacionesSesion,
      monto: montoSesion,
      proximaCita,
      tratamientos: tratamientosRegistrados,
      usarCronograma,
      medicamentos,
      indicacionesReceta,
      consultaId,
      pacienteId
    };
    
    console.log('Finalizando consulta con datos:', datosConsulta);
    alert('¡Consulta guardada exitosamente!');
    // Aquí iría la lógica para guardar en la base de datos
  };

  const renderPasoActual = () => {
    switch (pasoActual) {
      case 1:
        return <ProgresoTratamiento planTratamiento={planTratamiento} />;
      case 2:
        return (
          <RegistrarProcedimientos
            sesionActual={sesionActual}
            procedimientosRealizados={procedimientosRealizados}
            observaciones={observaciones}
            onProcedimientoToggle={handleProcedimientoToggle}
            onObservacionesChange={setObservaciones}
          />
        );
      case 3:
        return (
          <AgregarTratamientos
            odontograma={odontograma}
            dienteSeleccionado={dienteSeleccionado}
            carasSeleccionadas={carasSeleccionadas}
            tratamientoSeleccionado={tratamientoSeleccionado}
            notasTratamiento={notasTratamiento}
            onDienteSelect={setDienteSeleccionado}
            onCaraToggle={handleCaraToggle}
            onTratamientoChange={setTratamientoSeleccionado}
            onNotasChange={setNotasTratamiento}
            onAgregarTratamiento={handleAgregarTratamiento}
          />
        );
      case 4:
        return (
          <RegistrarSesion
            sesionCronograma={sesionActual}
            onMontoChange={setMontoSesion}
            onObservacionesChange={setObservacionesSesion}
            onProcedimientoToggle={handleProcedimientoToggle}
            procedimientosRealizados={procedimientosRealizados}
            monto={montoSesion}
            observaciones={observacionesSesion}
            usarCronograma={usarCronograma}
            onUsarCronogramaChange={setUsarCronograma}
            nuevoProcedimiento={nuevoProcedimiento}
            onNuevoProcedimientoChange={setNuevoProcedimiento}
            onAgregarNuevoProcedimiento={handleAgregarNuevoProcedimiento}
            procedimientosNuevos={procedimientosNuevos}
          />
        );
      case 5:
        return (
          <ProgramarCita
            proximaCita={proximaCita}
            onProximaCitaChange={setProximaCita}
            consultaId={consultaId || planTratamiento.id}
            pacienteId={pacienteId}
            nombrePaciente={nombrePaciente}
          />
        );
      case 6:
        return (
          <ResumenFinal
            procedimientosRealizados={procedimientosRealizados}
            observaciones={observacionesSesion}
            monto={montoSesion}
            proximaCita={proximaCita}
            tratamientos={tratamientosRegistrados}
            usarCronograma={usarCronograma}
            numeroSesion={sesionActual.numeroSesion}
          />
        );
      case 7:
        return (
          <AgregarReceta
            medicamentos={medicamentos}
            onMedicamentosChange={setMedicamentos}
            indicaciones={indicacionesReceta}
            onIndicacionesChange={setIndicacionesReceta}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      <StepHeader 
        pasos={pasos}
        pasoActual={pasoActual}
        onPasoChange={setPasoActual}
      />

      <div className="min-h-[400px]">
        {renderPasoActual()}
      </div>

      <div className="flex justify-between pt-3 border-t">
        <Button 
          variant="outline"
          size="sm"
          onClick={() => setPasoActual(prev => Math.max(1, prev - 1))}
          disabled={pasoActual === 1}
          className="h-8"
        >
          Anterior
        </Button>
        {pasoActual < 7 ? (
          <Button 
            size="sm"
            onClick={() => setPasoActual(prev => Math.min(7, prev + 1))}
            className="h-8"
          >
            Siguiente
          </Button>
        ) : (
          <Button 
            size="sm"
            onClick={handleFinalizar}
            className="h-8 bg-green-600 hover:bg-green-700"
          >
            Finalizar Consulta
          </Button>
        )}
      </div>
    </div>
  );
}

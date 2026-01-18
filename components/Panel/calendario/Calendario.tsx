"use client";

import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './calendario.css';

import { CitaCountCell } from './Celdas';
import { EventoCita } from './EventoCita';
import { DialogoConfirmarCambio } from './DialogoConfirmarCambio';
import { mensajesCalendario, configuracionHorario, coloresCita } from './configuracion';
import type { Cita, EventoCita as EventoCitaTipo, VistaCalendario } from './tipos';

// Configurar localizador con date-fns
const locales = { es };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// Tipar correctamente el calendario con DnD
const CalendarioConArrastrar = withDragAndDrop<EventoCitaTipo, object>(Calendar);

interface CalendarioComponenteProps {
  citas: Cita[];
  onActualizarCita?: (id: string, inicio: Date, fin: Date) => Promise<void>;
  onCrearCita?: (inicio: Date, fin: Date) => void;
}

export default function CalendarioComponente({ citas, onActualizarCita, onCrearCita }: CalendarioComponenteProps) {
  const [esMobile, setEsMobile] = useState(false);
  const [claveCalendario, setClaveCalendario] = useState(0);
  const [eventos, setEventos] = useState<EventoCitaTipo[]>([]);
  const [vistaActual, setVistaActual] = useState<VistaCalendario>('week');
  const [fechaActual, setFechaActual] = useState(new Date());
  const [mostrarDialogoConfirmar, setMostrarDialogoConfirmar] = useState(false);
  const [actualizacionPendiente, setActualizacionPendiente] = useState<{
    event: EventoCitaTipo;
    start: Date;
    end: Date;
  } | null>(null);

  // Mapear citas a eventos del calendario
  useEffect(() => {
    const eventosMapeados: EventoCitaTipo[] = citas.map((cita) => ({
      ...cita,
      start: new Date(cita.start),
      end: new Date(cita.end),
      color: cita.color || coloresCita[cita.estado as keyof typeof coloresCita] || coloresCita.default,
    }));
    setEventos(eventosMapeados);
  }, [citas]);

  // Detectar si es móvil
  useEffect(() => {
    const verificarMobile = () => {
      const mobile = window.innerWidth <= 768;
      setEsMobile(mobile);
      setVistaActual(mobile ? 'day' : 'week');
      setClaveCalendario((prev) => prev + 1);
    };
    
    verificarMobile();
    window.addEventListener('resize', verificarMobile);
    return () => window.removeEventListener('resize', verificarMobile);
  }, []);

  // Configurar vistas según dispositivo
  const vistas: VistaCalendario[] = esMobile 
    ? ['day', 'agenda'] 
    : ['month', 'week', 'day', 'agenda'];

  // Manejar selección de rango (para crear nueva cita)
  function alSeleccionarRango({ start, end }: { start: Date; end: Date }) {
    if (onCrearCita) {
      onCrearCita(start, end);
    } else {
      toast.info('Nueva cita', {
        description: `Seleccionado: ${format(start, 'HH:mm', { locale: es })} - ${format(end, 'HH:mm', { locale: es })}`,
      });
    }
  }

  // Manejar cambio de vista
  function alCambiarVista(nuevaVista: View) {
    setVistaActual(nuevaVista as VistaCalendario);
  }

  // Manejar navegación de fechas
  function alNavegar(nuevaFecha: Date) {
    setFechaActual(nuevaFecha);
  }

  // Manejar arrastrar y soltar evento
  function alArrastrarEvento({ event, start, end }: { event: EventoCitaTipo; start: Date | string; end: Date | string }) {
    setActualizacionPendiente({ 
      event, 
      start: new Date(start), 
      end: new Date(end) 
    });
    setMostrarDialogoConfirmar(true);
  }

  // Confirmar actualización de cita
  async function confirmarActualizacion() {
    if (!actualizacionPendiente) return;

    const { event, start, end } = actualizacionPendiente;
    
    // Actualizar eventos localmente
    const eventosActualizados = eventos.map((e) => 
      e.id === event.id ? { ...e, start, end } : e
    );
    setEventos(eventosActualizados);
    
    setMostrarDialogoConfirmar(false);
    
    try {
      // Si se proporciona función de actualización, ejecutarla
      if (onActualizarCita) {
        await onActualizarCita(event.id, start, end);
      }
      
      toast.success('Cita actualizada', {
        description: 'La fecha de la cita se ha actualizado correctamente.',
      });
    } catch (error) {
      // Revertir cambios en caso de error
      setEventos(eventos);
      toast.error('Error al actualizar', {
        description: 'No se pudo actualizar la fecha de la cita.',
      });
    } finally {
      setActualizacionPendiente(null);
    }
  }

  // Cancelar actualización
  function cancelarActualizacion() {
    setMostrarDialogoConfirmar(false);
    setActualizacionPendiente(null);
  }

  // Configurar hora mínima y máxima
  const horaMinima = new Date();
  horaMinima.setHours(configuracionHorario.horaInicio, configuracionHorario.minutoInicio, 0);
  
  const horaMaxima = new Date();
  horaMaxima.setHours(configuracionHorario.horaFin, configuracionHorario.minutoFin, 0);

  return (
    <>
      <div className="h-full w-full">
        <CalendarioConArrastrar
          key={claveCalendario}
          localizer={localizer}
          events={eventos}
          startAccessor="start"
          endAccessor="end"
          culture="es"
          timeslots={configuracionHorario.ranuras}
          step={configuracionHorario.intervalo}
          messages={mensajesCalendario}
          style={{ height: '100%', minHeight: '600px' }}
          min={horaMinima}
          max={horaMaxima}
          scrollToTime={horaMinima}
          selectable
          resizable
          views={vistas}
          view={vistaActual}
          date={fechaActual}
          onView={alCambiarVista}
          onNavigate={alNavegar}
          onSelectSlot={alSeleccionarRango}
          onEventDrop={alArrastrarEvento}
          onEventResize={alArrastrarEvento}
          components={{
            month: {
              dateHeader: (props: { date: Date }) => <CitaCountCell date={props.date} events={eventos} />,
              event: () => null, // No mostrar eventos en vista de mes
            },
            event: EventoCita,
          }}
          eventPropGetter={(event: EventoCitaTipo) => ({
            style: {
              backgroundColor: event.color || coloresCita.default,
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 500,
              borderRadius: '0.5rem',
              padding: '0.375rem 0.625rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.2s ease-in-out',
            },
          })}
        />
      </div>

      <DialogoConfirmarCambio
        open={mostrarDialogoConfirmar}
        onConfirm={confirmarActualizacion}
        onCancel={cancelarActualizacion}
        fechaAnterior={actualizacionPendiente?.event.start}
        fechaNueva={actualizacionPendiente?.start}
      />
    </>
  );
}
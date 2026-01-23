
import React from 'react';
import Link from 'next/link';
import { EventoLineaTiempo, Estado } from './constas';
import { Calendar, CheckCircle, Info, Clock, ArrowRight } from 'lucide-react';

interface TimelineCardProps {
  event: EventoLineaTiempo;
  isLeft: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ event, isLeft }) => {
  const statusColors: Record<Estado, string> = {
    'Programado': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    'Completado': 'bg-gray-500/10 text-gray-600 border-gray-500/20',
    'Pendiente': 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    'Cancelado': 'bg-red-500/10 text-red-600 border-red-500/20',
    'En Progreso': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  };

  const iconColors: Record<Estado, string> = {
    'Programado': 'bg-blue-500 text-white',
    'Completado': 'bg-gray-400 text-white',
    'Pendiente': 'bg-yellow-500 text-white',
    'Cancelado': 'bg-red-500 text-white',
    'En Progreso': 'bg-purple-500 text-white',
  };

  const getIcon = (iconName: string) => {
    const iconProps = { className: "w-4 h-4" };
    switch (iconName) {
      case 'event':
      case 'calendar_month':
        return <Calendar {...iconProps} />;
      case 'check':
      case 'check_circle':
        return <CheckCircle {...iconProps} />;
      case 'cleaning_services':
      case 'info':
        return <Info {...iconProps} />;
      case 'medical_services':
      default:
        return <Clock {...iconProps} />;
    }
  };

  return (
    <div className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${!isLeft ? 'md:flex-row-reverse' : ''}`}>
      {/* Date info section */}
      <div className={`md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
        <span className={`${event.estado === 'Programado' ? 'text-blue-600' : 'text-gray-600'} font-bold tracking-tighter text-xs uppercase`}>
          {event.fechaRelativa}
        </span>
        <h4 className="text-xl font-bold text-gray-900">{event.titulo}</h4>
        <p className="text-gray-500 text-sm">{event.fecha} • {event.hora}</p>
      </div>

      {/* Central Marker */}
      <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 z-10 size-10 rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-all ${iconColors[event.estado]}`}>
        {getIcon(event.icono)}
      </div>

      {/* Card Content section */}
      <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isLeft ? 'md:pl-12' : 'md:pr-12'}`}>
        <Link href="/panel/consultas/1">
          <div className="bg-white border border-gray-200 p-6 rounded-lg hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <span className={`${statusColors[event.estado]} text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider border`}>
                {event.estado}
              </span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">{event.titulo}</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{event.descripcion}</p>
            
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <img 
                alt={event.personal.nombre} 
                className="size-10 rounded-full object-cover border-2 border-gray-200" 
                src={event.personal.avatar}
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">{event.personal.nombre}</p>
                <p className="text-xs text-gray-500">{event.personal.rol}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TimelineCard;

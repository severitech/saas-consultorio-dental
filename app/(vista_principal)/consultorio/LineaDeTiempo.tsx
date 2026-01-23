
import React from 'react';
import { TimelineEvent } from './constas';

interface TimelineCardProps {
  event: TimelineEvent;
  isLeft: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ event, isLeft }) => {
  const statusColors = {
    'Scheduled': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    'Completed': 'bg-gray-500/10 text-gray-600 border-gray-500/20',
    'Pending': 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    'Cancelled': 'bg-red-500/10 text-red-600 border-red-500/20',
  };

  const iconColors = {
    'Scheduled': 'bg-blue-500 text-white',
    'Completed': 'bg-gray-400 text-white',
    'Pending': 'bg-yellow-500 text-white',
    'Cancelled': 'bg-red-500 text-white',
  };

  return (
    <div className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${!isLeft ? 'md:flex-row-reverse' : ''}`}>
      {/* Date info section */}
      <div className={`md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
        <span className={`${event.status === 'Scheduled' ? 'text-blue-600' : 'text-gray-600'} font-bold tracking-tighter text-xs uppercase`}>
          {event.relativeDate}
        </span>
        <h4 className="text-xl font-bold text-gray-900">{event.title}</h4>
        <p className="text-gray-500 text-sm">{event.date} • {event.time}</p>
      </div>

      {/* Central Marker */}
      <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 z-10 size-10 rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-all ${iconColors[event.status]}`}>
        <span className={`material-symbols-outlined text-sm font-bold`}>
          {event.icon}
        </span>
      </div>

      {/* Card Content section */}
      <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isLeft ? 'md:pl-12' : 'md:pr-12'}`}>
        <div className="bg-white border border-gray-200 p-6 rounded-lg hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <span className={`${statusColors[event.status]} text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider border`}>
              {event.status}
            </span>
            <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity text-blue-600">
              arrow_forward
            </span>
          </div>
          <h3 className="text-lg font-bold mb-2 text-gray-900">{event.title}</h3>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">{event.description}</p>
          
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <img 
              alt={event.staff.name} 
              className="size-10 rounded-full object-cover border-2 border-gray-200" 
              src={event.staff.avatar}
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">{event.staff.name}</p>
              <p className="text-xs text-gray-500">{event.staff.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;

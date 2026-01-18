// Configuración y mensajes del calendario en español
export const mensajesCalendario = {
  allDay: 'Todo el día',
  previous: 'Anterior',
  next: 'Siguiente',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'No hay citas en este rango',
  showMore: (total: number) => `+ Ver más (${total})`,
  work_week: 'Semana laboral',
  yesterday: 'Ayer',
  tomorrow: 'Mañana',
};

export const configuracionHorario = {
  horaInicio: 7, // 7:00 AM
  horaFin: 22, // 10:00 PM
  minutoInicio: 0,
  minutoFin: 30,
  intervalo: 30, // minutos
  ranuras: 1,
};

export const coloresCita = {
  pendiente: '#f59e0b', // Amarillo
  confirmada: '#10b981', // Verde
  cancelada: '#ef4444', // Rojo
  completada: '#6366f1', // Azul
  default: '#3b82f6', // Azul primario
};

// Tipos para el calendario
export interface Cita {
  id: string;
  title: string;
  motivo: string;
  start: Date;
  end: Date;
  estado: string;
  tipo: string;
  consultorio?: string;
  color?: string;
  idpaciente?: string;
  iddoctor?: string;
  doctor?: string;
  paciente: string;
}

export interface EventoCita extends Cita {
  // Extiende Cita para el calendario
}

export type VistaCalendario = 'month' | 'week' | 'day' | 'agenda';

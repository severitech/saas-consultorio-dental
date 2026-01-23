
export type Estado = 'Programado' | 'Completado' | 'Pendiente' | 'Cancelado' | 'En Progreso';

export interface Personal {
  nombre: string;
  rol: string;
  avatar: string;
}

export interface EventoLineaTiempo {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  fechaRelativa: string;
  estado: Estado;
  personal: Personal;
  icono: string;
  precio?: number;
  procedimientos?: string[];
}

export interface CaraDiente {
  vestibular: 'sano' | 'caries' | 'corona' | 'resina' | 'tratado';
  distal: 'sano' | 'caries' | 'corona' | 'resina' | 'tratado';
  oclusal: 'sano' | 'caries' | 'corona' | 'resina' | 'tratado';
  mesial: 'sano' | 'caries' | 'corona' | 'resina' | 'tratado';
  lingual: 'sano' | 'caries' | 'corona' | 'resina' | 'tratado';
}

export interface DienteEstado {
  numero: number;
  estado: 'sano' | 'caries' | 'corona' | 'ausente' | 'tratado' | 'resina';
  notas?: string;
  caras?: CaraDiente;
}

export interface SesionTratamiento {
  numeroSesion: number;
  fecha: string;
  estado: 'completado' | 'en-progreso' | 'pendiente';
  descripcion: string;
  procedimientos: string[];
  dientesAtendidos: number[];
  dientesAfectados?: number[];
  observaciones: string;
  proximaCita?: string;
  monto?: number;
  procedimientosRealizados?: string[];
  esDelCronograma?: boolean;
}

export interface PlanTratamiento {
  id: string;
  titulo: string;
  descripcion: string;
  estado: Estado;
  precio: number;
  fechaInicio?: string;
  fechaFin?: string;
  procedimientos: string[];
  sesiones: SesionTratamiento[];
  sesionActual: number;
  totalSesiones: number;
}

export interface RegistroPaciente {
  id: string;
  nombre: string;
  apellido?: string;
  edad: number;
  telefono?: string;
  email?: string;
  numeroExpediente: string;
  ultimaVisita: string;
  estado: string;
  alertas?: string[];
  alergias?: string[];
  condicionesMedicas?: string[];
  resumen: string;
  historial: EventoLineaTiempo[];
  odontograma: DienteEstado[];
  planesTratamiento: PlanTratamiento[];
  hallazgos: string;
  radiografias?: string[];
  montoTotal?: number;
  montoPagado?: number;
  saldoPendiente?: number;
}

export const DIENTES_SUPERIORES = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
export const DIENTES_INFERIORES = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

export const HISTORIAL_MOCK: EventoLineaTiempo[] = [
  {
    id: '1',
    titulo: 'Ajuste Ortodóntico',
    descripcion: 'Realineación mensual y revisión de alambre.',
    fecha: '24 Oct, 2023',
    hora: '10:30 AM',
    fechaRelativa: 'Próxima Semana',
    estado: 'Programado',
    icono: 'event',
    personal: {
      nombre: 'Dra. María García',
      rol: 'Ortodoncista',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDjNYmzuRPKz7tqSY9sTC2c6x9ZXuDrGAiU2VXwCvoZwKKimx66Yv8saf7r7i_VyCgqFwz2UeZJ_I7F0ME77WZr3KcbZ5ezG1VE-N7TwReA1neyveD4pfuqB6NXF4N-5BOmMW7T2e7Vm6rmSXnr4Xy3nW9zgYEH5laK9KHETIvimTumULm7n9UDD0oGPg0yCvnNPdROLUeMOGST-iCIdw61tjn03aLpx7j9wJxpZP75-IfMecOIH_oLh-QtlDZ7B7ae1RHwVq4zAs'
    },
    precio: 450.00
  },
  {
    id: '2',
    titulo: 'Tratamiento de Conducto',
    descripcion: 'Terapia molar inferior izquierdo. Sellado exitosamente.',
    fecha: '12 Sep, 2023',
    hora: '02:15 PM',
    fechaRelativa: 'Mes Pasado',
    estado: 'Completado',
    icono: 'check',
    personal: {
      nombre: 'Dr. Carlos Mendoza',
      rol: 'Endodoncista',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl14f25FXZqy_gt1Agd37MCs-dtRxTGkA9F1RF_ZI0AWHDap2WjCrFi0-xTsjOWJHGYQT2x9T6zj6AQKCMKOOWVIZ6Et4WWMMaq7gU215K4DHWQT_32dlK5ultmqzxxsKpZ3d7Qb_Uv18Tr92p2bk2k1U0FS4fUmnHByUaTnAGNt3fX3puK2NUTWBiGz5iKt_lGxLFmrgrKUtn33aVexhIuxfrbeYZTDhHMgfbIzOzTUXXpl5bmKXWMCiJt0XMghuwOpxm-XVij1I'
    },
    precio: 2800.00
  },
  {
    id: '3',
    titulo: 'Limpieza y Pulido',
    descripcion: 'Limpieza regular de 6 meses. No se detectaron nuevas caries.',
    fecha: '05 Jun, 2023',
    hora: '09:00 AM',
    fechaRelativa: 'Hace 3 meses',
    estado: 'Completado',
    icono: 'cleaning_services',
    personal: {
      nombre: 'Dra. Ana López',
      rol: 'Higienista Dental',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdANCas6zrHz3xaV1X3PgApEVoJxM9DtKJA0DemuXB8H9DLA52ikZ1kG_sViqTa2CHnHjeAPRZPLecEy-uPCBw5mPgPnSZEIgdYPs7VzYyA73wXtxaxTE9hLEe_-4jntECeb6xETNvN6LrszM4GNEAslwKOcBKmFKvn3OeQc3EwzIIQ-LKTzJNuTvX3TRA9gc29K0MZ_J8dhG0VGOJ_AlsE6IGjkvq_Bd1AcJkoStqBfxhSoWSxeogR-h9E7PYE1SA81QzIO5aarI'
    },
    precio: 650.00
  },
  {
    id: '4',
    titulo: 'Empaste de Caries',
    descripcion: 'Empaste de resina compuesta en premolar superior derecho.',
    fecha: '15 Mar, 2023',
    hora: '11:45 AM',
    fechaRelativa: 'Hace 6 meses',
    estado: 'Completado',
    icono: 'medical_services',
    personal: {
      nombre: 'Dr. Carlos Mendoza',
      rol: 'Odontólogo General',
      avatar: 'https://picsum.photos/seed/doc1/100/100'
    },
    precio: 850.00
  }
];

export const PACIENTES_MOCK: RegistroPaciente[] = [
  {
    id: '1',
    nombre: 'Jonathan',
    apellido: 'Doe',
    edad: 32,
    telefono: '+52 555 123 4567',
    email: 'jonathan.doe@email.com',
    numeroExpediente: '#48223',
    ultimaVisita: '12 Oct, 2025',
    estado: 'PLAN ACTIVO',
    alertas: ['Alérgico a la Penicilina'],
    alergias: ['Penicilina', 'Látex'],
    condicionesMedicas: ['Hipertensión controlada', 'Diabetes tipo 2'],
    resumen: 'Paciente con tratamiento de ortodoncia en curso',
    historial: [
      {
        id: '1',
        titulo: 'Diagnóstico Inicial y Profilaxis',
        descripcion: 'Limpieza profunda, radiografía panorámica y cartografía periodontal detallada.',
        fecha: '12 Oct, 2025',
        hora: '10:00 AM',
        fechaRelativa: 'COMPLETADO',
        estado: 'Completado',
        icono: 'check',
        personal: {
          nombre: 'Dra. María García',
          rol: 'Odontólogo General',
          avatar: 'https://picsum.photos/seed/doc1/100/100'
        },
        precio: 1250.00
      },
      {
        id: '2',
        titulo: 'Trabajo Restaurativo (Cuadrante I)',
        descripcion: 'Cuarta 18: Resina Compuesta. Superficie: Oclusal/Distal/Lingual.',
        fecha: '24 Oct, 2025',
        hora: '02:00 PM',
        fechaRelativa: '1ER PROGRESO',
        estado: 'En Progreso',
        icono: 'pending',
        personal: {
          nombre: 'Dr. Carlos Mendoza',
          rol: 'Endodoncista',
          avatar: 'https://picsum.photos/seed/doc2/100/100'
        },
        precio: 0,
        procedimientos: [
          'Cuarta 18: Resina Compuesta',
          'Cuarta 16: Preparación Cavidad Profunda',
          'Superficie: Oclusal/Distal/Lingual'
        ]
      },
      {
        id: '3',
        titulo: 'Procedimiento no planificado',
        descripcion: 'Extracción de muela del juicio impactada.',
        fecha: 'Por Programar',
        hora: '',
        fechaRelativa: 'SESIÓN EXTRA - POR PROGRAMAR',
        estado: 'Pendiente',
        icono: 'schedule',
        personal: {
          nombre: 'Dr. Carlos Mendoza',
          rol: 'Cirujano Oral',
          avatar: 'https://picsum.photos/seed/doc2/100/100'
        },
        precio: 0
      }
    ],
    odontograma: [
      { 
        numero: 18, 
        estado: 'caries', 
        notas: 'Caries oclusal',
        caras: {
          vestibular: 'sano',
          distal: 'sano',
          oclusal: 'caries',
          mesial: 'sano',
          lingual: 'sano'
        }
      },
      { numero: 17, estado: 'sano' },
      { 
        numero: 16, 
        estado: 'caries', 
        notas: 'Caries profunda',
        caras: {
          vestibular: 'caries',
          distal: 'sano',
          oclusal: 'caries',
          mesial: 'caries',
          lingual: 'sano'
        }
      },
      { numero: 15, estado: 'sano' },
      { numero: 14, estado: 'sano' },
      { numero: 13, estado: 'sano' },
      { numero: 12, estado: 'sano' },
      { numero: 11, estado: 'sano' },
      { numero: 21, estado: 'sano' },
      { numero: 22, estado: 'sano' },
      { numero: 23, estado: 'sano' },
      { numero: 24, estado: 'sano' },
      { numero: 25, estado: 'sano' },
      { 
        numero: 26, 
        estado: 'corona', 
        notas: 'Corona cerámica',
        caras: {
          vestibular: 'corona',
          distal: 'corona',
          oclusal: 'corona',
          mesial: 'corona',
          lingual: 'corona'
        }
      },
      { numero: 27, estado: 'sano' },
      { numero: 28, estado: 'ausente' },
      { numero: 48, estado: 'sano' },
      { numero: 47, estado: 'sano' },
      { 
        numero: 46, 
        estado: 'tratado', 
        notas: 'Endodoncia previa',
        caras: {
          vestibular: 'resina',
          distal: 'tratado',
          oclusal: 'resina',
          mesial: 'tratado',
          lingual: 'sano'
        }
      },
      { numero: 45, estado: 'sano' },
      { numero: 44, estado: 'sano' },
      { numero: 43, estado: 'sano' },
      { numero: 42, estado: 'sano' },
      { numero: 41, estado: 'sano' },
      { numero: 31, estado: 'sano' },
      { numero: 32, estado: 'sano' },
      { numero: 33, estado: 'sano' },
      { numero: 34, estado: 'sano' },
      { numero: 35, estado: 'sano' },
      { numero: 36, estado: 'sano' },
      { numero: 37, estado: 'sano' },
      { numero: 38, estado: 'sano' }
    ],
    planesTratamiento: [
      {
        id: 'plan-1',
        titulo: 'Plan de Tratamiento Restaurativo',
        descripcion: 'Tratamiento restaurativo completo de cuadrante superior',
        estado: 'En Progreso',
        precio: 5284.00,
        fechaInicio: '12 Oct, 2025',
        procedimientos: [
          'Diagnóstico Inicial y Profilaxis',
          'Trabajo Restaurativo (Cuadrante I)',
          'Trabajo Restaurativo (Cuadrante II)',
          'Control y Seguimiento'
        ],
        sesionActual: 2,
        totalSesiones: 4,
        sesiones: [
          {
            numeroSesion: 1,
            fecha: '12 Oct, 2025',
            estado: 'completado',
            descripcion: 'Diagnóstico Inicial y Profilaxis',
            procedimientos: [
              'Limpieza profunda',
              'Radiografía panorámica',
              'Cartografía periodontal'
            ],
            dientesAtendidos: [],
            dientesAfectados: [],
            observaciones: 'Paciente presenta buena higiene oral. Se detectaron caries en dientes 18 y 16.',
            proximaCita: '24 Oct, 2025'
          },
          {
            numeroSesion: 2,
            fecha: '24 Oct, 2025',
            estado: 'en-progreso',
            descripcion: 'Trabajo Restaurativo - Cuadrante I',
            procedimientos: [
              'Resina compuesta diente 18 (Oclusal, Distal)',
              'Preparación cavidad diente 16'
            ],
            dientesAtendidos: [18, 16],
            dientesAfectados: [18, 16],
            observaciones: 'Se trabajó en diente 18. Pendiente completar diente 16 en próxima sesión.',
            proximaCita: '05 Nov, 2025'
          },
          {
            numeroSesion: 3,
            fecha: '05 Nov, 2025',
            estado: 'pendiente',
            descripcion: 'Completar Trabajo Restaurativo',
            procedimientos: [
              'Completar resina diente 16',
              'Evaluación de diente 26 (Corona)'
            ],
            dientesAtendidos: [16, 26],
            dientesAfectados: [16, 26],
            observaciones: '',
            proximaCita: ''
          },
          {
            numeroSesion: 4,
            fecha: 'Por programar',
            estado: 'pendiente',
            descripcion: 'Control y Seguimiento Final',
            procedimientos: [
              'Control general',
              'Seguimiento de tratamiento',
              'Recomendaciones finales'
            ],
            dientesAtendidos: [],
            dientesAfectados: [],
            observaciones: '',
            proximaCita: ''
          }
        ]
      }
    ],
    hallazgos: 'Escribe los hallazgos clínicos para este diente.\n\nCaries: Profunda, radiografía panorámica y cartografía periodontal detallada.',
    radiografias: [],
    montoTotal: 5284.00,
    montoPagado: 1850.00,
    saldoPendiente: 3434.00
  }
];

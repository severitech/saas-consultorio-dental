import {
  IconCalendar, IconUsers, IconStethoscope,
  IconFileInvoice, IconClipboard, IconBuilding,
    IconChartLine,
  IconSettings, IconChartBar,  IconHelp,
  IconFileText, IconMedicineSyrup, IconReceipt,
  IconCalendarEvent, IconUserCheck, IconListCheck,
  IconHeartbeat, IconDental, IconPrescription,
  IconHistory, IconClipboardCheck, IconCalendarStats,
  IconCurrencyDollar, IconBellRinging,
  IconGraph, IconFileAnalytics, IconUserCircle,
  IconShield, IconLayoutDashboard,
  IconUserPlus
} from "@tabler/icons-react";

export type Rol = 'SUPER_ADMIN' | 'ADMIN' | 'DOCTOR' | 'RECEPCIONISTA' | 'PACIENTE';

export interface NavItem {
  title: string;
  url: string;
  icon: any;
  roles: Rol[]; // Para filtrado futuro
  categoria: string;
  descripcion?: string;
  badge?: string; // Para notificaciones
}

export const navegacion: NavItem[] = [
  // ==================== CATEGORÍA: DASHBOARD ====================
  {
    title: "Inicio",
    url: "/panel",
    icon: IconLayoutDashboard,
    roles: ['SUPER_ADMIN', 'ADMIN', 'DOCTOR', 'RECEPCIONISTA'],
    categoria: "Principal",
    descripcion: "Vista general"
  },

  // ==================== CATEGORÍA: AGENDA Y CITAS ====================
  {
    title: "Calendario",
    url: "/panel/calendario",
    icon: IconCalendar,
    roles: ['ADMIN', 'DOCTOR', 'RECEPCIONISTA'],
    categoria: "Agenda",
    descripcion: "Ver y gestionar citas",
    badge: "5"
  },
  {
    title: "Citas del Día",
    url: "/panel/citas-hoy",
    icon: IconCalendarStats,
    roles: ['ADMIN', 'DOCTOR', 'RECEPCIONISTA'],
    categoria: "Agenda",
    badge: "3"
  },

  // ==================== CATEGORÍA: PACIENTES ====================
  {
    title: "Pacientes",
    url: "/panel/pacientes",
    icon: IconUsers,
    roles: ['ADMIN', 'DOCTOR', 'RECEPCIONISTA'],
    categoria: "Pacientes",
    descripcion: "Gestión de pacientes"
  },
  {
    title: "Historial",
    url: "/panel/historial-medico",
    icon: IconHistory,
    roles: ['ADMIN', 'DOCTOR'],
    categoria: "Pacientes"
  },

  // ==================== CATEGORÍA: CLÍNICA ====================
  {
    title: "Consultas",
    url: "/panel/consultas-hoy",
    icon: IconClipboard,
    roles: ['DOCTOR'],
    categoria: "Clínica",
    badge: "4"
  },
  {
    title: "Tratamientos",
    url: "/panel/tratamientos",
    icon: IconStethoscope,
    roles: ['ADMIN', 'DOCTOR'],
    categoria: "Clínica"
  },
  {
    title: "Odontograma",
    url: "/panel/odontograma",
    icon: IconDental,
    roles: ['DOCTOR'],
    categoria: "Clínica"
  },
  {
    title: "Rama y Categorias",
    url: "/panel/rama-y-categorias",
    icon: IconBuilding,
    roles: ['ADMIN','DOCTOR'],
    categoria: "Clínica"
  },

  // ==================== CATEGORÍA: FACTURACIÓN ====================
  {
    title: "Facturación",
    url: "/panel/facturacion",
    icon: IconReceipt,
    roles: ['ADMIN', 'RECEPCIONISTA'],
    categoria: "Finanzas",
    descripcion: "Facturas y pagos"
  },
  {
    title: "Pagos Pendientes",
    url: "/panel/pagos-pendientes",
    icon: IconCurrencyDollar,
    roles: ['ADMIN', 'RECEPCIONISTA'],
    categoria: "Finanzas",
    badge: "2"
  },

 

  // ==================== CATEGORÍA: REPORTES ====================
  {
    title: "Estadísticas",
    url: "/panel/estadisticas",
    icon: IconChartBar,
    roles: ['ADMIN', 'DOCTOR'],
    categoria: "Reportes"
  },

  // ==================== CATEGORÍA: ADMINISTRACIÓN ====================
  {
    title: "Usuarios",
    url: "/panel/usuarios",
    icon: IconUserCircle,
    roles: ['SUPER_ADMIN', 'ADMIN'],
    categoria: "Administración"
  },
  {
    title: "Planes y Suscripciones",
    url: "/panel/planes-y-suscripciones",
    icon: IconFileInvoice,
    roles: ['SUPER_ADMIN'],
    categoria: "Administración"
  },
  {
    title: "Configuración",
    url: "/panel/configuracion",
    icon: IconSettings,
    roles: ['SUPER_ADMIN', 'ADMIN'],
    categoria: "Administración"
  }
];

// Función para agrupar por categoría (para pruebas, muestra todo)
export function getNavegacionAgrupada() {
  const agrupado = navegacion.reduce((acc, item) => {
    if (!acc[item.categoria]) {
      acc[item.categoria] = [];
    }
    acc[item.categoria].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  return agrupado;
}

// Obtener categorías únicas ordenadas
export function getCategorias() {
  const categorias = [...new Set(navegacion.map(item => item.categoria))];
  
  // Orden personalizado para que las más importantes estén primero
  const ordenPreferido = [
    "Principal",
    "Agenda",
    "Pacientes",
    "Clínica",
    "Finanzas",
    "Reportes",
    "Administración"
  ];
  
  return categorias.sort((a, b) => {
    const indexA = ordenPreferido.indexOf(a);
    const indexB = ordenPreferido.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });
}
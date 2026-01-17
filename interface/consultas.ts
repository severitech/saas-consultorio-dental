// Interfaces relacionadas con consultas y citas

export enum EstadoCitaEnum {
  PENDIENTE = "PENDIENTE",
  CONFIRMADA = "CONFIRMADA",
  CANCELADA = "CANCELADA",
  COMPLETADA = "COMPLETADA",
}

export interface ConsultaInterface {
  id: string;
  descripcion?: string | null;
  fecha: Date;
  pacienteId: string;
  empresaId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CitaInterface {
  id: string;
  fecha: Date;
  descripcion?: string | null;
  datos: string;
  estado: EstadoCitaEnum;
  pacienteId: string;
  sucursalId: string;
  consultaId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos extendidos
export interface ConsultaConRelaciones extends ConsultaInterface {
  paciente: {
    id: string;
    usuario: {
      nombre?: string | null;
      correo?: string | null;
    };
  };
  empresa: {
    id: string;
    nombre: string;
  };
  citas?: CitaInterface[];
}

export interface CitaConRelaciones extends CitaInterface {
  paciente: {
    id: string;
    usuario: {
      nombre?: string | null;
      correo?: string | null;
    };
  };
  sucursal: {
    id: string;
    nombre: string;
  };
  consulta?: ConsultaInterface | null;
}

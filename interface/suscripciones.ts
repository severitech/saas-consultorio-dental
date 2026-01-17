// Interfaces relacionadas con suscripciones, planes y cupones

export enum EstadoSuscripcionEnum {
  ACTIVA = "ACTIVA",
  CANCELADA = "CANCELADA",
  EXPIRADA = "EXPIRADA",
}

export interface SuscripcionInterface {
  id: string;
  empresaId: string;
  planId: string;
  cuponId?: string | null;
  fechaInicio: Date;
  fechaFin: Date;
  estado: EstadoSuscripcionEnum;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanInterface {
  id: string;
  nombre: string;
  precioMensual: number;
  descripcion?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CuponInterface {
  id: string;
  codigo: string;
  descuento: number;
  fechaExpiracion: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos extendidos
export interface SuscripcionConRelaciones extends SuscripcionInterface {
  empresa: {
    id: string;
    nombre: string;
  };
  plan: PlanInterface;
  cupon?: CuponInterface | null;
}

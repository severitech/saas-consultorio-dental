// Interfaces relacionadas con pagos y métodos de pago

export interface PagoInterface {
  id: string;
  suscripcionId: string;
  monto: number;
  moneda: string;
  metodoPagoId: string;
  usuarioId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MetodoPagoInterface {
  id: string;
  nombre: string;
}

// Tipos extendidos
export interface PagoConRelaciones extends PagoInterface {
  suscripcion: {
    id: string;
    empresaId: string;
  };
  metodopago: MetodoPagoInterface;
  usuario: {
    id: string;
    nombre?: string | null;
    correo?: string | null;
  };
}

// Interfaces relacionadas con roles y permisos

export interface RolSistemaInterface {
  id: string;
  nombre: string;
  descripcion?: string | null;
  nivel: number;
}

export interface PermisoInterface {
  id: string;
  nombre: string;
  descripcion?: string | null;
  modulo: string;
  accion: string;
}

export interface RolPermisoInterface {
  id: string;
  rolId: string;
  permisoId: string;
  concedido: boolean;
}

// Tipos extendidos
export interface RolSistemaConPermisos extends RolSistemaInterface {
  permisos: Array<{
    permiso: PermisoInterface;
    concedido: boolean;
  }>;
}

export interface PermisoConRoles extends PermisoInterface {
  roles: Array<{
    rol: RolSistemaInterface;
    concedido: boolean;
  }>;
}

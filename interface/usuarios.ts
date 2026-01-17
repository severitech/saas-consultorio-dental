// Interfaces relacionadas con usuarios y autenticación

export interface UsuarioInterface {
  id: string;
  correo?: string | null;
  nombre?: string | null;
  emailVerified?: Date | null;
  imagen?: string | null;
  contraseña?: string | null;
  rolId: string;
  empresaId?: string | null;
  rolSistemaId?: string | null;
}

export interface CuentaInterface {
  id: string;
  usuarioId: string;
  tipo: string;
  proveedor: string;
  idCuentaProveedor: string;
  tokenRefresco?: string | null;
  tokenAcceso?: string | null;
  expiraEn?: number | null;
  tipoToken?: string | null;
  alcance?: string | null;
  idToken?: string | null;
  estadoSesion?: string | null;
}

export interface SesionInterface {
  id: string;
  sessionToken: string;
  usuarioId: string;
  expires: Date;
}

export interface TokenVerificacionInterface {
  identifier: string;
  token: string;
  expires: Date;
}

export interface PermisoUsuarioInterface {
  id: string;
  usuarioId: string;
  permisoId: string;
  concedido: boolean;
}

// Enums
export enum RolEnum {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMINISTRADOR = "ADMINISTRADOR",
  DOCTOR = "DOCTOR",
  ASISTENTE = "ASISTENTE",
  PACIENTE = "PACIENTE",
}

// Tipos extendidos con relaciones
export interface UsuarioConEmpresa extends UsuarioInterface {
  empresa?: {
    id: string;
    nombre: string;
    email: string;
    telefono?: string | null;
    direccion?: string | null;
  } | null;
}

export interface UsuarioConRol extends UsuarioInterface {
  rolSistema?: {
    id: string;
    nombre: string;
    descripcion?: string | null;
    nivel: number;
  } | null;
}

export interface UsuarioConPermisos extends UsuarioInterface {
  permisoUsuarios: Array<{
    id: string;
    permisoId: string;
    concedido: boolean;
    permiso: {
      id: string;
      nombre: string;
      descripcion?: string | null;
      modulo: string;
      accion: string;
    };
  }>;
}

export interface UsuarioConCuentas extends UsuarioInterface {
  cuentas: CuentaInterface[];
}

export interface UsuarioCompleto extends UsuarioInterface {
  empresa?: {
    id: string;
    nombre: string;
    email: string;
  } | null;
  rolSistema?: {
    id: string;
    nombre: string;
    descripcion?: string | null;
    nivel: number;
    permisos?: Array<{
      permiso: {
        id: string;
        nombre: string;
        modulo: string;
        accion: string;
      };
      concedido: boolean;
    }>;
  } | null;
  permisoUsuarios?: Array<{
    id: string;
    permisoId: string;
    concedido: boolean;
    permiso: {
      id: string;
      nombre: string;
      modulo: string;
      accion: string;
    };
  }>;
  cuentas?: CuentaInterface[];
  paciente?: {
    id: string;
    fechaNacimiento?: Date | null;
    direccion?: string | null;
    historialMedico?: string | null;
    telefono?: string | null;
  } | null;
}

// Tipos para autenticación con NextAuth
export interface UsuarioSesion {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  rol?: string | null;
  rolId?: string | null;
  empresa?: string | null;
  empresaId?: string | null;
}

export interface DatosSesion {
  user: UsuarioSesion;
  expires: string;
}

// Tipos para creación y actualización
export interface CrearUsuarioDTO {
  correo: string;
  nombre?: string;
  contraseña?: string;
  rolId: string;
  empresaId?: string;
  rolSistemaId?: string;
  imagen?: string;
}

export interface ActualizarUsuarioDTO {
  correo?: string;
  nombre?: string;
  contraseña?: string;
  imagen?: string;
  empresaId?: string;
  rolSistemaId?: string;
}

export interface CambiarContraseñaDTO {
  contraseñaActual: string;
  contraseñaNueva: string;
}

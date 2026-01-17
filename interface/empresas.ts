// Interfaces relacionadas con empresas y sucursales

export interface EmpresaInterface {
  id: string;
  nombre: string;
  email: string;
  telefono?: string | null;
  direccion?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SucursalInterface {
  id: string;
  nombre: string;
  direccion?: string | null;
  telefono?: string | null;
  empresaId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos extendidos
export interface EmpresaConSucursales extends EmpresaInterface {
  sucursales: SucursalInterface[];
}

export interface SucursalConEmpresa extends SucursalInterface {
  empresa: EmpresaInterface;
}

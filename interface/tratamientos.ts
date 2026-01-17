// Interfaces relacionadas con tratamientos

export interface RamaInterface {
  id: string;
  descripcion: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoriaInterface {
  id: string;
  nombre: string;
  ramaId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TratamientoInterface {
  id: string;
  nombre: string;
  descripcion?: string | null;
  precio: number;
  categoriaId: string;
  empresaId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TratamientoConsultaInterface {
  id: string;
  tratamientoId: string;
  consultaId: string;
  precioUnitario: number;
  dienteId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DienteInterface {
  id: string;
  numero: number;
  nombre: string;
  descripcion?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos extendidos
export interface RamaConCategorias extends RamaInterface {
  categorias: CategoriaInterface[];
}

export interface CategoriaConRelaciones extends CategoriaInterface {
  rama: RamaInterface;
  tratamientos?: TratamientoInterface[];
}

export interface TratamientoConRelaciones extends TratamientoInterface {
  categoria: CategoriaInterface;
  empresa: {
    id: string;
    nombre: string;
  };
}

export interface TratamientoConsultaConRelaciones extends TratamientoConsultaInterface {
  tratamiento: TratamientoInterface;
  consulta: {
    id: string;
    fecha: Date;
    pacienteId: string;
  };
}

// Interfaces relacionadas con pacientes

export interface PacienteInterface {
  id: string;
  usuarioId: string;
  fechaNacimiento?: Date | null;
  direccion?: string | null;
  historialMedico?: string | null;
  telefono?: string | null;
}

// Tipos extendidos
export interface PacienteConUsuario extends PacienteInterface {
  usuario: {
    id: string;
    nombre?: string | null;
    correo?: string | null;
    imagen?: string | null;
  };
}

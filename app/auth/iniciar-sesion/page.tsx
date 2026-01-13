import FormularioInicioSesion from "@/components/auth/FormularioInicioSesion";

export default function PaginaInicioSesion() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Consultorio Dental
          </h1>
          <p className="text-gray-600">
            Sistema de Gestión Odontológica
          </p>
        </div>
        
        <FormularioInicioSesion />
      </div>
    </div>
  );
}

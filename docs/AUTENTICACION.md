# Sistema de Autenticación - NextAuth

Este proyecto implementa un sistema completo de autenticación con NextAuth, roles y permisos.

## 🚀 Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto (puedes copiar `.env.example`):

```bash
cp .env.example .env.local
```

Edita `.env.local` y configura:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera-un-secreto-aleatorio-aqui
DATABASE_URL="file:./dev.db"
```

Para generar un secreto seguro, ejecuta:
```bash
openssl rand -base64 32
```

### 2. Actualizar Base de Datos

Ejecuta las migraciones de Prisma para añadir el campo de contraseña:

```bash
npx prisma migrate dev --name agregar-campo-contraseña
npx prisma generate
```

### 3. Crear Usuario de Prueba

Puedes crear un usuario de prueba ejecutando en la consola de Node:

```javascript
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function crearUsuario() {
  const contraseñaHasheada = await bcrypt.hash('password123', 10);
  
  const usuario = await prisma.usuario.create({
    data: {
      correo: 'admin@ejemplo.com',
      nombre: 'Administrador',
      contraseña: contraseñaHasheada,
      rolId: 'rol-id-aqui', // Debes crear roles primero
    }
  });
  
  console.log('Usuario creado:', usuario);
}

crearUsuario();
```

## 📁 Estructura de Archivos Creados

```
lib/
  ├── auth.ts                    # Configuración de NextAuth
  └── contraseña.ts              # Utilidades para contraseñas

app/
  ├── api/auth/[...nextauth]/
  │   └── route.ts               # Ruta API de NextAuth
  └── auth/
      └── iniciar-sesion/
          └── page.tsx           # Página de inicio de sesión

components/
  └── auth/
      ├── ProveedorSesion.tsx    # Provider de sesión
      ├── FormularioInicioSesion.tsx  # Formulario de login
      ├── ProtectorRuta.tsx      # Protección de rutas
      └── MenuUsuario.tsx        # Menú de usuario

hooks/
  └── use-sesion.ts              # Hooks personalizados

types/
  └── next-auth.d.ts             # Tipos TypeScript extendidos
```

## 🔐 Uso del Sistema de Autenticación

### Login

Los usuarios pueden iniciar sesión en:
```
http://localhost:3000/auth/iniciar-sesion
```

### Usar la Sesión en Componentes

```tsx
import { useSesion, useRol } from "@/hooks/use-sesion";

export default function MiComponente() {
  const { usuario, autenticado, cerrarSesion } = useSesion();
  const { esAdmin, esDoctor } = useRol();

  if (!autenticado) {
    return <p>Por favor inicia sesión</p>;
  }

  return (
    <div>
      <p>Bienvenido, {usuario?.name}</p>
      {esAdmin && <p>Eres administrador</p>}
      <button onClick={cerrarSesion}>Cerrar Sesión</button>
    </div>
  );
}
```

### Proteger Rutas

```tsx
import ProtectorRuta from "@/components/auth/ProtectorRuta";

export default function PaginaProtegida() {
  return (
    <ProtectorRuta rolesPermitidos={["SUPER_ADMIN", "ADMINISTRADOR"]}>
      <h1>Solo administradores pueden ver esto</h1>
    </ProtectorRuta>
  );
}
```

### Proteger Rutas en el Servidor

```tsx
import { getServerSession } from "next-auth";
import { opcionesAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PaginaServidor() {
  const sesion = await getServerSession(opcionesAuth);

  if (!sesion) {
    redirect("/auth/iniciar-sesion");
  }

  return <h1>Página protegida del servidor</h1>;
}
```

## 👥 Roles Disponibles

Los roles definidos en el sistema son:

- `SUPER_ADMIN`: Acceso total
- `ADMINISTRADOR`: Gestión de la empresa
- `DOCTOR`: Gestión de pacientes y tratamientos
- `ASISTENTE`: Asistencia en consultas
- `PACIENTE`: Acceso limitado a su información

## 🎨 Personalización

### Modificar Página de Login

Edita `components/auth/FormularioInicioSesion.tsx` para personalizar el diseño.

### Añadir Proveedores OAuth

Edita `lib/auth.ts` y añade proveedores adicionales:

```typescript
import GoogleProvider from "next-auth/providers/google";

providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  // ... otros proveedores
]
```

## 🔒 Seguridad

- Las contraseñas se almacenan hasheadas con bcrypt
- Las sesiones usan JWT
- Configura `NEXTAUTH_SECRET` en producción
- Usa HTTPS en producción

## 📝 Notas

- El sistema está completamente en español
- Los componentes usan shadcn/ui
- Compatible con el schema de Prisma existente
- Soporta múltiples roles y permisos

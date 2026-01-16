# 📚 Guía de Aprendizaje: Autenticación con NextAuth

## 🎯 ¿Qué Acabas de Lograr?

Al hacer login con Google/Facebook, NextAuth **automáticamente**:
1. ✅ Guardó tu usuario en la base de datos
2. ✅ Creó una sesión activa
3. ✅ Vinculó tu cuenta de Google/Facebook con tu usuario
4. ✅ Te redirigió al panel

**TODO ESTO FUE AUTOMÁTICO** gracias al `PrismaAdapter` que configuramos.

---

## 📊 ¿Qué se Guardó en la Base de Datos?

### 1. Ver los Datos Guardados

Ejecuta este comando para abrir Prisma Studio (una interfaz visual de tu base de datos):

```bash
npx prisma studio
```

Se abrirá en: `http://localhost:5555`

### 2. Tablas Creadas y Datos

Cuando iniciaste sesión con Google, NextAuth guardó datos en **3 tablas**:

#### **Tabla: `usuarios`**
```
id: "clyxyz123..."
correo: "tu-email@gmail.com"
nombre: "Tu Nombre"
image: "https://lh3.googleusercontent.com/..."
emailVerified: "2026-01-16..."
rolId: null (aún no asignado)
empresaId: null (aún no asignado)
```

#### **Tabla: `cuentas`**
```
id: "abc123..."
usuarioId: "clyxyz123..." (FK → usuarios)
proveedor: "google"
idCuentaProveedor: "123456789..." (tu ID de Google)
tokenAcceso: "ya29.a0..." (token de acceso a Google API)
tokenRefresco: "1//..." (para renovar el token)
expiraEn: 3599 (segundos)
```

#### **Tabla: `sesiones`**
```
id: "session123..."
sessionToken: "abc-def-ghi..." (cookie en tu navegador)
usuarioId: "clyxyz123..." (FK → usuarios)
expires: "2026-02-16..." (expira en 30 días)
```

---

## 🧠 ¿Cómo Funciona la Sesión?

### 1. Cuando Inicias Sesión

```
Usuario → Click "Google" → Google autoriza → NextAuth recibe datos
   ↓
PrismaAdapter verifica: ¿Existe usuario con este email?
   ↓
NO → Crea Usuario + Cuenta + Sesión
SÍ → Solo crea nueva Sesión
   ↓
NextAuth guarda cookie en tu navegador: session-token=abc123...
   ↓
Redirige a /panel
```

### 2. Cuando Visitas una Página

```
Navegador → Envía cookie: session-token=abc123...
   ↓
NextAuth busca en la tabla sesiones: WHERE sessionToken = "abc123..."
   ↓
Encuentra sesión → Obtiene usuarioId
   ↓
Busca en usuarios: WHERE id = usuarioId
   ↓
Devuelve datos del usuario a tu aplicación
```

---

## 💻 ¿Cómo Usar los Datos del Usuario en tu App?

### 1. En un Componente de Cliente

```tsx
// app/panel/page.tsx
"use client";

import { useSesion } from "@/hooks/use-sesion";

export default function PanelPage() {
  const { usuario, autenticado, cargando } = useSesion();

  if (cargando) return <p>Cargando...</p>;
  if (!autenticado) return <p>No autenticado</p>;

  return (
    <div>
      <h1>¡Hola, {usuario?.name}!</h1>
      <p>Email: {usuario?.email}</p>
      <img src={usuario?.image || ""} alt="Avatar" />
    </div>
  );
}
```

### 2. En un Server Component

```tsx
// app/panel/perfil/page.tsx
import { getServerSession } from "next-auth";
import { opcionesAuth } from "@/lib/auth";

export default async function PerfilPage() {
  const sesion = await getServerSession(opcionesAuth);

  if (!sesion) {
    return <p>No autenticado</p>;
  }

  return (
    <div>
      <h1>Perfil de {sesion.user.name}</h1>
      <p>Email: {sesion.user.email}</p>
    </div>
  );
}
```

---

## 🔐 Proteger Rutas (Solo Usuarios Autenticados)

### Opción 1: Con Componente

```tsx
// app/panel/page.tsx
import ProtectorRuta from "@/components/auth/ProtectorRuta";

export default function PanelPage() {
  return (
    <ProtectorRuta>
      {/* Solo usuarios autenticados verán esto */}
      <h1>Panel Privado</h1>
    </ProtectorRuta>
  );
}
```

### Opción 2: Con Middleware (Recomendado)

Crea el archivo `middleware.ts` en la raíz del proyecto:

```tsx
// middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/panel/:path*", "/admin/:path*"], // Rutas protegidas
};
```

Ahora **todas las rutas que empiecen con `/panel` o `/admin`** requieren login automáticamente.

---

## 🎨 Ejemplo Práctico: Mostrar Info del Usuario

Voy a crear una página de ejemplo para ti:

### 1. Página de Perfil

```tsx
// app/panel/mi-perfil/page.tsx
"use client";

import { useSesion } from "@/hooks/use-sesion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function MiPerfilPage() {
  const { usuario, cargando, cerrarSesion } = useSesion();

  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!usuario) {
    return <p>No autenticado</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Mi Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={usuario.image || ""} alt={usuario.name || ""} />
              <AvatarFallback>
                {usuario.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{usuario.name}</h2>
              <p className="text-muted-foreground">{usuario.email}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p><strong>ID:</strong> {(usuario as any).id}</p>
            <p><strong>Rol:</strong> {(usuario as any).rol || "No asignado"}</p>
            <p><strong>Empresa:</strong> {(usuario as any).empresa || "No asignada"}</p>
          </div>

          <Button onClick={cerrarSesion} variant="destructive">
            Cerrar Sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## 🔧 Tareas Comunes que Puedes Hacer

### 1. Asignar un Rol al Usuario

Después de iniciar sesión, puedes asignar un rol manualmente en Prisma Studio:

1. Abre Prisma Studio: `npx prisma studio`
2. Ve a la tabla `usuarios`
3. Edita tu usuario
4. En `rolSistemaId`, selecciona un rol (primero debes crear roles en `RolSistema`)

O con código:

```tsx
// app/api/asignar-rol/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { usuarioId, rolId } = await request.json();

  const usuario = await prisma.usuario.update({
    where: { id: usuarioId },
    data: { rolSistemaId: rolId },
  });

  return NextResponse.json(usuario);
}
```

### 2. Crear un Rol Automáticamente para Nuevos Usuarios

Modifica `lib/auth.ts`:

```typescript
callbacks: {
  async session({ session, user }) {
    if (session.user) {
      const usuarioDB = await prisma.usuario.findUnique({
        where: { correo: user.email || "" },
        include: {
          rolSistema: true,
          empresa: true,
        },
      });

      // Si no tiene rol, asignar rol por defecto
      if (usuarioDB && !usuarioDB.rolSistemaId) {
        const rolPaciente = await prisma.rolSistema.findFirst({
          where: { nombre: "PACIENTE" },
        });

        if (rolPaciente) {
          await prisma.usuario.update({
            where: { id: usuarioDB.id },
            data: { rolSistemaId: rolPaciente.id },
          });
        }
      }

      if (usuarioDB) {
        (session.user as any).id = usuarioDB.id;
        (session.user as any).rolId = usuarioDB.rolSistemaId;
        (session.user as any).rol = usuarioDB.rolSistema?.nombre;
        (session.user as any).empresaId = usuarioDB.empresaId;
        (session.user as any).empresa = usuarioDB.empresa?.nombre;
      }
    }
    return session;
  },
},
```

---

## 📝 Ejercicios para Practicar

### Ejercicio 1: Mostrar Bienvenida Personalizada

En `app/panel/page.tsx`, muestra un mensaje de bienvenida con el nombre del usuario.

### Ejercicio 2: Página de Configuración

Crea `app/panel/configuracion/page.tsx` donde el usuario pueda ver y editar su información.

### Ejercicio 3: Verificar Roles

Usa el hook `useRol()` para mostrar contenido diferente según el rol del usuario.

```tsx
const { esAdmin, esDoctor, esPaciente } = useRol();

if (esAdmin) return <ComponenteAdmin />;
if (esDoctor) return <ComponenteDoctor />;
return <ComponentePaciente />;
```

---

## 🎓 Conceptos Clave para Entender

1. **PrismaAdapter**: Conecta NextAuth con tu base de datos. Guarda usuarios, cuentas y sesiones automáticamente.

2. **Sesión**: Es como un "ticket" que prueba que iniciaste sesión. Se guarda en una cookie y en la DB.

3. **OAuth**: Es cuando usas Google/Facebook para iniciar sesión. Ellos verifican tu identidad y te devuelven a tu app.

4. **Callbacks**: Son funciones que NextAuth llama en momentos específicos (ej: cuando creas la sesión) para personalizar el comportamiento.

---

## ✅ Checklist de Aprendizaje

- [ ] Abrir Prisma Studio y ver mis datos guardados
- [ ] Crear una página que muestre mi nombre y email
- [ ] Proteger una ruta con `ProtectorRuta`
- [ ] Usar el hook `useSesion()` en un componente
- [ ] Crear un botón de "Cerrar Sesión"
- [ ] Asignar un rol a mi usuario en Prisma Studio
- [ ] Verificar roles con `useRol()`

¿Quieres que creemos alguna de estas páginas juntos?

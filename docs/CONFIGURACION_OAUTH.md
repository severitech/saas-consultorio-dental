# Configuración de OAuth para Google y Facebook

## 🔐 Configuración de Google OAuth

### 1. Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. En el menú lateral, ve a **APIs y Servicios** > **Credenciales**

### 2. Configurar Pantalla de Consentimiento OAuth

1. Click en **Pantalla de consentimiento de OAuth**
2. Selecciona **Externo** y click en **Crear**
3. Completa la información:
   - **Nombre de la aplicación**: Consultorio Dental
   - **Correo de soporte**: tu-email@ejemplo.com
   - **Logotipo** (opcional)
   - **Dominios autorizados**: localhost (para desarrollo)
   - **Correo del desarrollador**: tu-email@ejemplo.com
4. Click en **Guardar y Continuar**
5. En **Permisos**, agrega los scopes:
   - `userinfo.email`
   - `userinfo.profile`
6. Click en **Guardar y Continuar**

### 3. Crear Credenciales OAuth 2.0

1. Ve a **Credenciales** > **Crear credenciales** > **ID de cliente OAuth 2.0**
2. Tipo de aplicación: **Aplicación web**
3. Nombre: **Consultorio Dental Web**
4. **URIs de redireccionamiento autorizados**:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
   Para producción:
   ```
   https://tu-dominio.com/api/auth/callback/google
   ```
5. Click en **Crear**
6. Copia el **ID de cliente** y **Secreto de cliente**
7. Pégalos en tu archivo `.env.local`:
   ```
   GOOGLE_CLIENT_ID=tu-id-de-cliente.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=tu-secreto-de-cliente
   ```

---

## 📘 Configuración de Facebook OAuth

### 1. Crear Aplicación en Facebook Developers

1. Ve a [Facebook Developers](https://developers.facebook.com/)
2. Click en **Mis Apps** > **Crear App**
3. Selecciona **Consumidor** como tipo de app
4. Completa la información:
   - **Nombre de la app**: Consultorio Dental
   - **Correo de contacto**: tu-email@ejemplo.com
5. Click en **Crear App**

### 2. Configurar Facebook Login

1. En el panel de tu app, busca **Facebook Login** y click en **Configurar**
2. Selecciona **Web** como plataforma
3. Ingresa la URL del sitio: `http://localhost:3000`
4. Click en **Guardar**

### 3. Configurar URIs de Redirección

1. En el menú lateral, ve a **Facebook Login** > **Configuración**
2. En **URIs de redireccionamiento de OAuth válidos**, agrega:
   ```
   http://localhost:3000/api/auth/callback/facebook
   ```
   Para producción:
   ```
   https://tu-dominio.com/api/auth/callback/facebook
   ```
3. Click en **Guardar cambios**

### 4. Obtener Credenciales

1. En el menú lateral, ve a **Configuración** > **Básica**
2. Copia el **ID de la App** y el **Secreto de la App**
3. Pégalos en tu archivo `.env.local`:
   ```
   FACEBOOK_CLIENT_ID=tu-app-id
   FACEBOOK_CLIENT_SECRET=tu-app-secret
   ```

### 5. Activar la App (Producción)

Para usar en producción:
1. Ve a **Configuración** > **Básica**
2. En la parte superior, cambia el estado de la app de **Desarrollo** a **En vivo**
3. Completa la **Revisión de la App** si es necesario

---

## ⚙️ Configuración Final

### Archivo `.env.local`

Tu archivo `.env.local` debe verse así:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=mi-secreto-super-seguro-para-desarrollo-cambiar-en-produccion
DATABASE_URL="file:./prisma/dev.db"

# Google OAuth
GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-AbC123DeF456GhI789JkL
  

# Facebook OAuth
FACEBOOK_CLIENT_ID=123456789012345
FACEBOOK_CLIENT_SECRET=abc123def456ghi789jkl012mno345pq
```

### Ejecutar Migraciones

Después de configurar, ejecuta:

```bash
npx prisma migrate dev --name agregar-oauth
npx prisma generate
npm run dev
```

### Verificar

1. Ve a `http://localhost:3000/auth/iniciar-sesion`
2. Deberías ver los botones de **Continuar con Google** y **Continuar con Facebook**
3. Click en cualquiera para probar el flujo de autenticación

---

## 🔒 Seguridad

- **NUNCA** compartas tus secretos de cliente
- **NUNCA** subas el archivo `.env.local` a Git (ya está en `.gitignore`)
- En producción, usa variables de entorno del servidor
- Cambia `NEXTAUTH_SECRET` en producción con un valor aleatorio seguro

## 📝 Notas

- Los usuarios se crearán automáticamente en la base de datos al iniciar sesión por primera vez
- El email del usuario se guardará en el campo `correo` del modelo `Usuario`
- Puedes asignar roles manualmente desde la base de datos después del primer login

# 🔧 Solución: Error 401 invalid_client

## ❌ El Problema

El error **"Error 401: invalid_client"** significa que Google no reconoce las credenciales OAuth que estás enviando.

## 🔍 Causas Comunes

1. **CLIENT_ID o CLIENT_SECRET incorrectos**
2. **URI de redirección no configurada correctamente en Google**
3. **Credenciales de un proyecto diferente o eliminado**
4. **Credenciales expuestas públicamente (Google las revoca automáticamente)**

## ✅ Solución Paso a Paso

### Paso 1: Eliminar Credenciales Hardcodeadas del Código

**IMPORTANTE**: NUNCA pongas credenciales directamente en el código fuente.

Las credenciales que tienes en `lib/auth.ts` pueden haber sido comprometidas. Necesitas crear nuevas.

### Paso 2: Crear NUEVAS Credenciales en Google

1. **Ve a Google Cloud Console**: https://console.cloud.google.com/

2. **Selecciona tu proyecto** (o crea uno nuevo)

3. **Ve a "APIs y Servicios" → "Credenciales"**

4. **ELIMINA las credenciales viejas** (si las tienes)
   - Click en el ícono de basura 🗑️ junto a las credenciales antiguas

5. **Crea NUEVAS credenciales OAuth 2.0**:
   - Click en **"+ Crear credenciales"** → **"ID de cliente de OAuth 2.0"**
   - Tipo: **Aplicación web**
   - Nombre: `Consultorio Dental - Local Dev`
   
6. **Configura las URIs de redirección**:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
   
   ⚠️ **IMPORTANTE**: 
   - Debe ser EXACTAMENTE `http://localhost:3000` (sin `https://`)
   - NO debe tener barra diagonal al final
   - Debe terminar en `/api/auth/callback/google`

7. **Copia las NUEVAS credenciales**:
   - Se mostrará un modal con el CLIENT_ID y CLIENT_SECRET
   - Cópialos inmediatamente

### Paso 3: Actualizar tu `.env.local`

Reemplaza las credenciales en tu archivo `.env.local`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=mi-secreto-super-seguro-para-desarrollo-cambiar-en-produccion
DATABASE_URL="file:./dev.db"

# Google OAuth - NUEVAS CREDENCIALES
GOOGLE_CLIENT_ID=TU_NUEVO_CLIENT_ID_AQUI.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-TU_NUEVO_SECRET_AQUI

# Facebook OAuth
FACEBOOK_CLIENT_ID=tu-facebook-app-id-aqui
FACEBOOK_CLIENT_SECRET=tu-facebook-app-secret-aqui
```

### Paso 4: Verificar Pantalla de Consentimiento

1. En Google Cloud Console, ve a **"Pantalla de consentimiento de OAuth"**

2. Verifica que esté configurado como **"Externo"**

3. Verifica que tenga estos permisos:
   - `userinfo.email`
   - `userinfo.profile`
   - `openid`

4. Si está en modo **"Prueba"**, agrega tu email en **"Usuarios de prueba"**

### Paso 5: Verificar que NextAuth use las Variables de Entorno

El archivo `lib/auth.ts` ya debería estar configurado correctamente para leer del `.env.local`.

### Paso 6: Reiniciar el Servidor

```bash
# Detener el servidor (Ctrl+C en la terminal)
# Luego reiniciar:
npm run dev
```

**⚠️ IMPORTANTE**: Los cambios en `.env.local` solo se cargan al INICIAR el servidor. Debes reiniciarlo.

### Paso 7: Probar de Nuevo

1. Ve a: http://localhost:3000/auth/iniciar-sesion
2. Click en **"Continuar con Google"**
3. Deberías ver la pantalla de autorización de Google
4. Selecciona tu cuenta
5. Deberías ser redirigido a `/panel`

## 🔒 Importante: Seguridad

### ⚠️ Credenciales Comprometidas

Si publicaste código con credenciales hardcodeadas (como en GitHub):

1. **Google las revoca automáticamente** cuando detecta que fueron expuestas
2. **DEBES crear nuevas credenciales** - las viejas ya no funcionarán
3. **NUNCA** vuelvas a poner credenciales en el código
4. Usa SIEMPRE variables de entorno

### ✅ Mejores Prácticas

1. **Siempre usa `.env.local`** para credenciales sensibles
2. **`.env.local` está en `.gitignore`** - nunca se sube a Git
3. **Usa valores por defecto vacíos** en el código: `process.env.VARIABLE || ""`
4. **En producción**, usa variables de entorno del servidor (Vercel, Railway, etc.)

## 📋 Checklist de Verificación

- [ ] Eliminé las credenciales viejas en Google Cloud Console
- [ ] Creé NUEVAS credenciales OAuth 2.0
- [ ] Configuré la URI de redirección: `http://localhost:3000/api/auth/callback/google`
- [ ] Copié las nuevas credenciales a `.env.local`
- [ ] Verifiqué que no hay espacios extras en las credenciales
- [ ] Reinicié el servidor con `npm run dev`
- [ ] Probé el login de nuevo

## 🆘 Si Sigue Sin Funcionar

### Error: "redirect_uri_mismatch"

La URI debe coincidir EXACTAMENTE:
```
✅ http://localhost:3000/api/auth/callback/google
❌ http://localhost:3000/api/auth/callback/google/
❌ https://localhost:3000/api/auth/callback/google
❌ http://127.0.0.1:3000/api/auth/callback/google
```

### Error: "Access blocked: This app's request is invalid"

1. Ve a "Pantalla de consentimiento de OAuth"
2. Agrega tu email en "Usuarios de prueba"
3. Guarda los cambios

### Ver Logs Detallados

En `lib/auth.ts` ya tienes `debug: true` en desarrollo. Mira la consola del servidor para más detalles del error.

## 📞 Necesitas Más Ayuda?

Si el error persiste después de seguir estos pasos:

1. Verifica la consola del navegador (F12)
2. Verifica la terminal donde corre `npm run dev`
3. Copia el error completo y compártelo

El error debería desaparecer con nuevas credenciales correctamente configuradas.

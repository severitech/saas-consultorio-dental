# Calendario de Citas - Documentación

## 📋 Descripción

Componente de calendario completamente funcional en español para gestionar citas médicas/dentales. Incluye funcionalidad de arrastrar y soltar, múltiples vistas y diseño responsive.

## 🚀 Características

- ✅ **Totalmente en español**: Todos los textos, mensajes y formatos de fecha
- 📱 **Responsive**: Adaptado para móvil y desktop
- 🎨 **Componentes de shadcn/ui**: Usa Dialog, Badge, Tooltip, etc.
- 🔄 **Arrastrar y soltar**: Reorganiza citas fácilmente
- 📅 **Múltiples vistas**: Mes, Semana, Día, Agenda
- 🎨 **Colores por estado**: Visual feedback del estado de cada cita
- ⚡ **Separación de responsabilidades**: Componentes modulares y reutilizables

## 📁 Estructura de Archivos

```
components/Panel/calendario/
├── Calendario.tsx              # Componente principal
├── tipos.ts                    # Definiciones de tipos TypeScript
├── configuracion.ts            # Configuración y constantes
├── EventoCita.tsx              # Componente para mostrar evento con tooltip
├── CeldaMes.tsx                # Celda personalizada para vista mensual
├── Celdas.tsx                  # Contador de citas por día
├── DialogoConfirmarCambio.tsx  # Diálogo de confirmación
├── calendario.css              # Estilos personalizados
├── datos-ejemplo.ts            # Datos de ejemplo
└── index.ts                    # Exportaciones
```

## 🛠️ Instalación

Las dependencias ya están instaladas:

```bash
npm i react-big-calendar date-fns dayjs moment
```

## 💻 Uso Básico

```tsx
import { CalendarioComponente } from '@/components/Panel/calendario';
import type { Cita } from '@/components/Panel/calendario';
import '@/components/Panel/calendario/calendario.css';

// En tu componente
const [citas, setCitas] = useState<Cita[]>([]);

// Función para actualizar cita
const actualizarCita = async (id: string, inicio: Date, fin: Date) => {
  await fetch(`/api/citas/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ fecha_inicio: inicio, fecha_fin: fin }),
  });
};

// Renderizar
<CalendarioComponente 
  citas={citas} 
  onActualizarCita={actualizarCita}
/>
```

## 📊 Formato de Datos

```typescript
interface Cita {
  id: string;
  title: string;
  motivo: string;
  start: Date;
  end: Date;
  estado: string; // 'pendiente' | 'confirmada' | 'cancelada' | 'completada'
  tipo: string;
  consultorio?: string;
  color?: string;
  idpaciente?: string;
  iddoctor?: string;
  doctor?: string;
  paciente: string;
}
```

## 🎨 Colores por Estado

Los colores se asignan automáticamente según el estado:

- 🟡 **Pendiente**: Amarillo (`#f59e0b`)
- 🟢 **Confirmada**: Verde (`#10b981`)
- 🔴 **Cancelada**: Rojo (`#ef4444`)
- 🔵 **Completada**: Azul (`#6366f1`)

## ⚙️ Configuración

Puedes personalizar el horario en `configuracion.ts`:

```typescript
export const configuracionHorario = {
  horaInicio: 7,    // 7:00 AM
  horaFin: 22,      // 10:00 PM
  intervalo: 30,    // minutos
};
```

## 📱 Vistas Disponibles

- **Mes**: Vista general del mes con contador de citas
- **Semana**: Vista semanal con horarios
- **Día**: Vista detallada de un día
- **Agenda**: Lista de citas próximas

En móviles solo muestra: Día y Agenda

## 🔧 Personalización

### Cambiar mensajes
Edita `configuracion.ts`:
```typescript
export const mensajesCalendario = {
  today: 'Hoy',
  previous: 'Anterior',
  next: 'Siguiente',
  // ...
};
```

### Estilos personalizados
Edita `calendario.css` para ajustar colores y diseño.

## 🎯 Próximas Mejoras

- [ ] Filtrar por doctor/consultorio
- [ ] Crear cita desde el calendario
- [ ] Ver detalles completos de la cita
- [ ] Imprimir agenda del día
- [ ] Exportar a PDF/Excel

## 📝 Notas

- El calendario usa `date-fns` para manejo de fechas
- Todos los textos están en español
- Compatible con temas claro/oscuro
- Optimizado para rendimiento

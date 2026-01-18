// Datos de ejemplo para probar el calendario
import type { Cita } from "@/components/Panel/calendario";

export const citasEjemplo: Cita[] = [
  {
    id: "1",
    title: "Limpieza Dental",
    motivo: "Limpieza y revisión general",
    start: new Date(2026, 0, 20, 9, 0), // 20 enero 2026, 9:00 AM
    end: new Date(2026, 0, 20, 10, 0),
    estado: "confirmada",
    tipo: "limpieza",
    paciente: "Juan Pérez",
    doctor: "Dr. García",
    consultorio: "Consultorio 1",
    color: "#10b981",
  },
  {
    id: "2",
    title: "Extracción",
    motivo: "Extracción de muela del juicio",
    start: new Date(2026, 0, 20, 11, 0),
    end: new Date(2026, 0, 20, 12, 30),
    estado: "pendiente",
    tipo: "cirugia",
    paciente: "María López",
    doctor: "Dr. Martínez",
    consultorio: "Consultorio 2",
    color: "#f59e0b",
  },
  {
    id: "3",
    title: "Ortodoncia",
    motivo: "Ajuste de brackets",
    start: new Date(2026, 0, 21, 14, 0), // 21 enero 2026, 2:00 PM
    end: new Date(2026, 0, 21, 15, 0),
    estado: "confirmada",
    tipo: "ortodoncia",
    paciente: "Carlos Ramírez",
    doctor: "Dra. Sánchez",
    consultorio: "Consultorio 1",
    color: "#10b981",
  },
  {
    id: "4",
    title: "Endodoncia",
    motivo: "Tratamiento de conducto",
    start: new Date(2026, 0, 22, 10, 0), // 22 enero 2026, 10:00 AM
    end: new Date(2026, 0, 22, 12, 0),
    estado: "completada",
    tipo: "endodoncia",
    paciente: "Ana Gómez",
    doctor: "Dr. García",
    consultorio: "Consultorio 3",
    color: "#6366f1",
  },
  {
    id: "5",
    title: "Blanqueamiento",
    motivo: "Blanqueamiento dental",
    start: new Date(2026, 0, 23, 9, 30), // 23 enero 2026, 9:30 AM
    end: new Date(2026, 0, 23, 10, 30),
    estado: "cancelada",
    tipo: "estetica",
    paciente: "Luis Torres",
    doctor: "Dra. Sánchez",
    consultorio: "Consultorio 2",
    color: "#ef4444",
  },
];

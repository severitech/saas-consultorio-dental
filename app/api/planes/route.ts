import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { opcionesAuth } from "@/lib/auth";

// GET - Obtener todos los planes
export async function GET() {
  try {
    const session = await getServerSession(opcionesAuth);
    
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const planes = await prisma.plan.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(planes);
  } catch (error) {
    console.error("Error al obtener planes:", error);
    return NextResponse.json(
      { error: "Error al obtener planes" },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo plan
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(opcionesAuth);
    
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { nombre, precioMensual, descripcion } = body;

    // Validación
    if (!nombre || !precioMensual) {
      return NextResponse.json(
        { error: "Nombre y precio son obligatorios" },
        { status: 400 }
      );
    }

    if (precioMensual < 0) {
      return NextResponse.json(
        { error: "El precio no puede ser negativo" },
        { status: 400 }
      );
    }

    const plan = await prisma.plan.create({
      data: {
        nombre,
        precioMensual: parseFloat(precioMensual),
        descripcion: descripcion || null,
      },
    });

    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    console.error("Error al crear plan:", error);
    return NextResponse.json(
      { error: "Error al crear plan" },
      { status: 500 }
    );
  }
}

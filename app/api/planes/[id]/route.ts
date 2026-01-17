import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

// GET - Obtener un plan por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(opcionesAuth);
    
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const plan = await prisma.plan.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { suscripciones: true },
        },
      },
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan no encontrado" }, { status: 404 });
    }

    return NextResponse.json(plan);
  } catch (error) {
    console.error("Error al obtener plan:", error);
    return NextResponse.json(
      { error: "Error al obtener plan" },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un plan
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const plan = await prisma.plan.update({
      where: { id: params.id },
      data: {
        nombre,
        precioMensual: parseFloat(precioMensual),
        descripcion: descripcion || null,
      },
    });

    return NextResponse.json(plan);
  } catch (error) {
    console.error("Error al actualizar plan:", error);
    return NextResponse.json(
      { error: "Error al actualizar plan" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un plan
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(opcionesAuth);
    
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Verificar si tiene suscripciones activas
    const suscripcionesActivas = await prisma.suscripcion.count({
      where: {
        planId: params.id,
        estado: "ACTIVA",
      },
    });

    if (suscripcionesActivas > 0) {
      return NextResponse.json(
        { error: "No se puede eliminar un plan con suscripciones activas" },
        { status: 400 }
      );
    }

    await prisma.plan.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Plan eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar plan:", error);
    return NextResponse.json(
      { error: "Error al eliminar plan" },
      { status: 500 }
    );
  }
}

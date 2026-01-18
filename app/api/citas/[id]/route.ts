import { opcionesAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(opcionesAuth);

        if (!session) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const { id } = await params;

        const cita = await prisma.cita.findUnique({
            where: { id },
            include: {
                paciente: true,
                sucursal: true,
                consulta: true,
            },
        });

        if (!cita) {
            return NextResponse.json(
                { error: "Cita no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json(cita);
    } catch (error) {
        console.error("Error al obtener cita:", error);
        return NextResponse.json(
            { error: "Error al obtener cita" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(opcionesAuth);
        if (!session) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const { id } = await params;
        const data = await request.json();

        const citaActualizada = await prisma.cita.update({
            where: { id },
            data,
            include: {
                paciente: true,
                sucursal: true,
                consulta: true,
            },
        });

        return NextResponse.json(citaActualizada);
    } catch (error) {
        console.error("Error al actualizar cita:", error);
        return NextResponse.json(
            { error: "Error al actualizar cita" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(opcionesAuth);
        if (!session) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const { id } = await params;

        await prisma.cita.delete({
            where: { id },
        });

        return NextResponse.json({ mensaje: "Cita eliminada exitosamente" });
    } catch (error) {
        console.error("Error al eliminar cita:", error);
        return NextResponse.json(
            { error: "Error al eliminar cita" },
            { status: 500 }
        );
    }
}

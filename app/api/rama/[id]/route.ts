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

        const rama = await prisma.rama.findUnique({
            where: { id },
            include: {
                categorias: true,
            },
        });

        if (!rama) {
            return NextResponse.json(
                { error: "Rama no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json(rama);
    } catch (error) {
        console.error("Error al obtener rama:", error);
        return NextResponse.json(
            { error: "Error al obtener rama" },
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
        const { descripcion } = data;

        if (!descripcion) {
            return NextResponse.json(
                { error: "Descripción es requerida" },
                { status: 400 }
            );
        }

        const ramaActualizada = await prisma.rama.update({
            where: { id },
            data: {
                descripcion,
            },
            include: {
                categorias: true,
            },
        });

        return NextResponse.json(ramaActualizada);
    } catch (error) {
        console.error("Error al actualizar rama:", error);
        return NextResponse.json(
            { error: "Error al actualizar rama" },
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

        // Verificar si la rama tiene categorías asociadas
        const rama = await prisma.rama.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { categorias: true },
                },
            },
        });

        if (!rama) {
            return NextResponse.json(
                { error: "Rama no encontrada" },
                { status: 404 }
            );
        }

        if (rama._count.categorias > 0) {
            return NextResponse.json(
                { error: "No se puede eliminar una rama con categorías asociadas" },
                { status: 400 }
            );
        }

        await prisma.rama.update({
            where: { id },
            data: { estado: !rama.estado },
        });

        return NextResponse.json({ mensaje: "Rama eliminada exitosamente" });
    } catch (error) {
        console.error("Error al eliminar rama:", error);
        return NextResponse.json(
            { error: "Error al eliminar rama" },
            { status: 500 }
        );
    }
}
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

        const categoria = await prisma.categoria.findUnique({
            where: { id },
            include: {
                rama: true,
            },
        });

        if (!categoria) {
            return NextResponse.json(
                { error: "Categoría no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json(categoria);
    } catch (error) {
        console.error("Error al obtener categoría:", error);
        return NextResponse.json(
            { error: "Error al obtener categoría" },
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
        const { nombre, ramaId } = data;

        const categoriaActualizada = await prisma.categoria.update({
            where: { id },
            data: {
                ...(nombre && { nombre }),
                ...(ramaId && { ramaId }),
            },
            include: {
                rama: true,
            },
        });

        return NextResponse.json(categoriaActualizada);
    } catch (error) {
        console.error("Error al actualizar categoría:", error);
        return NextResponse.json(
            { error: "Error al actualizar categoría" },
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

        // Verificar si la categoría tiene tratamientos asociados
        const categoria = await prisma.categoria.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { tratamientos: true },
                },
            },
        });

        if (!categoria) {
            return NextResponse.json(
                { error: "Categoría no encontrada" },
                { status: 404 }
            );
        }

        if (categoria._count.tratamientos > 0) {
            return NextResponse.json(
                { error: "No se puede eliminar una categoría con tratamientos asociados" },
                { status: 400 }
            );
        }

        await prisma.categoria.update({
            where: { id },
            data: { estado: !categoria.estado },
        });

        return NextResponse.json({ mensaje: "Categoría eliminada exitosamente" });
    } catch (error) {
        console.error("Error al eliminar categoría:", error);
        return NextResponse.json(
            { error: "Error al eliminar categoría" },
            { status: 500 }
        );
    }
}

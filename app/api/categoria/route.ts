import { opcionesAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(opcionesAuth);

        if (!session) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const categorias = await prisma.categoria.findMany({
            include: {
                rama: true,
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(categorias);
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        return NextResponse.json(
            { error: "Error al obtener categorías" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(opcionesAuth);
        if (!session) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const data = await request.json();
        const { nombre, ramaId } = data;

        if (!nombre || !ramaId) {
            return NextResponse.json(
                { error: "Nombre y ramaId son requeridos" },
                { status: 400 }
            );
        }

        const nuevaCategoria = await prisma.categoria.create({
            data: {
                nombre,
                ramaId,
            },
            include: {
                rama: true,
            },
        });

        return NextResponse.json(nuevaCategoria);
    } catch (error) {
        console.error("Error al crear categoría:", error);
        return NextResponse.json(
            { error: "Error al crear categoría" },
            { status: 500 }
        );
    }
}

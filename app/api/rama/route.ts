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

        const ramas = await prisma.rama.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(ramas);
    } catch (error) {
        console.error("Error al obtener ramas:", error);
        return NextResponse.json(
            { error: "Error al obtener ramas" },
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
        // Lógica para crear una nueva rama
        const data = await request.json();
        const nuevaRama = await prisma.rama.create({
            data,
        });
        return NextResponse.json(nuevaRama);
    } catch (error) {
        console.error("Error al crear rama:", error);
        return NextResponse.json(
            { error: "Error al crear rama" },
            { status: 500 }
        );
    }
}


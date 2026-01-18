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

        const citas = await prisma.cita.findMany({
            include: {
                paciente: {
                    include: {
                        usuario: true,
                    },
                },
                sucursal: true,
                consulta: true,
            },
            orderBy: { fecha: "desc" },
        });

        return NextResponse.json(citas);
    } catch (error) {
        console.error("Error al obtener citas:", error);
        return NextResponse.json(
            { error: "Error al obtener citas" },
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

        const nuevaCita = await prisma.cita.create({
            data,
            include: {
                paciente: {
                    include: {
                        usuario: true,
                    },
                },
                sucursal: true,
                consulta: true,
            },
        });

        return NextResponse.json(nuevaCita);
    } catch (error) {
        console.error("Error al crear cita:", error);
        return NextResponse.json(
            { error: "Error al crear cita" },
            { status: 500 }
        );
    }
}


"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface FormularioRamaProps {
    abierto: boolean;
    alCerrar: () => void;
    rama?: {
        id: string;
        descripcion: string;
    } | null;
    alGuardar: () => void;
}

export function FormularioRama({
    abierto,
    alCerrar,
    rama,
    alGuardar,
}: FormularioRamaProps) {
    const [descripcion, setDescripcion] = useState(rama?.descripcion || "");
    const [guardando, setGuardando] = useState(false);

    const esEdicion = !!rama;

    useEffect(() => {
        if (rama) {
            setDescripcion(rama.descripcion);
        } else {
            setDescripcion("");
        }
    }, [rama, abierto]);

    const manejarEnvio = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!descripcion.trim()) {
            toast.error("La descripción es requerida");
            return;
        }

        setGuardando(true);

        try {
            const url = esEdicion ? `/api/rama/${rama.id}` : "/api/rama";
            const metodo = esEdicion ? "PUT" : "POST";

            const respuesta = await fetch(url, {
                method: metodo,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ descripcion }),
            });

            if (!respuesta.ok) {
                const error = await respuesta.json();
                throw new Error(error.error || "Error al guardar rama");
            }

            toast.success(
                esEdicion ? "Rama actualizada exitosamente" : "Rama creada exitosamente"
            );
            alGuardar();
            alCerrar();
            setDescripcion("");
        } catch (error) {
            console.error("Error:", error);
            toast.error(
                error instanceof Error ? error.message : "Error al guardar rama"
            );
        } finally {
            setGuardando(false);
        }
    };

    const manejarCerrar = () => {
        setDescripcion(rama?.descripcion || "");
        alCerrar();
    };

    return (
        <Dialog open={abierto} onOpenChange={manejarCerrar}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={manejarEnvio}>
                    <DialogHeader>
                        <DialogTitle>
                            {esEdicion ? "Editar Rama" : "Nueva Rama"}
                        </DialogTitle>
                        <DialogDescription>
                            {esEdicion
                                ? "Actualiza la información de la rama"
                                : "Crea una nueva rama odontológica"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="descripcion">Descripción</Label>
                            <Input
                                id="descripcion"
                                placeholder="Ej: Ortodoncia, Endodoncia..."
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                disabled={guardando}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={manejarCerrar}
                            disabled={guardando}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={guardando}>
                            {guardando ? "Guardando..." : "Guardar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

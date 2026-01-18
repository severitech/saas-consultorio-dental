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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Rama {
    id: string;
    descripcion: string;
}

interface FormularioCategoriaProps {
    abierto: boolean;
    alCerrar: () => void;
    categoria?: {
        id: string;
        nombre: string;
        ramaId: string;
    } | null;
    ramas: Rama[];
    alGuardar: () => void;
}

export function FormularioCategoria({
    abierto,
    alCerrar,
    categoria,
    ramas,
    alGuardar,
}: FormularioCategoriaProps) {
    const [nombre, setNombre] = useState(categoria?.nombre || "");
    const [ramaId, setRamaId] = useState(categoria?.ramaId || "");
    const [guardando, setGuardando] = useState(false);

    const esEdicion = !!categoria;

    useEffect(() => {
        if (categoria) {
            setNombre(categoria.nombre);
            setRamaId(categoria.ramaId);
        } else {
            setNombre("");
            setRamaId("");
        }
    }, [categoria, abierto]);

    const manejarEnvio = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nombre.trim()) {
            toast.error("El nombre es requerido");
            return;
        }

        if (!ramaId) {
            toast.error("Debes seleccionar una rama");
            return;
        }

        setGuardando(true);

        try {
            const url = esEdicion
                ? `/api/categoria/${categoria.id}`
                : "/api/categoria";
            const metodo = esEdicion ? "PUT" : "POST";

            const respuesta = await fetch(url, {
                method: metodo,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombre, ramaId }),
            });

            if (!respuesta.ok) {
                const error = await respuesta.json();
                throw new Error(error.error || "Error al guardar categoría");
            }

            toast.success(
                esEdicion
                    ? "Categoría actualizada exitosamente"
                    : "Categoría creada exitosamente"
            );
            alGuardar();
            alCerrar();
            setNombre("");
            setRamaId("");
        } catch (error) {
            console.error("Error:", error);
            toast.error(
                error instanceof Error ? error.message : "Error al guardar categoría"
            );
        } finally {
            setGuardando(false);
        }
    };

    const manejarCerrar = () => {
        setNombre(categoria?.nombre || "");
        setRamaId(categoria?.ramaId || "");
        alCerrar();
    };

    return (
        <Dialog open={abierto} onOpenChange={manejarCerrar}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={manejarEnvio}>
                    <DialogHeader>
                        <DialogTitle>
                            {esEdicion ? "Editar Categoría" : "Nueva Categoría"}
                        </DialogTitle>
                        <DialogDescription>
                            {esEdicion
                                ? "Actualiza la información de la categoría"
                                : "Crea una nueva categoría y asígnala a una rama"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input
                                id="nombre"
                                placeholder="Ej: Brackets metálicos, Tratamiento de conducto..."
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                disabled={guardando}
                                autoComplete="off"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="rama">Rama</Label>
                            <Select
                                value={ramaId}
                                onValueChange={setRamaId}
                                disabled={guardando}
                            >
                                <SelectTrigger id="rama">
                                    <SelectValue placeholder="Selecciona una rama" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ramas.map((rama) => (
                                        <SelectItem key={rama.id} value={rama.id}>
                                            {rama.descripcion}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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

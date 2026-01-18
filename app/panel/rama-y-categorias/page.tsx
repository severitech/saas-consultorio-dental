"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormularioRama } from "@/components/Panel/rama/FormularioRama";
import { FormularioCategoria } from "@/components/Panel/rama/FormularioCategoria";
import { Plus, Pencil, Trash2, FolderTree, Tag } from "lucide-react";
import { toast } from "sonner";

interface Rama {
    id: string;
    descripcion: string;
    estado: boolean;
    createdAt: string;
}

interface Categoria {
    id: string;
    nombre: string;
    ramaId: string;
    estado: boolean;
    createdAt: string;
    rama: {
        id: string;
        descripcion: string;
    };
}

export default function RamaYCategoriasPage() {
    const [ramas, setRamas] = useState<Rama[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [cargando, setCargando] = useState(true);
    const [dialogoRamaAbierto, setDialogoRamaAbierto] = useState(false);
    const [dialogoCategoriaAbierto, setDialogoCategoriaAbierto] = useState(false);
    const [ramaSeleccionada, setRamaSeleccionada] = useState<Rama | null>(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] =
        useState<Categoria | null>(null);
    const [dialogoEliminar, setDialogoEliminar] = useState<{
        abierto: boolean;
        tipo: "rama" | "categoria";
        id: string;
        nombre: string;
    }>({
        abierto: false,
        tipo: "rama",
        id: "",
        nombre: "",
    });

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        setCargando(true);
        try {
            const [respuestaRamas, respuestaCategorias] = await Promise.all([
                fetch("/api/rama"),
                fetch("/api/categoria"),
            ]);

            if (respuestaRamas.ok) {
                const dataRamas = await respuestaRamas.json();
                setRamas(dataRamas);
            }

            if (respuestaCategorias.ok) {
                const dataCategorias = await respuestaCategorias.json();
                setCategorias(dataCategorias);
            }
        } catch (error) {
            console.error("Error al cargar datos:", error);
            toast.error("Error al cargar los datos");
        } finally {
            setCargando(false);
        }
    };

    const abrirFormularioRama = (rama?: Rama) => {
        setRamaSeleccionada(rama || null);
        setDialogoRamaAbierto(true);
    };

    const abrirFormularioCategoria = (categoria?: Categoria) => {
        setCategoriaSeleccionada(categoria || null);
        setDialogoCategoriaAbierto(true);
    };

    const confirmarEliminacion = (
        tipo: "rama" | "categoria",
        id: string,
        nombre: string
    ) => {
        setDialogoEliminar({
            abierto: true,
            tipo,
            id,
            nombre,
        });
    };

    const eliminarItem = async () => {
        const { tipo, id } = dialogoEliminar;
        try {
            const url = tipo === "rama" ? `/api/rama/${id}` : `/api/categoria/${id}`;
            const respuesta = await fetch(url, {
                method: "DELETE",
            });

            if (!respuesta.ok) {
                const error = await respuesta.json();
                throw new Error(error.error || `Error al eliminar ${tipo}`);
            }

            toast.success(
                `${tipo === "rama" ? "Rama" : "Categoría"} eliminada exitosamente`
            );
            await cargarDatos();
        } catch (error) {
            console.error("Error:", error);
            toast.error(
                error instanceof Error ? error.message : `Error al eliminar ${tipo}`
            );
        } finally {
            setDialogoEliminar({ abierto: false, tipo: "rama", id: "", nombre: "" });
        }
    };

    const obtenerCategoriasPorRama = (ramaId: string) => {
        return categorias.filter((cat) => cat.ramaId === ramaId);
    };

    if (cargando) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Ramas y Categorías</h1>
                    <p className="text-muted-foreground">
                        Gestiona las ramas odontológicas y sus categorías
                    </p>
                </div>
            </div>

            <Tabs defaultValue="ramas" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="ramas" className="flex items-center gap-2">
                        <FolderTree className="h-4 w-4" />
                        Ramas
                    </TabsTrigger>
                    <TabsTrigger value="categorias" className="flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        Categorías
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="ramas" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Ramas Odontológicas</CardTitle>
                                    <CardDescription>
                                        Lista de todas las ramas registradas
                                    </CardDescription>
                                </div>
                                <Button
                                    onClick={() => abrirFormularioRama()}
                                    className="flex items-center gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    Nueva Rama
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Descripción</TableHead>
                                        <TableHead>Categorías</TableHead>
                                        <TableHead>Fecha de Creación</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {ramas.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="text-center text-muted-foreground"
                                            >
                                                No hay ramas registradas
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        ramas.map((rama) => (
                                            <TableRow key={rama.id}>
                                                <TableCell className="font-medium">
                                                    {rama.descripcion}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary">
                                                        {obtenerCategoriasPorRama(rama.id).length}{" "}
                                                        categorías
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(rama.createdAt).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => abrirFormularioRama(rama)}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                confirmarEliminacion(
                                                                    "rama",
                                                                    rama.id,
                                                                    rama.descripcion
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="categorias" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Categorías</CardTitle>
                                    <CardDescription>
                                        Lista de todas las categorías y sus ramas asociadas
                                    </CardDescription>
                                </div>
                                <Button
                                    onClick={() => abrirFormularioCategoria()}
                                    className="flex items-center gap-2"
                                    disabled={ramas.length === 0}
                                >
                                    <Plus className="h-4 w-4" />
                                    Nueva Categoría
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {ramas.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    Primero debes crear al menos una rama para poder agregar
                                    categorías
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nombre</TableHead>
                                            <TableHead>Rama</TableHead>
                                            <TableHead>Fecha de Creación</TableHead>
                                            <TableHead className="text-right">
                                                Acciones
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {categorias.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={4}
                                                    className="text-center text-muted-foreground"
                                                >
                                                    No hay categorías registradas
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            categorias.map((categoria) => (
                                                <TableRow key={categoria.id}>
                                                    <TableCell className="font-medium">
                                                        {categoria.nombre}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge>
                                                            {categoria.rama.descripcion}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(
                                                            categoria.createdAt
                                                        ).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() =>
                                                                    abrirFormularioCategoria(
                                                                        categoria
                                                                    )
                                                                }
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() =>
                                                                    confirmarEliminacion(
                                                                        "categoria",
                                                                        categoria.id,
                                                                        categoria.nombre
                                                                    )
                                                                }
                                                            >
                                                                <Trash2 className="h-4 w-4 text-destructive" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <FormularioRama
                abierto={dialogoRamaAbierto}
                alCerrar={() => setDialogoRamaAbierto(false)}
                rama={ramaSeleccionada}
                alGuardar={cargarDatos}
            />

            <FormularioCategoria
                abierto={dialogoCategoriaAbierto}
                alCerrar={() => setDialogoCategoriaAbierto(false)}
                categoria={categoriaSeleccionada}
                ramas={ramas}
                alGuardar={cargarDatos}
            />

            <AlertDialog
                open={dialogoEliminar.abierto}
                onOpenChange={(abierto) =>
                    setDialogoEliminar({ ...dialogoEliminar, abierto })
                }
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará
                            permanentemente {dialogoEliminar.tipo === "rama" ? "la rama" : "la categoría"}{" "}
                            <strong>{dialogoEliminar.nombre}</strong>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={eliminarItem}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

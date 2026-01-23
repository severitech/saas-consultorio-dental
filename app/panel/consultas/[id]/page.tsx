'use client';

import { useParams, useRouter } from 'next/navigation';
import { PACIENTES_MOCK } from '../constas';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { StepsConsulta } from '../components/StepsConsulta';
import { ArrowLeft, AlertCircle, User, Phone, Mail, DollarSign, CreditCard, Wallet } from 'lucide-react';

export default function ConsultaDetallePage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const paciente = PACIENTES_MOCK.find(p => p.id.toString() === id);

    if (!paciente) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Card className="p-8 max-w-md w-full">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Paciente no encontrado</h2>
                    <p className="text-gray-600 mb-4">No se encontró información para este paciente.</p>
                    <Button onClick={() => router.push('/panel/consultas')}>
                        Volver a Consultas
                    </Button>
                </Card>
            </div>
        );
    }

    const ultimoPlan = paciente.planesTratamiento[0];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {/* Header con botón de regresar */}
                <div className="mb-4">
                    <Button
                        variant="ghost"
                        onClick={() => router.push('/panel/consultas')}
                        className="mb-3 -ml-2"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver a Consultas
                    </Button>

                    <Card className="bg-white shadow-sm border-gray-200/50">
                        <div className="px-5 py-3">
                            <div className="flex items-center justify-between gap-8">
                                {/* Paciente */}
                                <div className="flex items-center gap-3 flex-1">
                                    <Avatar className="h-11 w-11 border-2 border-primary/10">
                                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold text-base">
                                            {paciente.nombre.charAt(0)}{paciente.apellido?.charAt(0) || ''}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2.5">
                                            <h1 className="text-lg font-semibold text-gray-900">
                                                {paciente.nombre} {paciente.apellido}
                                            </h1>
                                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs px-2.5 py-0.5 font-medium">
                                                Activo
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-0.5">
                                            <span className="font-medium">ID: {paciente.id}</span>
                                            <span className="text-gray-300">•</span>
                                            <span>{paciente.edad} años</span>
                                            <span className="text-gray-300 hidden md:inline">•</span>
                                            <span className="hidden md:inline">{paciente.telefono}</span>
                                            <span className="text-gray-300 hidden lg:inline">•</span>
                                            <span className="hidden lg:inline truncate">{paciente.email}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Información Financiera */}
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-xs font-medium text-gray-500 mb-0.5">Total</p>
                                        <p className="text-base font-bold text-blue-600">
                                            ${paciente.montoTotal?.toLocaleString('es-MX', { minimumFractionDigits: 2 }) || '0.00'}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-medium text-gray-500 mb-0.5">Pagado</p>
                                        <p className="text-base font-bold text-emerald-600">
                                            ${paciente.montoPagado?.toLocaleString('es-MX', { minimumFractionDigits: 2 }) || '0.00'}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-medium text-gray-500 mb-0.5">Saldo</p>
                                        <p className="text-base font-bold text-amber-600">
                                            ${paciente.saldoPendiente?.toLocaleString('es-MX', { minimumFractionDigits: 2 }) || '0.00'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Alertas */}
                            {((paciente.alergias && paciente.alergias.length > 0) || (paciente.condicionesMedicas && paciente.condicionesMedicas.length > 0)) && (
                                <div className="flex items-center gap-6 mt-2.5 pt-2.5 border-t border-gray-100 text-sm">
                                    {paciente.alergias && paciente.alergias.length > 0 && (
                                        <div className="flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                                            <span className="font-semibold text-red-900">Alergias:</span>
                                            <span className="text-red-700">{paciente.alergias.join(', ')}</span>
                                        </div>
                                    )}
                                    {paciente.condicionesMedicas && paciente.condicionesMedicas.length > 0 && (
                                        <div className="flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                                            <span className="font-semibold text-amber-900">Condiciones:</span>
                                            <span className="text-amber-700">{paciente.condicionesMedicas.join(', ')}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Steps de Consulta */}
                {ultimoPlan && (
                    <div>
                        <h2 className="text-base font-semibold text-gray-900 mb-3">Flujo de Consulta</h2>
                        <StepsConsulta
                            planTratamiento={ultimoPlan}
                            odontograma={paciente.odontograma}
                            consultaId={ultimoPlan.id}
                            pacienteId={paciente.id}
                            nombrePaciente={`${paciente.nombre} ${paciente.apellido || ''}`}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

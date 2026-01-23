'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Pill, AlertCircle } from 'lucide-react';

interface Medicamento {
  nombre: string;
  dosis: string;
  frecuencia: string;
  duracion: string;
}

interface AgregarRecetaProps {
  medicamentos: Medicamento[];
  onMedicamentosChange: (medicamentos: Medicamento[]) => void;
  indicaciones: string;
  onIndicacionesChange: (indicaciones: string) => void;
}

export function AgregarReceta({
  medicamentos,
  onMedicamentosChange,
  indicaciones,
  onIndicacionesChange
}: AgregarRecetaProps) {
  const [nuevoMedicamento, setNuevoMedicamento] = useState<Medicamento>({
    nombre: '',
    dosis: '',
    frecuencia: '',
    duracion: ''
  });

  const handleAgregarMedicamento = () => {
    if (nuevoMedicamento.nombre.trim() && nuevoMedicamento.dosis.trim()) {
      onMedicamentosChange([...medicamentos, nuevoMedicamento]);
      setNuevoMedicamento({
        nombre: '',
        dosis: '',
        frecuencia: '',
        duracion: ''
      });
    }
  };

  const handleEliminarMedicamento = (index: number) => {
    onMedicamentosChange(medicamentos.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <Card className="p-2 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center gap-1.5">
          <Pill className="w-4 h-4 text-purple-600" />
          <h3 className="font-bold text-sm text-purple-900">Receta Médica</h3>
          <Badge variant="secondary" className="text-[9px] px-1.5 py-0.5 ml-auto">
            Opcional
          </Badge>
        </div>
        <p className="text-[10px] text-purple-700 mt-1">
          Agrega medicamentos e indicaciones para el paciente
        </p>
      </Card>

      <div className="grid lg:grid-cols-2 gap-2">
        {/* Columna 1: Agregar medicamentos */}
        <Card className="p-2">
          <Label className="text-xs font-semibold mb-2 block">Agregar Medicamento</Label>
          
          <div className="space-y-1.5">
            <div>
              <Label className="text-[10px] text-gray-600">Nombre del medicamento</Label>
              <Input
                placeholder="Ej: Ibuprofeno 400mg"
                value={nuevoMedicamento.nombre}
                onChange={(e) => setNuevoMedicamento({ ...nuevoMedicamento, nombre: e.target.value })}
                className="text-xs h-7"
              />
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <Label className="text-[10px] text-gray-600">Dosis</Label>
                <Input
                  placeholder="1 tableta"
                  value={nuevoMedicamento.dosis}
                  onChange={(e) => setNuevoMedicamento({ ...nuevoMedicamento, dosis: e.target.value })}
                  className="text-xs h-7"
                />
              </div>
              <div>
                <Label className="text-[10px] text-gray-600">Frecuencia</Label>
                <Input
                  placeholder="Cada 8 hrs"
                  value={nuevoMedicamento.frecuencia}
                  onChange={(e) => setNuevoMedicamento({ ...nuevoMedicamento, frecuencia: e.target.value })}
                  className="text-xs h-7"
                />
              </div>
            </div>

            <div>
              <Label className="text-[10px] text-gray-600">Duración</Label>
              <Input
                placeholder="5 días"
                value={nuevoMedicamento.duracion}
                onChange={(e) => setNuevoMedicamento({ ...nuevoMedicamento, duracion: e.target.value })}
                className="text-xs h-7"
              />
            </div>

            <Button
              type="button"
              size="sm"
              onClick={handleAgregarMedicamento}
              disabled={!nuevoMedicamento.nombre.trim() || !nuevoMedicamento.dosis.trim()}
              className="w-full h-7 text-xs"
            >
              <Plus className="w-3 h-3 mr-1" />
              Agregar a la Receta
            </Button>
          </div>
        </Card>

        {/* Columna 2: Lista de medicamentos */}
        <div className="space-y-2">
          <Card className="p-2">
            <div className="flex items-center justify-between mb-1.5">
              <Label className="text-xs font-semibold">Medicamentos Recetados</Label>
              <Badge variant="secondary" className="text-[8px] px-1 py-0">
                {medicamentos.length}
              </Badge>
            </div>

            <div className="space-y-1 max-h-[180px] overflow-y-auto">
              {medicamentos.length > 0 ? (
                medicamentos.map((med, idx) => (
                  <div key={idx} className="p-1.5 bg-purple-50 rounded border border-purple-200 relative">
                    <button
                      onClick={() => handleEliminarMedicamento(idx)}
                      className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center"
                    >
                      <X className="w-2.5 h-2.5 text-red-600" />
                    </button>
                    <p className="text-xs font-semibold text-purple-900 pr-5">{med.nombre}</p>
                    <div className="grid grid-cols-3 gap-1 mt-1">
                      <div>
                        <p className="text-[8px] text-gray-600">Dosis</p>
                        <p className="text-[9px] text-gray-900">{med.dosis}</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-gray-600">Frecuencia</p>
                        <p className="text-[9px] text-gray-900">{med.frecuencia || '—'}</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-gray-600">Duración</p>
                        <p className="text-[9px] text-gray-900">{med.duracion || '—'}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <Pill className="w-8 h-8 text-gray-300 mx-auto mb-1" />
                  <p className="text-[10px] text-gray-500">No hay medicamentos agregados</p>
                </div>
              )}
            </div>
          </Card>

          {/* Indicaciones adicionales */}
          <Card className="p-2">
            <Label className="text-xs font-semibold mb-1.5 block">Indicaciones Adicionales</Label>
            <Textarea
              placeholder="Instrucciones especiales, precauciones, recomendaciones..."
              value={indicaciones}
              onChange={(e) => onIndicacionesChange(e.target.value)}
              rows={4}
              className="text-[11px] resize-none"
            />
          </Card>
        </div>
      </div>

      {/* Advertencia */}
      {medicamentos.length === 0 && (
        <Card className="p-2 bg-amber-50 border-amber-200">
          <div className="flex items-start gap-1.5">
            <AlertCircle className="w-3 h-3 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-700">
              Este paso es opcional. Si no necesitas recetar medicamentos, puedes continuar al siguiente paso.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}

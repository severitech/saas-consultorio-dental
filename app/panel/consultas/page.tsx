
"use client"

import React, { useState } from 'react';
import { HISTORIAL_MOCK, EventoLineaTiempo } from './constas';
import PatientHeader from './Pacientes';
import TimelineCard from './LineaDeTiempo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Calendar, 
  User, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  X
} from 'lucide-react';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dentistFilter, setDentistFilter] = useState('any');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    // Simulación de AI summary
    setTimeout(() => {
      setAiSummary("El paciente muestra un historial dental saludable con tratamientos preventivos regulares. Se recomienda continuar con las limpiezas semestrales y seguimiento de ortodoncia.");
      setIsSummarizing(false);
    }, 1500);
  };

  const filteredHistory = HISTORIAL_MOCK.filter((event: EventoLineaTiempo) => {
    const matchesSearch = event.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.personal.nombre.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || event.estado.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <main className=" mx-auto px-4  md:px-8 py-10">
        <PatientHeader onSummarize={handleSummarize} isSummarizing={isSummarizing} />

        {/* AI Summary Banner */}
        {aiSummary && (
          <div className="mb-10 p-6 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="p-2 rounded-lg bg-blue-100">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-blue-700 font-bold text-xs uppercase tracking-wide mb-1">
                AI Health Insights
              </p>
              <p className="text-gray-700 italic text-sm md:text-base leading-relaxed">
                {aiSummary}
              </p>
            </div>
            <button 
              onClick={() => setAiSummary(null)} 
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Filters & Search */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-10 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                placeholder="Search procedures, dentists, or notes..." 
                type="text"
              />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[180px] bg-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-white">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dentistFilter} onValueChange={setDentistFilter}>
                <SelectTrigger className="w-[140px] bg-white">
                  <User className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Dentist" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="sarah">Dr. Sarah Smith</SelectItem>
                  <SelectItem value="james">Dr. James Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-300 via-gray-300 to-transparent -translate-x-1/2"></div>
          
          <div className="space-y-16">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((event: EventoLineaTiempo, index: number) => (
                <TimelineCard key={event.id} event={event} isLeft={index % 2 === 0} />
              ))
            ) : (
              <div className="py-20 text-center">
                <p className="text-gray-500 italic">No se encontraron registros que coincidan con tu búsqueda.</p>
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center gap-1">
              {[1, 2, 3].map(p => (
                <Button 
                  key={p}
                  variant={currentPage === p ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setCurrentPage(p)}
                  className={`rounded-full ${currentPage === p ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}
                >
                  {p}
                </Button>
              ))}
              <span className="px-2 text-gray-400">...</span>
              <Button 
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                12
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setCurrentPage(currentPage + 1)}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-gray-500 text-sm font-medium">
            Mostrando 1-{filteredHistory.length} de 118 consultas
          </p>
        </div>
      </main>

      {/* Floating Chat Button */}
      <button className="fixed bottom-8 right-8 size-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:bg-blue-700 active:scale-95 transition-all z-50 group">
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-4 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap shadow-xl">
          Asistente de Soporte
        </span>
      </button>
    </div>
  );
};

export default App;

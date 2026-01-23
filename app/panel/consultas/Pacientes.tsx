
import React from 'react';
import { Sparkles, RefreshCw, FileDown, CalendarPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PatientHeaderProps {
  onSummarize: () => void;
  isSummarizing: boolean;
}

const PatientHeader: React.FC<PatientHeaderProps> = ({ onSummarize, isSummarizing }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
      <div className="space-y-3">
        <div className="flex items-center gap-3 mb-1">
          <Badge variant="outline" className="border-blue-300 text-blue-700 font-semibold bg-blue-50">
            MEDICAL RECORD
          </Badge>
          <span className="text-gray-500 text-sm font-medium">#PAT-8832-D</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Johnathan Doe
        </h2>
        <p className="text-gray-600 max-w-xl text-base">
          Comprehensive view of clinical consultations, surgical procedures, and routine hygiene appointments.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button 
          onClick={onSummarize}
          disabled={isSummarizing}
          variant="outline"
          className="gap-2"
        >
          {isSummarizing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {isSummarizing ? 'Summarizing...' : 'AI Summary'}
        </Button>
        <Button variant="outline" className="gap-2">
          <FileDown className="w-4 h-4" />
          Export PDF
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <CalendarPlus className="w-4 h-4" />
          Schedule Visit
        </Button>
      </div>
    </div>
  );
};

export default PatientHeader;

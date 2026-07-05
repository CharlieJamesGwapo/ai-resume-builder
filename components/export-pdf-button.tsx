'use client';

import { Resume } from '@/types';
import { exportResumeToPDF } from '@/lib/pdf';
import { useState } from 'react';

interface ExportPDFButtonProps {
  resume: Resume;
}

export function ExportPDFButton({ resume }: ExportPDFButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      exportResumeToPDF(resume);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : 'Failed to export resume'
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white rounded-lg transition font-medium"
    >
      {isExporting ? 'Exporting...' : '📄 Export PDF'}
    </button>
  );
}

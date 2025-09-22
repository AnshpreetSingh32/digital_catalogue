import React, { useState } from 'react';
import { useFlipbook } from '../context/FlipbookContext';
import { generateCatalogPdf } from '../utils/pdfGenerator';

const DownloadPDFButton = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { bookRef, totalPages } = useFlipbook();

  const generatePdf = async () => {
    if (!bookRef?.current || isGenerating) return;
    setIsGenerating(true);
    try {
      await generateCatalogPdf(bookRef, totalPages);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePdf}
      disabled={isGenerating}
      className="px-3 py-2 bg-white text-green-700 border border-green-700 rounded-md hover:bg-green-50 disabled:opacity-60"
    >
      {isGenerating ? 'Generating PDF...' : 'Download PDF'}
    </button>
  );
};

export default DownloadPDFButton;
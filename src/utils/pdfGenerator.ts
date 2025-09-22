import type { RefObject } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Forward-declare the HTMLFlipBook component type if not available
interface FlipBook {
  pageFlip: () => any;
}

export const generateCatalogPdf = async (
  bookRef: RefObject<FlipBook>,
  totalPages: number
) => {
  const pageFlipApi = bookRef.current?.pageFlip();
  if (!pageFlipApi) return;

  const bookElement: HTMLElement = pageFlipApi.getHTMLElement();
  const pages = bookElement.querySelectorAll('.st-page');
  if (pages.length === 0) return;

  const pdf = new jsPDF('p', 'pt', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < totalPages; i++) {
    const page = pages[i] as HTMLElement;
    if (!page) continue;

    const originalDisplay = page.style.display;
    page.style.display = 'block';

    const canvas = await html2canvas(page, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    page.style.display = originalDisplay;

    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const ratio = imgProps.height / imgProps.width;
    const imgHeight = pdfWidth * ratio;

    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(imgHeight, pdfHeight));
  }

  pdf.save('genwin-catalog.pdf');
};



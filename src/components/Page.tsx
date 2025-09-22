import React from 'react';
import ReactPlayer from 'react-player';
import ZoomMagnifier from './ZoomMagnifier';
import { useFlipbook } from '../context/FlipbookContext';
import { type PageData } from '../types/data';

interface PageProps {
  pageData: PageData;
}

const Page = React.forwardRef<HTMLDivElement, PageProps>(({ pageData }, ref) => {
  const { goToPage } = useFlipbook();

  const handleTocClick = (pageNumber: number, e: React.MouseEvent) => {
    e.preventDefault();
    goToPage(pageNumber);
  };

  const renderContent = () => {
    switch (pageData.type) {
      case 'image':
        return (
          <ZoomMagnifier>
            <img src={pageData.content} alt="Catalog Page" className="w-full h-full object-contain bg-white" />
          </ZoomMagnifier>
        );
      case 'video':
        return (
          <div className="w-full h-full bg-black flex items-center justify-center">
            <ReactPlayer url={pageData.content} width="100%" height="100%" controls />
          </div>
        );
      case 'toc':
        return (
          <div className="h-full w-full bg-white">
            <div className="h-full w-full p-6 sm:p-10 flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 mb-6">{pageData.title}</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base sm:text-lg">
                <button onClick={(e) => handleTocClick(2, e as any)} className="text-left group px-4 py-3 rounded-md border border-gray-200 hover:border-red-700 hover:bg-red-50 transition">
                  <div className="font-semibold text-gray-900 group-hover:text-red-700">Acrylic Clear Tapes</div>
                  <div className="text-gray-500">Go to page 3</div>
                </button>
                <button onClick={(e) => handleTocClick(4, e as any)} className="text-left group px-4 py-3 rounded-md border border-gray-200 hover:border-red-700 hover:bg-red-50 transition">
                  <div className="font-semibold text-gray-900 group-hover:text-red-700">Product Video</div>
                  <div className="text-gray-500">Go to page 5</div>
                </button>
                <button onClick={(e) => handleTocClick(6, e as any)} className="text-left group px-4 py-3 rounded-md border border-gray-200 hover:border-red-700 hover:bg-red-50 transition">
                  <div className="font-semibold text-gray-900 group-hover:text-red-700">Contact Us</div>
                  <div className="text-gray-500">Go to page 7</div>
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={ref} className="bg-white border">
      <div className="relative w-full h-[70vh] sm:h-[80vh]">
        {renderContent()}
        {(pageData.specUrl || pageData.requestQuote) && (
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            {pageData.specUrl && (
              <a
                href={pageData.specUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-red-700 text-white font-semibold rounded-md shadow-md hover:bg-red-800 transition-colors"
              >
                Download Spec
              </a>
            )}
            {pageData.requestQuote && (
              <button
                onClick={() => alert('Request a quote form would appear here.')}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors"
              >
                Request Quote
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

export default Page;
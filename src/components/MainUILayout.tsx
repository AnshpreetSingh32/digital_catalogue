import { useEffect } from 'react';
import { useFlipbook } from '../context/FlipbookContext';
import DownloadPDFButton from './DownloadPDFButton';

const MainUILayout = () => {
  const { currentPage, totalPages, flipBackward, flipForward, soundEnabled, toggleSound } = useFlipbook();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        flipBackward();
      } else if (event.key === 'ArrowRight') {
        flipForward();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [flipBackward, flipForward]);

  return (
    <div id="app-header" className="fixed top-0 left-0 w-full bg-red-700/95 backdrop-blur text-white px-4 shadow-md z-10 h-14 sm:h-16 flex items-center">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white text-red-700 font-extrabold rounded flex items-center justify-center">G</div>
            <h1 className="text-lg sm:text-xl font-bold tracking-wide">GENWIN Tapes</h1>
          </div>
          <div className="hidden sm:block">
            <DownloadPDFButton />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={flipBackward}
            className="px-3 py-2 bg-white text-red-700 rounded-md hover:bg-gray-100 active:scale-[0.98] transition shadow-sm"
            aria-label="Previous Page"
          >
            Prev
          </button>
          <span className="text-xs sm:text-sm text-gray-100">
            Page <span className="font-semibold">{currentPage + 1}</span> of {totalPages}
          </span>
          <button
            onClick={flipForward}
            className="px-3 py-2 bg-white text-red-700 rounded-md hover:bg-gray-100 active:scale-[0.98] transition shadow-sm"
            aria-label="Next Page"
          >
            Next
          </button>
          <button
            onClick={toggleSound}
            className="ml-2 px-3 py-2 bg-white/10 border border-white/20 rounded-md hover:bg-white/20 transition"
            aria-label={soundEnabled ? 'Mute page turn sound' : 'Unmute page turn sound'}
            title={soundEnabled ? 'Mute' : 'Unmute'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          <div className="sm:hidden">
            <DownloadPDFButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainUILayout;
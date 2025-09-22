import { useRef, useEffect, useState, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Page from './Page';
import { useFlipbook } from '../context/FlipbookContext';
import { Howl } from 'howler';

// Forward-declare the HTMLFlipBook component type if not available
interface FlipBook {
  pageFlip: () => any;
}

const FlipbookContainer = () => {
  const { pages, isLoading, setCurrentPage, setBookRef, soundEnabled } = useFlipbook();
  const bookRef = useRef<FlipBook>(null);
  const [sound] = useState(new Howl({
    src: ['/assets/sounds/page_flip.mp3'],
    volume: 0.25,
  }));
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  // Pass the ref to the context once it's set
  useEffect(() => {
    if (bookRef.current) {
      setBookRef(bookRef);
    }
  }, [setBookRef, pages]); // Also re-run if pages change to re-init the book

  useEffect(() => {
    const calcAvailable = () => {
      const header = document.getElementById('app-header');
      const footer = document.getElementById('app-footer');
      const headerH = header ? header.getBoundingClientRect().height : 0;
      const footerH = footer ? footer.getBoundingClientRect().height : 0;
      const width = window.innerWidth;
      const height = window.innerHeight - headerH - footerH;
      setViewport({ width, height });
    };
    calcAvailable();
    window.addEventListener('resize', calcAvailable);
    return () => window.removeEventListener('resize', calcAvailable);
  }, []);

  const onPage = useCallback((e: any) => {
    setCurrentPage(e.data);
    if (soundEnabled) {
      sound.play();
    }
  }, [setCurrentPage, sound, soundEnabled]);

  if (isLoading) {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div>Loading Catalog...</div>
        </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center box-border" style={{ height: viewport.height }}>
      <HTMLFlipBook
        width={Math.min(1000, Math.max(315, Math.floor(viewport.width * 0.6)))}
        height={Math.min(1350, Math.max(420, Math.floor(viewport.height * 0.95)))}
        minWidth={315}
        maxWidth={1000}
        minHeight={420}
        maxHeight={1350}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={onPage}
        ref={bookRef as any}
        key={pages.length} // Add key to force re-render when pages load
        className="shadow-lg"
      >
        {pages.map((page, index) => (
          <Page key={index} pageData={page} />
        ))}
      </HTMLFlipBook>
    </div>
  );
};

export default FlipbookContainer;
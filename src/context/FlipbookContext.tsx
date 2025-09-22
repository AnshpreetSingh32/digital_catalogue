import { createContext, useState, useEffect, useContext, useCallback, type ReactNode, type RefObject } from 'react';
import { type PageData } from '../types/data';

// Forward-declare the HTMLFlipBook component type if not available
interface FlipBook {
  pageFlip: () => any; // Simplified API, as we don't have the full type
}

interface FlipbookContextType {
  pages: PageData[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  bookRef: RefObject<FlipBook | null> | null;
  setCurrentPage: (page: number) => void;
  goToPage: (page: number) => void;
  flipForward: () => void;
  flipBackward: () => void;
  setBookRef: (ref: RefObject<FlipBook | null>) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const FlipbookContext = createContext<FlipbookContextType | undefined>(undefined);

export const FlipbookProvider = ({ children }: { children: ReactNode }) => {
  const [pages, setPages] = useState<PageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [bookRef, setBookRef] = useState<RefObject<FlipBook | null> | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch('/catalogData.json');
        const data = await response.json();
        setPages(data);
        setTotalPages(data.length);
      } catch (error) {
        console.error("Failed to load catalog data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPages();
  }, []);

  const getPageFlipApi = useCallback(() => {
    return bookRef?.current?.pageFlip();
  }, [bookRef]);

  const flipForward = useCallback(() => {
    getPageFlipApi()?.flipNext();
  }, [getPageFlipApi]);

  const flipBackward = useCallback(() => {
    getPageFlipApi()?.flipPrev();
  }, [getPageFlipApi]);

  const goToPage = useCallback((page: number) => {
    getPageFlipApi()?.turnToPage(page);
  }, [getPageFlipApi]);

  const value = {
    pages,
    isLoading,
    currentPage,
    totalPages,
    bookRef,
    setCurrentPage,
    goToPage,
    flipForward,
    flipBackward,
    setBookRef,
    soundEnabled,
    toggleSound: () => setSoundEnabled((prev) => !prev),
  };

  return (
    <FlipbookContext.Provider value={value}>
      {children}
    </FlipbookContext.Provider>
  );
};

export const useFlipbook = () => {
  const context = useContext(FlipbookContext);
  if (context === undefined) {
    throw new Error('useFlipbook must be used within a FlipbookProvider');
  }
  return context;
};

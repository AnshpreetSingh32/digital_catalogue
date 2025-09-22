import { useFlipbook } from '../context/FlipbookContext';


const PageThumbnailNavigator = () => {
  const { pages, goToPage, currentPage } = useFlipbook();

  const handleThumbnailClick = (pageNumber: number) => {
    goToPage(pageNumber);
  };

  if (!pages || pages.length === 0) {
    return null; // Don't render anything if there are no pages
  }

  return (
    <div id="app-footer" className="fixed bottom-0 left-0 w-full bg-black/60 backdrop-blur p-2 z-20 shadow-lg h-24 sm:h-28 flex items-center">
      <div className="max-w-7xl mx-auto flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
        {pages.map((page, index) => {
          // Use placeholder images for non-image content types for the thumbnail
          const thumbnailUrl = page.type === 'image' && page.content
            ? page.content
            : `https://placehold.co/100x140/333/fff?text=Page+${index + 1}`;

          return (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-24 sm:w-20 sm:h-28 rounded-sm overflow-hidden focus:outline-none transition-all duration-200 ${
                currentPage === index
                  ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-black/40 transform scale-105 shadow-md'
                  : 'border border-white/10 opacity-80 hover:opacity-100 hover:border-white/30'
              }`}
            >
              <img
                src={thumbnailUrl}
                alt={`Page ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PageThumbnailNavigator;
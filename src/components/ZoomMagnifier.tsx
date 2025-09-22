import React, { useState } from 'react';

interface ZoomMagnifierProps {
  children: React.ReactNode;
}

const ZoomMagnifier: React.FC<ZoomMagnifierProps> = ({ children }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
      onClick={() => setIsZoomed((v) => !v)}
    >
      <div
        className={`transition-transform duration-300 ease-out w-full h-full ${
          isZoomed ? 'scale-150' : 'scale-100'
        }`}
      >
        {children}
      </div>
      <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-md select-none">
        {isZoomed ? 'Tap to zoom out' : 'Tap to zoom in'}
      </div>
    </div>
  );
};

export default ZoomMagnifier;



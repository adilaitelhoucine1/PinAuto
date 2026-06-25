import { useState } from 'react';
import { RiCloseLine, RiDragMoveLine } from 'react-icons/ri';
import { formatFileSize } from '../../utils/formatters';

export default function ImageCard({ image, onRemove, selected = false }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const src = image.url || image.preview || (image.file && URL.createObjectURL(image.file));
  const name = image.name || image.filename || 'Image';
  const size = image.size || image.fileSize || 0;
  const width = image.width || '—';
  const height = image.height || '—';

  return (
    <div
      className={`
        relative group rounded-xl overflow-hidden
        bg-slate-100 dark:bg-slate-800
        border-2 transition-all duration-200
        ${selected
          ? 'border-indigo-500 shadow-glow'
          : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'
        }
        cursor-grab active:cursor-grabbing
      `}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      {/* Drag Handle */}
      <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="p-1 rounded-md bg-black/40 backdrop-blur-sm">
          <RiDragMoveLine className="w-3.5 h-3.5 text-white" />
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove?.();
        }}
        className="
          absolute top-2 right-2 z-10
          p-1 rounded-md
          bg-red-500/90 hover:bg-red-600
          text-white
          opacity-0 group-hover:opacity-100
          transition-all duration-200
          transform group-hover:scale-100 scale-75
        "
      >
        <RiCloseLine className="w-3.5 h-3.5" />
      </button>

      {/* Image */}
      <div className="aspect-square relative">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse" />
        )}
        <img
          src={src}
          alt={name}
          onLoad={() => setImageLoaded(true)}
          className={`
            w-full h-full object-cover
            transition-all duration-300
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            group-hover:scale-105
          `}
        />

        {/* Hover Overlay */}
        <div
          className={`
            absolute inset-0
            bg-gradient-to-t from-black/70 via-black/20 to-transparent
            transition-opacity duration-200
            ${showOverlay ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="absolute bottom-0 left-0 right-0 p-2.5">
            <p className="text-[11px] font-medium text-white truncate mb-0.5">
              {name}
            </p>
            <div className="flex items-center gap-2 text-[10px] text-white/70">
              <span>{width} × {height}</span>
              {size > 0 && (
                <>
                  <span>•</span>
                  <span>{formatFileSize(size)}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

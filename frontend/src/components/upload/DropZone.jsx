import { useState, useRef, useCallback } from 'react';
import { RiUploadCloud2Line, RiImageAddLine } from 'react-icons/ri';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function DropZone({ onFilesSelected, loading = false }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragOver(false);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      dragCounter.current = 0;

      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith('image/')
      );
      if (files.length > 0 && onFilesSelected) {
        onFilesSelected(files);
      }
    },
    [onFilesSelected]
  );

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0 && onFilesSelected) {
      onFilesSelected(files);
    }
    e.target.value = '';
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleBrowseClick}
      className={`
        relative group cursor-pointer
        flex flex-col items-center justify-center
        min-h-[200px] p-8
        rounded-2xl
        border-2 border-dashed
        transition-all duration-300 ease-out
        ${isDragOver
          ? 'border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10 scale-[1.01]'
          : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-500/[0.02] dark:hover:bg-indigo-500/5'
        }
        ${loading ? 'pointer-events-none opacity-60' : ''}
      `}
    >
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" />
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Uploading images...
          </p>
        </div>
      ) : (
        <>
          {/* Upload Icon */}
          <div
            className={`
              flex items-center justify-center w-16 h-16 mb-4 rounded-2xl
              bg-indigo-50 dark:bg-indigo-500/10
              transition-all duration-300
              ${isDragOver ? 'scale-110 bg-indigo-100 dark:bg-indigo-500/20' : 'group-hover:scale-105'}
            `}
          >
            <RiUploadCloud2Line
              className={`
                w-8 h-8 text-indigo-500 dark:text-indigo-400
                transition-transform duration-300
                ${isDragOver ? 'animate-float' : 'group-hover:-translate-y-0.5'}
              `}
            />
          </div>

          {/* Text */}
          <h4 className="text-base font-semibold text-slate-700 dark:text-slate-200 mb-1">
            {isDragOver ? 'Drop your images here' : 'Drag & Drop your images here'}
          </h4>
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-4 text-center">
            or click to browse &bull; JPG, PNG, WEBP &bull; Max 10MB
          </p>

          {/* Browse Button */}
          <Button
            variant="secondary"
            size="sm"
            icon={RiImageAddLine}
            onClick={(e) => {
              e.stopPropagation();
              handleBrowseClick();
            }}
          >
            Browse Files
          </Button>
        </>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Drag overlay effect */}
      {isDragOver && (
        <div className="absolute inset-0 rounded-2xl border-2 border-indigo-500 bg-indigo-500/5 pointer-events-none animate-pulse" />
      )}
    </div>
  );
}

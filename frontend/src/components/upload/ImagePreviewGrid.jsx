import { useState, useCallback } from 'react';
import { RiImageLine } from 'react-icons/ri';
import ImageCard from './ImageCard';
import EmptyState from '../ui/EmptyState';

export default function ImagePreviewGrid({ images = [], onRemove, onReorder }) {
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = useCallback((e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Set a transparent drag image
    const ghost = document.createElement('div');
    ghost.style.opacity = '0';
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 0, 0);
    setTimeout(() => document.body.removeChild(ghost), 0);
  }, []);

  const handleDragOver = useCallback((e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (dragIndex !== null && dragOverIndex !== null && dragIndex !== dragOverIndex) {
      onReorder?.(dragIndex, dragOverIndex);
    }
    setDragIndex(null);
    setDragOverIndex(null);
  }, [dragIndex, dragOverIndex, onReorder]);

  if (!images || images.length === 0) {
    return (
      <EmptyState
        icon={RiImageLine}
        title="No images uploaded"
        description="Upload images to get started with your Pinterest pin."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
      {images.map((image, index) => (
        <div
          key={image.id || index}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className={`
            transition-all duration-200
            ${dragIndex === index ? 'opacity-40 scale-95' : ''}
            ${dragOverIndex === index && dragIndex !== index ? 'scale-105 ring-2 ring-indigo-500 rounded-xl' : ''}
            animate-fadeIn
          `}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <ImageCard
            image={image}
            onRemove={() => onRemove?.(image.id)}
          />
        </div>
      ))}
    </div>
  );
}

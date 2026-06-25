import { useState, useCallback } from 'react';
import * as imageApi from '../api/imageApi';
import { useToast } from './useToast';

export function useImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await imageApi.getImages();
      setImages(data.images || data || []);
    } catch (err) {
      addToast('Failed to fetch images', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const uploadImages = useCallback(
    async (files) => {
      setLoading(true);
      try {
        const data = await imageApi.uploadImages(files);
        const uploaded = data.images || data || [];
        setImages((prev) => [...prev, ...uploaded]);
        addToast(`${uploaded.length} image${uploaded.length !== 1 ? 's' : ''} uploaded successfully`, 'success');
        return uploaded;
      } catch (err) {
        addToast('Failed to upload images', 'error');
        return [];
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  const removeImage = useCallback(
    async (id) => {
      try {
        await imageApi.deleteImage(id);
        setImages((prev) => prev.filter((img) => img.id !== id));
        addToast('Image removed', 'success');
      } catch (err) {
        addToast('Failed to remove image', 'error');
      }
    },
    [addToast]
  );

  const addLocalImages = useCallback((newImages) => {
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const removeLocalImage = useCallback((id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  const reorderImages = useCallback((fromIndex, toIndex) => {
    setImages((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }, []);

  return {
    images,
    loading,
    setImages,
    fetchImages,
    uploadImages,
    removeImage,
    addLocalImages,
    removeLocalImage,
    reorderImages,
  };
}

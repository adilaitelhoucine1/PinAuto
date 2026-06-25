import { useState, useCallback, useEffect } from 'react';
import DashboardGrid from '../components/dashboard/DashboardGrid';
import { useToast } from '../hooks/useToast';
import { validateCampaign } from '../utils/validators';
import * as imageApi from '../api/imageApi';
import * as campaignApi from '../api/campaignApi';

const initialFormData = {
  title: '',
  description: '',
  url: '',
  board: '',
  keywords: [],
  altText: '',
  tags: [],
  scheduleDate: '',
  notes: '',
};

export default function Dashboard() {
  const { addToast } = useToast();

  // Image state
  const [images, setImages] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

  // Publish state
  const [publishLoading, setPublishLoading] = useState(false);
  const [publishStatus, setPublishStatus] = useState('idle');
  const [lastPublishTime, setLastPublishTime] = useState(null);

  // Fetch images on mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const result = await imageApi.getImages();
      const serverImages = (result.data || []).map((img) => ({
        id: img.id,
        serverId: img.id,
        name: img.original_name,
        filename: img.file_name,
        size: Number(img.size),
        fileSize: Number(img.size),
        type: img.mime_type,
        width: img.width,
        height: img.height,
        // Use the backend URL for preview - works through proxy or direct access
        preview: img.file_path,
        url: img.file_path,
      }));
      setImages(serverImages);
    } catch (err) {
      console.error('Failed to fetch images:', err);
    }
  };

  // Handle files selected from DropZone
  const handleFilesSelected = useCallback(
    async (files) => {
      setImageLoading(true);

      try {
        const result = await imageApi.uploadImages(files);
        const uploadedImages = (result.data || []).map((img) => ({
          id: img.id,
          serverId: img.id,
          name: img.original_name,
          filename: img.file_name,
          size: Number(img.size),
          fileSize: Number(img.size),
          type: img.mime_type,
          width: img.width,
          height: img.height,
          preview: img.file_path,
          url: img.file_path,
        }));

        setImages((prev) => [...prev, ...uploadedImages]);

        addToast(
          `${uploadedImages.length} image${uploadedImages.length !== 1 ? 's' : ''} uploaded successfully`,
          'success'
        );
      } catch (err) {
        console.error('Upload failed:', err);
        addToast(err.response?.data?.message || 'Failed to upload images', 'error');
      } finally {
        setImageLoading(false);
      }
    },
    [addToast]
  );

  // Remove image
  const handleRemoveImage = useCallback(
    async (id) => {
      try {
        await imageApi.deleteImage(id);
        setImages((prev) => prev.filter((i) => i.id !== id));
        addToast('Image removed', 'info');
      } catch (err) {
        console.error('Failed to delete image:', err);
        addToast('Failed to remove image', 'error');
      }
    },
    [addToast]
  );

  // Reorder images (local only — sort_order is set when creating a campaign)
  const handleReorderImages = useCallback((fromIndex, toIndex) => {
    setImages((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }, []);

  // Handle form change
  const handleFormChange = useCallback((newFormData) => {
    setFormData(newFormData);
    setFormErrors((prev) => {
      const cleared = { ...prev };
      Object.keys(cleared).forEach((key) => {
        if (newFormData[key] && String(newFormData[key]).trim()) {
          delete cleared[key];
        }
      });
      return cleared;
    });
  }, []);

  // Handle publish
  const handlePublish = useCallback(async () => {
    // Validate
    const validation = validateCampaign({
      ...formData,
      images,
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      Object.values(validation.errors).forEach((msg) => {
        addToast(msg, 'error');
      });
      throw new Error('Validation failed');
    }

    setFormErrors({});
    setPublishLoading(true);
    setPublishStatus('publishing');

    try {
      // Step 1: Create campaign via API
      const campaignPayload = {
        title: formData.title,
        description: formData.description,
        destination_url: formData.url,
        board_name: formData.board,
        keywords: formData.keywords || [],
        alt_text: formData.altText || '',
        tags: formData.tags || [],
        schedule_date: formData.scheduleDate || null,
        notes: formData.notes || '',
        image_ids: images.map((img) => img.id),
      };

      const createResult = await campaignApi.createCampaign(campaignPayload);
      const campaignId = createResult.data?.id;

      // Step 2: Publish campaign
      if (campaignId) {
        await campaignApi.publishCampaign(campaignId);
      }

      setPublishLoading(false);
      setPublishStatus('published');
      setLastPublishTime(new Date().toISOString());

      // Reset status after a few seconds
      setTimeout(() => {
        setPublishStatus('idle');
      }, 5000);
    } catch (err) {
      setPublishLoading(false);
      setPublishStatus('error');
      const msg = err.response?.data?.message || 'Failed to publish campaign';
      addToast(msg, 'error');
      setTimeout(() => setPublishStatus('idle'), 3000);
      throw err;
    }
  }, [formData, images, addToast]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8 animate-slideUp">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-2 h-8 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Pin Campaign Builder
          </h1>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 ml-5">
          Upload images, fill in pin details, and publish to Pinterest — all in one place.
        </p>
      </div>

      {/* Dashboard Grid */}
      <DashboardGrid
        images={images}
        loading={imageLoading}
        onFilesSelected={handleFilesSelected}
        onRemoveImage={handleRemoveImage}
        onReorderImages={handleReorderImages}
        formData={formData}
        onFormChange={handleFormChange}
        formErrors={formErrors}
        onPublish={handlePublish}
        publishLoading={publishLoading}
        publishStatus={publishStatus}
        lastPublishTime={lastPublishTime}
      />
    </div>
  );
}

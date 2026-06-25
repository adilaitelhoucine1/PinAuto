import { RiUploadCloud2Line } from 'react-icons/ri';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import DropZone from '../upload/DropZone';
import ImagePreviewGrid from '../upload/ImagePreviewGrid';

export default function UploadCard({
  images = [],
  loading = false,
  onFilesSelected,
  onRemoveImage,
  onReorderImages,
}) {
  const imageCount = images.length;

  return (
    <Card
      title="Image Upload"
      icon={RiUploadCloud2Line}
      gradient
      badge={
        imageCount > 0 ? (
          <Badge variant="success" size="sm">
            {imageCount} image{imageCount !== 1 ? 's' : ''}
          </Badge>
        ) : null
      }
    >
      <DropZone onFilesSelected={onFilesSelected} loading={loading} />
      <ImagePreviewGrid
        images={images}
        onRemove={onRemoveImage}
        onReorder={onReorderImages}
      />
    </Card>
  );
}

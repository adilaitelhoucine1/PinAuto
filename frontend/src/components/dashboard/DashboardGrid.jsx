import UploadCard from './UploadCard';
import AiGeneratorCard from './AiGeneratorCard';
import ListingCard from './ListingCard';
import SummaryCard from './SummaryCard';
import PublishCard from './PublishCard';

export default function DashboardGrid({
  images,
  loading,
  onFilesSelected,
  onRemoveImage,
  onReorderImages,
  formData,
  onFormChange,
  formErrors,
  onPublish,
  publishLoading,
  publishStatus,
  lastPublishTime,
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Row 1: Upload + AI Generator */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <UploadCard
            images={images}
            loading={loading}
            onFilesSelected={onFilesSelected}
            onRemoveImage={onRemoveImage}
            onReorderImages={onReorderImages}
          />
        </div>
        <div className="xl:col-span-1">
          <AiGeneratorCard />
        </div>
      </div>

      {/* Row 2: Listing Form */}
      <div>
        <ListingCard
          formData={formData}
          onChange={onFormChange}
          errors={formErrors}
        />
      </div>

      {/* Row 3: Summary + Publish */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SummaryCard
          images={images}
          formData={formData}
        />
        <PublishCard
          images={images}
          formData={formData}
          onPublish={onPublish}
          loading={publishLoading}
          status={publishStatus}
          lastPublishTime={lastPublishTime}
        />
      </div>
    </div>
  );
}

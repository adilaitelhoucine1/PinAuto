import { RiFileListLine } from 'react-icons/ri';
import Card from '../ui/Card';
import ListingForm from '../listing/ListingForm';

export default function ListingCard({ formData, onChange, errors }) {
  return (
    <Card
      title="Pin Details"
      icon={RiFileListLine}
      subtitle="Fill in all the details for your Pinterest pin"
      gradient
    >
      <ListingForm
        formData={formData}
        onChange={onChange}
        errors={errors}
      />
    </Card>
  );
}

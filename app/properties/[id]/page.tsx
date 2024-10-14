import { fetchPropertyDetails } from '@/utils/actions';
import { redirect } from 'next/navigation';

// 49. Create Pages
// 112. Property Details Page - Setup

const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {
  const property = await fetchPropertyDetails(params.id);
  if (!property) redirect('/');
  const { baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, beds, guests };

  return <div>Properties</div>;
};

export default PropertyDetailPage;

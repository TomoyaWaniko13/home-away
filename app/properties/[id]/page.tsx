import { fetchPropertyDetails } from '@/utils/actions';
import { redirect } from 'next/navigation';
import BreadCrumbs from '@/components/properties/BreadCrumbs';
import FavoriteToggleButton from '@/components/card/FavoriteToggleButton';
import ShareButton from '@/components/properties/ShareButton';

// 49. Create Pages
// 112. Property Details Page - Setup
// 113. Breadcrumbs Component
// 114. Share Button Component

const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {
  const property = await fetchPropertyDetails(params.id);
  if (!property) redirect('/');
  const { baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, beds, guests };

  return (
    <section>
      <BreadCrumbs name={property.name} />
      <header className={'flex justify-between items-center mt-4'}>
        <h1 className={'text-4xl font-bold capitalize'}>{property.tagline}</h1>
        <div className={'flex items-center gap-x-4'}>
          {/* share button */}
          <ShareButton name={property.name} propertyId={property.id} />
          <FavoriteToggleButton propertyId={property.id} />
        </div>
      </header>
    </section>
  );
};

export default PropertyDetailPage;

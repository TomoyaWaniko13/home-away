import { redirect } from 'next/navigation';
import BreadCrumbs from '@/components/properties/BreadCrumbs';
import FavoriteToggleButton from '@/components/card/FavoriteToggleButton';
import ShareButton from '@/components/properties/ShareButton';
import ImageContainer from '@/components/properties/ImageContainer';
import PropertyRating from '@/components/card/PropertyRating';
import { fetchPropertyDetails } from '@/actions/propertyAction';
import BookingCalendar from '@/components/properties/BookingCalendar';
import PropertyDetails from '@/components/properties/PropertyDetails';
import UserInfo from '@/components/properties/UserInfo';
import { Separator } from '@/components/ui/separator';
import Description from '@/components/properties/Description';
import Amenities from '@/components/properties/Amenities';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import SubmitReview from '@/components/reviews/SubmitReview';
import PropertyReviews from '@/components/reviews/PropertyReviews';

// 49. Create Pages
// 112. Property Details Page - Setup
// 113. Breadcrumbs Component
// 114. Share Button Component
// 115. Image Container Component
// 116. Calendar Component
// 117. Property Details Component
// 118. UserInfo Component
// 119. Description Component

// dynamic()を使うと、コンポーネントは必要になるまでロードされません。これにより初期ページロード時間を短縮できます:
// https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading
const DynamicMap = dynamic(() => import('@/components/properties/PropertyMap'), {
  // ssr: falseにより、このコンポーネントはクライアントサイドでのみレンダリングされます。これは、マップライブラリがブラウザ環境を必要とする場合に有用です。
  ssr: false,
  loading: () => <Skeleton className={'h-[400px] w-full'} />,
});

const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {
  const property = await fetchPropertyDetails(params.id);
  if (!property) redirect('/');

  const { baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, beds, guests };

  const { firstName, profileImage } = property.profile;
  const userProfile = { firstName, profileImage };

  return (
    <section>
      <BreadCrumbs name={property.name} />
      <header className={'flex justify-between items-center mt-4'}>
        <h1 className={'text-4xl font-bold capitalize'}>{property.tagline}</h1>
        <div className={'flex items-center gap-x-4'}>
          <ShareButton name={property.name} propertyId={property.id} />
          <FavoriteToggleButton propertyId={property.id} />
        </div>
      </header>
      <ImageContainer mainImage={property.image} name={property.name} />
      <section className={'lg:grid lg:grid-cols-12 gap-x-12 mt-12'}>
        <div className={'lg:col-span-8'}>
          <div className={'flex gap-x-4 items-center'}>
            <h1 className={'text-xl font-bold'}>{property.name}</h1>
            <PropertyRating inPage propertyId={property.id} />
          </div>
          <PropertyDetails details={details} />
          <UserInfo profile={userProfile} />
          <Separator className={'mt-4'} />
          <Description description={property.description} />
          <Amenities amenities={property.amenities} />
          <DynamicMap countryCode={property.country} />
        </div>
        <div className={'lg:col-span-4 flex flex-col items-center'}>
          <BookingCalendar />
        </div>
      </section>
      <SubmitReview propertyId={property.id} />
      <PropertyReviews propertyId={property.id} />
    </section>
  );
};

export default PropertyDetailPage;

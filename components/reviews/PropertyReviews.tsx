import Title from '@/components/properties/Title';
import ReviewCard from './ReviewCard';
import { fetchPropertyReviews } from '@/actions/reviewAction';

// 129. Render Reviews

const PropertyReviews = async ({ propertyId }: { propertyId: string }) => {
  // propertyId を元に、review を表示するのに必要な fields を取得します。
  const reviews = await fetchPropertyReviews(propertyId);
  if (reviews.length < 1) return null;

  return (
    <div className='mt-8'>
      <Title text='Reviews' />
      <div className='grid md:grid-cols-2 gap-8 mt-4 '>
        {reviews.map((review) => {
          // review を表示するのに必要な fields を取得します。
          const { comment, rating } = review;
          const { firstName, profileImage } = review.profile;
          const reviewInfo = { comment, rating, name: firstName, image: profileImage };

          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
        })}
      </div>
    </div>
  );
};
export default PropertyReviews;

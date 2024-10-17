import { deleteReviewAction, fetchPropertyReviewsByUser } from '@/actions/reviewAction';
import EmptyList from '@/components/home/EmptyList';
import Title from '@/components/properties/Title';
import ReviewCard from '@/components/reviews/ReviewCard';
import FormContainer from '@/components/form/FormContainer';
import { IconButton } from '@/components/form/Buttons';

// 49. Create Pages
// 133. Reviews Page

const ReviewsPage = async () => {
  const reviews = await fetchPropertyReviewsByUser();
  if (reviews.length === 0) return <EmptyList />;

  return (
    <>
      <Title text={'Your Reviews'} />
      <section className={'grid md:grid-cols-2 gap-8 mt-4'}>
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { name, image } = review.property;
          const reviewInfo = { comment, rating, name, image };

          return (
            // : ReviewCard コンポーネントは、削除ボタンの有無に関わらず使用できます。
            // 削除機能が必要な場合にのみ DeleteReview コンポネートを子要素として渡すことができます。
            <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          );
        })}
      </section>
    </>
  );
};

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId });

  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType={'delete'} />
    </FormContainer>
  );
};

export default ReviewsPage;

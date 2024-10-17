import { FaStar } from 'react-icons/fa';
import { clsx } from 'clsx';
import { fetchPropertyRating } from '@/actions/reviewAction';

// 102. Property Rating
// 135. PropertyRating Component - Complete

type Props = {
  propertyId: string;
  inPage: boolean;
};

const PropertyRating = async ({ propertyId, inPage }: Props) => {
  const { rating, count } = await fetchPropertyRating(propertyId);
  if (count === 0) return null;

  const countText = count > 1 ? 'reviews' : 'review';
  const countValue = `(${count}) ${inPage ? countText : ''}`;

  return (
    <span className={clsx('flex gap-1 items-center', { 'text-md': inPage, 'text-xs': !inPage })}>
      <FaStar className={'w-3 h-3'} />
      {rating} {countValue}
    </span>
  );
};

export default PropertyRating;

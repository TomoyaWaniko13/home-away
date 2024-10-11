import { FaStar } from 'react-icons/fa';
import { clsx } from 'clsx';

// 102. Property Rating

type Props = {
  propertyId: string;
  inPage: boolean;
};

const PropertyRating = ({ propertyId, inPage }: Props) => {
  // temp
  const rating = 4.7;
  const count = 100;

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

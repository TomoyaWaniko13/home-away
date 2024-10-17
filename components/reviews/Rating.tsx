import { FaRegStar, FaStar } from 'react-icons/fa';

// 124. Reviews Model
// 130. ReviewCard Component

type Props = {
  rating: number;
};

const Rating = ({ rating }: Props) => {
  // 3 <= 1 true
  // 3 <= 2 true
  // 3 <= 3 true
  // 3 <= 4 false
  // 3 <= 5 false
  const starts: boolean[] = Array.from({ length: 5 }, (_, i) => i + 1 <= rating);

  return (
    <div className={'flex items-center gap-x-1'}>
      {starts.map((isFilled, i) => {
        const className = `w-3 h-3 ${isFilled ? 'text-primary' : 'text-grey-400'}`;
        return isFilled ? <FaStar key={i} className={className} /> : <FaRegStar key={i} className={className} />;
      })}
    </div>
  );
};

export default Rating;

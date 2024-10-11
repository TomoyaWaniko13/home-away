import { Button } from '@/components/ui/button';
import { FaHeart } from 'react-icons/fa';

// 100. PropertyCard - Setup
// 103. Favorites Toggle Button

type Props = {
  propertyId: string;
};

const FavoriteToggleButton = ({ propertyId }: Props) => {
  return (
    <Button size={'icon'} variant={'outline'} className={'p-2 cursor-pointer'}>
      <FaHeart />
    </Button>
  );
};

export default FavoriteToggleButton;

import { Button } from '@/components/ui/button';
import { FaHeart } from 'react-icons/fa';
import { auth } from '@clerk/nextjs/server';
import { CardSignInButton } from '@/components/form/Buttons';

// 100. PropertyCard - Setup
// 103. Favorites Toggle Button
// 107. Favorites SignIn Button

type Props = {
  propertyId: string;
};

const FavoriteToggleButton = ({ propertyId }: Props) => {
  const { userId } = auth();
  if (!userId) return <CardSignInButton />;

  return (
    <Button size={'icon'} variant={'outline'} className={'p-2 cursor-pointer'}>
      <FaHeart />
    </Button>
  );
};

export default FavoriteToggleButton;

import { auth } from '@clerk/nextjs/server';
import { CardSignInButton } from '@/components/form/Buttons';
import { fetchFavoriteId } from '@/utils/actions';
import FavoriteToggleForm from '@/components/card/FavoriteToggleForm';

// 100. PropertyCard - Setup
// 103. Favorites Toggle Button
// 107. Favorites SignIn Button
// 108. Fetch Favorite
// 109. Favorites Toggle Form

type Props = {
  propertyId: string;
};

const FavoriteToggleButton = async ({ propertyId }: Props) => {
  const { userId } = auth();
  if (!userId) return <CardSignInButton />;

  const favoriteId: string | null = await fetchFavoriteId({ propertyId });

  return <FavoriteToggleForm propertyId={propertyId} favoriteId={favoriteId} />;
};

export default FavoriteToggleButton;

import { fetchFavoriteProperties } from '@/utils/actions';
import EmptyList from '@/components/home/EmptyList';
import PropertiesList from '@/components/home/PropertiesList';

// 49. Create Pages
// 111. Favorites Page

const FavoritesPage = async () => {
  const favoriteProperties = await fetchFavoriteProperties();

  if (favoriteProperties.length === 0) {
    return <EmptyList />;
  }

  return <PropertiesList properties={favoriteProperties} />;
};

export default FavoritesPage;

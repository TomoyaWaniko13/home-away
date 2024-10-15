'use server';

import db from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { renderError } from '@/lib/utils';
import { getAuthUser } from '@/actions/profileAction';

// 108. Fetch Favorite
// 現在のユーザーが propertyId で指定される Property にいいねをしたのかを取得します。
export const fetchFavoriteId = async ({ propertyId }: { propertyId: string }) => {
  const user = await getAuthUser();

  const favorite: { id: string } | null = await db.favorite.findFirst({
    where: { profileId: user.id, propertyId },
    select: { id: true },
  });

  return favorite?.id || null;
};

// 108. Fetch Favorite
// 109. Favorites Toggle Form
// 110. Toggle Favorites - Functionality
export const toggleFavoriteAction = async (prevState: { propertyId: string; favoriteId: string | null; pathname: string }) => {
  const { propertyId, favoriteId, pathname } = prevState;
  const user = await getAuthUser();

  try {
    // favoriteId が存在するということは、Property(物件)はすでに Favorite に追加されています。
    if (favoriteId) {
      await db.favorite.delete({ where: { id: favoriteId } });
    } else {
      await db.favorite.create({ data: { profileId: user.id, propertyId } });
    }

    // これにより、ページが再レンダリングされ、お気に入りの追加や削除といった最新の変更がユーザーインターフェースに即時に反映されます。
    revalidatePath(pathname);
    return { message: favoriteId ? 'Removed from Favorites' : 'Added to Favorites' };
  } catch (error) {
    return renderError(error);
  }
};

// 111. Favorites Page
export const fetchFavoriteProperties = async () => {
  const user = await getAuthUser();

  const favorites = await db.favorite.findMany({
    where: { profileId: user.id },
    // <PropertiesList/> component に必要なフィールドを取得します。
    select: {
      property: {
        select: { id: true, name: true, tagline: true, country: true, price: true, image: true },
      },
    },
  });

  return favorites.map((favorite) => favorite.property);
};

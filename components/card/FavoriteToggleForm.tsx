'use client';

import { usePathname } from 'next/navigation';
import { toggleFavoriteAction } from '@/utils/actions';
import FormWrapper from '@/components/form/FormWrapper';
import { CardSubmitButton } from '@/components/form/Buttons';

// 100. PropertyCard - Setup
// 109. Favorites Toggle Form

type Props = {
  propertyId: string;
  favoriteId: string | null;
};

// フォームの送信とUIの更新を行います。
const FavoriteToggleForm = ({ propertyId, favoriteId }: Props) => {
  const pathname = usePathname();
  const toggleAction = toggleFavoriteAction.bind(null, { propertyId, favoriteId, pathname });

  return (
    <FormWrapper formSubmitAction={toggleAction}>
      <CardSubmitButton isFavorite={!!favoriteId} />
    </FormWrapper>
  );
};

export default FavoriteToggleForm;

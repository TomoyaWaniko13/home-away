import { formatQuantity } from '@/utils/format';

// 117. Property Details Component

type Props = {
  details: { bedrooms: number; baths: number; guests: number; beds: number };
};

const PropertyDetails = ({ details: { bedrooms, baths, guests, beds } }: Props) => {
  return (
    <p className={'text-md font-light'}>
      <span>{formatQuantity(bedrooms, 'bedroom')} &middot;</span>
      <span>{formatQuantity(baths, 'bath')} &middot;</span>
      <span>{formatQuantity(guests, 'guest')} &middot;</span>
      <span>{formatQuantity(beds, 'bed')} &middot;</span>
    </p>
  );
};

export default PropertyDetails;

import { PropertyCardProps } from '@/utils/types';
import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '@/utils/format';

// 100. PropertyCard - Setup

type Props = {
  property: PropertyCardProps;
};

const PropertyCard = ({ property }: Props) => {
  const { name, image, price, country, id: propertyId, tagline } = property;

  return (
    <article className={'group relative'}>
      <Link href={`/properties/${propertyId}`}>
        <div className={'relative h-[300px] mb-2 overflow-hidden rounded-md'}>
          <Image src={image} fill alt={name} className={'object-cover transform group-hover:scale-105 transition-transform duration-500'} />
        </div>
        <div className={'flex justify-between items-center'}>
          <h3 className={'text-sm font-semibold mt-1'}>{name.substring(0, 30)}</h3>
        </div>
        <p className={'text-sm mt-1 text-muted-foreground'}>{tagline.substring(0, 40)}</p>
        <div className={'flex justify-between items-center mt-1'}>
          <p className={'text-sm mt-1'}>
            <span className={'font-semibold'}>{formatCurrency(price)}</span> night
          </p>
        </div>
      </Link>
      <div className={'absolute top-5 right-5 z-5'}></div>
    </article>
  );
};

export default PropertyCard;

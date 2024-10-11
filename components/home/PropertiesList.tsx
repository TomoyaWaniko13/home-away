import { PropertyCardProps } from '@/utils/types';
import PropertyCard from '@/components/card/PropertyCard';

// 96. Home Page - Setup
// 100. PropertyCard - Setup

type Props = {
  properties: PropertyCardProps[];
};

const PropertiesList = ({ properties }: Props) => {
  return (
    <section className={'gap-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </section>
  );
};

export default PropertiesList;

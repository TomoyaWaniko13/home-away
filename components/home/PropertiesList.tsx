import { PropertyCardProps } from '@/utils/types';
import PropertyCard from '@/components/card/PropertyCard';

// 96. Home Page - Setup
// 100. PropertyCard - Setup

type Props = {
  properties: PropertyCardProps[];
};

const PropertiesList = ({ properties }: Props) => {
  return (
    <section>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </section>
  );
};

export default PropertiesList;

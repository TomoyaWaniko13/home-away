import { PropertyCardProps } from '@/utils/types';
import { fetchProperties } from '@/utils/actions';
import EmptyList from '@/components/home/EmptyList';
import PropertiesList from '@/components/home/PropertiesList';

// 96. Home Page - Setup

type Props = {
  categoryQuery?: string;
  searchQuery?: string;
};

const PropertiesWrapper = async ({ categoryQuery, searchQuery }: Props) => {
  const properties: PropertyCardProps[] = await fetchProperties({ categoryQuery, searchQuery });

  if (properties.length === 0) {
    return <EmptyList heading={'No results.'} message={'Try changing or removing some of your filters.'} btnText={'Clear filters'} />;
  }

  return <PropertiesList properties={properties} />;
};

export default PropertiesWrapper;

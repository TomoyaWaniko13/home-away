import CategoriesList from '@/components/home/CategoriesList';
import PropertiesWrapper from '@/components/home/PropertiesWrapper';

// 48. Remove Boilerplate
// 96. Home Page - Setup

type Props = {
  searchParams: { category?: string; search?: string };
};

export default function HomePage({ searchParams }: Props) {
  return (
    <section>
      <CategoriesList />
      <PropertiesWrapper />
    </section>
  );
}

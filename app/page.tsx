// 48. Remove Boilerplate
// 96. Home Page - Setup
// 105. Loading Cards

import PropertiesWrapper from '@/components/home/PropertiesWrapper';
import CategoriesList from '@/components/home/CategoriesList';
import LoadingCards from '@/components/card/LoadingCards';
import { Suspense } from 'react';

type Props = {
  searchParams: { category?: string; search?: string };
};

export default function HomePage({ searchParams }: Props) {
  return (
    <section>
      <CategoriesList categoryQuery={searchParams.category} searchQuery={searchParams.search} />
      <Suspense fallback={<LoadingCards />}>
        <PropertiesWrapper categoryQuery={searchParams.category} searchQuery={searchParams.search} />
      </Suspense>
    </section>
  );
}

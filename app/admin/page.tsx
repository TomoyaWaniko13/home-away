import { Suspense } from 'react';
import StatsContainer from '@/components/admin/StatsContainer';
import { ChartsLoadingContainer, StatsLoadingContainer } from '@/components/admin/Loading';
import ChartsContainer from '@/components/admin/ChartsContainer';

// 160. Admin Page - Setup
// 162. Admin Page - Loading Components

const AdminPage = () => {
  return (
    <>
      <Suspense fallback={<StatsLoadingContainer />}>
        <StatsContainer />
      </Suspense>
      <Suspense fallback={<ChartsLoadingContainer />}>
        <ChartsContainer />
      </Suspense>
    </>
  );
};

export default AdminPage;

import { fetchChartsData } from '@/actions/adminAction';
import Chart from '@/components/admin/Chart';

// 160. Admin Page - Setup
// 165. Admin Page - Chart Container

const ChartsContainer = async () => {
  const bookings: { date: string; count: number }[] = await fetchChartsData();

  if (bookings.length < 1) return null;

  return <Chart data={bookings} />;
};

export default ChartsContainer;

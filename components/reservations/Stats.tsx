import StatsCard from '@/components/admin/StatsCard';
import { formatCurrency } from '@/utils/format';
import { fetchReservationStats } from '@/actions/bookingAction';

// 171. Reservations Stats

const Stats = async () => {
  const stats = await fetchReservationStats();

  return (
    <div className={'mt-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3'}>
      <StatsCard title={'properties'} value={stats.properties} />
      <StatsCard title={'nights'} value={stats.nights} />
      <StatsCard title={'amount'} value={formatCurrency(stats.amount)} />
    </div>
  );
};

export default Stats;

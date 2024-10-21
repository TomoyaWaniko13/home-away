import { Card, CardHeader } from '@/components/ui/card';

// 160. Admin Page - Setup
// 163. Admin Page - Stats Container

type Props = {
  title: string;
  value: number;
};

const StatsCard = ({ title, value }: Props) => {
  return (
    <Card>
      <CardHeader className={'flex flex-row justify-between items-center'}>
        <h3 className={'capitalize text-xl font-bold'}>{title}</h3>
        <span className={'text-primary text-5xl font-extrabold'}>{value}</span>
      </CardHeader>
    </Card>
  );
};

export default StatsCard;

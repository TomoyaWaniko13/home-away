'use client';

// 160. Admin Page - Setup
// 165. Admin Page - Chart Container

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartConfig = {
  count: { label: 'Bookings', color: '#2563eb' },
} satisfies ChartConfig;

type Props = {
  data: { date: string; count: number }[];
};

const Chart = ({ data }: Props) => {
  console.log(data);

  return (
    <section className={'mt-24'}>
      <h1 className={'text-4xl font-semibold text-center '}>Monthly Bookings</h1>
      <ChartContainer config={chartConfig} className='min-h-[200px] w-full mt-10'>
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey='date' tickLine={true} tickMargin={3} axisLine={true} />
          <YAxis allowDecimals={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey='count' fill='var(--color-count)' radius={4} />
        </BarChart>
      </ChartContainer>
    </section>
  );
};

export default Chart;

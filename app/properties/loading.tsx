import { Skeleton } from '@/components/ui/skeleton';

// 112. Property Details Page - Setup

const Loading = () => {
  return <Skeleton className={'h-[300px] md:h-[500px] w-full rounded'} />;
};

export default Loading;

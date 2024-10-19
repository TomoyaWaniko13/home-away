import { Skeleton } from '@/components/ui/skeleton';

// 150. Loading Table Component

type Props = {
  rows?: number;
};

const LoadingTable = ({ rows }: Props) => {
  const tableRows = Array.from({ length: rows || 5 }, (_, i) => {
    return (
      <div className={'mb-4'} key={i}>
        <Skeleton className={'w-full h-8 rounded'} />
      </div>
    );
  });

  return <>{tableRows}</>;
};

export default LoadingTable;

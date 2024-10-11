import { Button } from '@/components/ui/button';
import Link from 'next/link';

// 96. Home Page - Setup
// 98. Empty List

type Props = {
  heading?: string;
  message?: string;
  btnText?: string;
};

const EmptyList = ({ heading = 'No items in the list.', message = 'Keep exploring our properties.', btnText = 'back home' }: Props) => {
  return (
    <div>
      <h2 className={'text-xl font-bold'}>{heading}</h2>
      <p className={'text-lg'}>{message}</p>
      <Button asChild className={'mt-4 capitalize'} size={'lg'}>
        <Link href={'/'}>{btnText}</Link>
      </Button>
    </div>
  );
};

export default EmptyList;

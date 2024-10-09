import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

type Props = {
  title: string;
  content: ReactNode;
};

const CardWrapper = ({ title, content }: Props) => {
  return (
    <Card className={'max-w-4/5'}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default CardWrapper;

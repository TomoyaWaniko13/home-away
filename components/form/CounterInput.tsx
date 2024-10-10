'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LuMinus, LuPlus } from 'react-icons/lu';

// 92. Counter Input

type Props = {
  detail: string;
  defaultValue?: number;
};

const CounterInput = ({ detail, defaultValue }: Props) => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const decreaseCount = () => {
    setCount((prevState) => (prevState > 0 ? prevState - 1 : prevState));
  };

  return (
    <Card className={'flex flex-col sm:flex-row justify-between items-center'}>
      {/* input */}
      <input type='hidden' name={detail} value={count} />
      <CardHeader>
        <CardTitle>{detail}</CardTitle>
        <CardDescription>Specify the number of {detail}</CardDescription>
      </CardHeader>

      <CardContent className='flex gap-4 justify-center  items-center'>
        <Button variant='outline' size='icon' type='button' onClick={decreaseCount}>
          <LuMinus className='text-primary' />
        </Button>
        <span className='text-xl font-bold w-5 text-center'>{count}</span>
        <Button variant='outline' size='icon' type='button' onClick={increaseCount}>
          <LuPlus className='text-primary' />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CounterInput;

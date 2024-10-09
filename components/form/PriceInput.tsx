import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// 88. Price Input

type Props = {
  defaultValue?: number;
};

const PriceInput = ({ defaultValue }: Props) => {
  const name = 'price';

  return (
    <div>
      <Label htmlFor={name} className={'capitalize'}>
        Price ($)
      </Label>
      <Input id={name} type={'number'} name={name} min={0} defaultValue={defaultValue || 100} />
    </div>
  );
};

export default PriceInput;

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// 125. RatingInput Component

type Props = {
  name: string;
  labelText?: string;
};

const RatingInput = ({ name, labelText }: Props) => {
  const numbers = Array.from({ length: 5 }, (_, i) => {
    const value = i + 1;
    // <Select/> には string[] を渡すので toString() を使います。
    return value.toString();
  }).reverse();

  return (
    <div className={'mb-2 max-w-xs'}>
      <Label htmlFor={name} className={'capitalize'}>
        {labelText || name}
      </Label>
      <Select defaultValue={numbers[0]} name={name} required>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {numbers.map((number) => (
            <SelectItem key={number} value={number}>
              {number}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RatingInput;

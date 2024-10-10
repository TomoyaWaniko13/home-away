import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formattedCountries } from '@/utils/countries';

// 91. Countries Input

const name = 'country';

type Props = {
  defaultValue?: string;
};

const CountriesInput = ({ defaultValue }: Props) => {
  return (
    <div>
      <Label htmlFor={name} className={'capitalize'}>
        country
      </Label>
      <Select defaultValue={defaultValue || formattedCountries[0].code} name={name} required>
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {formattedCountries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <span className={'flex items-center gap-2'}>
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountriesInput;

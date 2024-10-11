import { findCountryByCode } from '@/utils/countries';

// 100. PropertyCard - Setup
// 104. Country Name and Flag

type Props = {
  countryCode: string;
};

const CountryFlagAndName = ({ countryCode }: Props) => {
  // foundCountry は undefined にならないとわかっているので、! を付け加えます。
  const foundCountry = findCountryByCode(countryCode)!;
  const countryName = foundCountry.name.length > 20 ? `${foundCountry.name.substring(0, 20)}...` : foundCountry.name;

  return (
    <span>
      {foundCountry.flag} {countryName}
    </span>
  );
};

export default CountryFlagAndName;

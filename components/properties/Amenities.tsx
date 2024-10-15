import { Amenity } from '@/utils/amenities';
import Title from '@/components/properties/Title';
import { LuFolderCheck } from 'react-icons/lu';

// 120. Amenities Component

type Props = {
  amenities: string;
};

const Amenities = ({ amenities }: Props) => {
  // <AmenitiesInput/> で JSON.stringify() を使ったので、ここでは JSON.parse() でオブジェクトに変換します。
  const amenitiesList: Amenity[] = JSON.parse(amenities as string);
  // amenity.selected がすべて false であれば、every() は true を return します。
  const noAmenitiesSelected = amenitiesList.every((amenity) => !amenity.selected);
  if (noAmenitiesSelected) return null;

  return (
    <div className={'mt-4'}>
      <Title text={'What this place offers'} />
      <div className={'grid md:grid-cols-2 gap-x-4'}>
        {amenitiesList.map((amenity) => {
          if (!amenity.selected) return null;
          return (
            <div key={amenity.name} className={'flex items-center gap-x-4 mb-2'}>
              <LuFolderCheck className={'h-6 w-6 text-primary'} />
              <span className={'font-light text-sm capitalize'}>{amenity.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Amenities;

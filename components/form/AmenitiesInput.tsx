'use client';
import { useState } from 'react';
import { amenities, Amenity } from '@/utils/amenities';
import { Checkbox } from '@/components/ui/checkbox';

// 93. Amenities Input
// 155. Amenities Input Gotcha

type Props = {
  defaultValue?: Amenity[];
};

function AmenitiesInput({ defaultValue }: Props) {
  const amenitiesWithIcons = defaultValue?.map(({ name, selected }) => {
    return { name, selected, icon: amenities.find((amenity) => amenity.name === name)!.icon };
  });

  const [amenitiesState, setAmenitiesState] = useState<Amenity[]>(amenitiesWithIcons || amenities);

  // 単一の amenity の選択状態を反転する関数
  const toggleAmenitySelection = (amenity: Amenity): Amenity => {
    return { ...amenity, selected: !amenity.selected };
  };

  //  currentAmenities 内の特定の amenity を更新する関数
  const updateAmenityInList = (amenitiesState: Amenity[], changedAmenity: Amenity): Amenity[] => {
    return amenitiesState.map((amenityState) => (amenityState.name === changedAmenity.name ? toggleAmenitySelection(amenityState) : amenityState));
  };

  // メインの関数
  const handleChange = (changedAmenity: Amenity) => {
    setAmenitiesState((amenitiesState) => updateAmenityInList(amenitiesState, changedAmenity));
  };

  return (
    <section>
      <input type='hidden' name='amenities' value={JSON.stringify(amenitiesState)} />
      <div className='grid grid-cols-2 gap-4'>
        {amenitiesState.map((amenityState) => (
          <div key={amenityState.name} className='flex items-center space-x-2'>
            <Checkbox id={amenityState.name} checked={amenityState.selected} onCheckedChange={() => handleChange(amenityState)} />
            <label htmlFor={amenityState.name} className='text-sm font-medium leading-none capitalize flex gap-x-2 items-center'>
              {amenityState.name}
              <amenityState.icon className='w-4 h-4' />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
export default AmenitiesInput;

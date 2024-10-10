'use client';
import { useState } from 'react';
import { amenities, Amenity } from '@/utils/amenities';
import { Checkbox } from '@/components/ui/checkbox';

// 93. Amenities Input

function AmenitiesInput({ defaultValue }: { defaultValue?: Amenity[] }) {
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(defaultValue || amenities);

  // 単一の amenity の選択状態を反転する関数
  const toggleAmenitySelection = (amenity: Amenity): Amenity => {
    return { ...amenity, selected: !amenity.selected };
  };

  //  currentAmenities 内の特定の currentAmenity を更新する関数
  const updateAmenityInList = (currentAmenities: Amenity[], amenityToUpdate: Amenity): Amenity[] => {
    return currentAmenities.map((currentAmenity) =>
      currentAmenity.name === amenityToUpdate.name ? toggleAmenitySelection(currentAmenity) : currentAmenity,
    );
  };

  // メインの関数
  const handleChange = (changedAmenity: Amenity) => {
    setSelectedAmenities((currentAmenities) => updateAmenityInList(currentAmenities, changedAmenity));
  };

  return (
    <section>
      <input type='hidden' name='amenities' value={JSON.stringify(selectedAmenities)} />
      <div className='grid grid-cols-2 gap-4'>
        {selectedAmenities.map((selectedAmenity) => (
          <div key={selectedAmenity.name} className='flex items-center space-x-2'>
            <Checkbox id={selectedAmenity.name} checked={selectedAmenity.selected} onCheckedChange={() => handleChange(selectedAmenity)} />
            <label htmlFor={selectedAmenity.name} className='text-sm font-medium leading-none capitalize flex gap-x-2 items-center'>
              {selectedAmenity.name}
              <selectedAmenity.icon className='w-4 h-4' />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
export default AmenitiesInput;

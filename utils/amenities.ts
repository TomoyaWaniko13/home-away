import { IconType } from 'react-icons';
import { FiAirplay, FiCloud, FiFeather, FiSun, FiSunrise, FiSunset, FiTrello } from 'react-icons/fi';
import { CiParking1 } from 'react-icons/ci';
import { FaFire } from 'react-icons/fa6';
import { MdOutlineBathroom, MdOutlineNightlightRound, MdOutlineOutdoorGrill, MdOutlineTableRestaurant } from 'react-icons/md';
import { TbAirConditioning } from 'react-icons/tb';
import { PiCookingPotBold, PiFirstAidKit, PiTowel } from 'react-icons/pi';
import { IoWaterOutline } from 'react-icons/io5';
import { CgBox } from 'react-icons/cg';
import { GiLanternFlame } from 'react-icons/gi';

// 93. Amenities Input

export type Amenity = {
  name: string;
  icon: IconType;
  selected: boolean;
};

export const amenities: Amenity[] = [
  { name: 'cloud storage', icon: FiCloud, selected: false },
  { name: 'parking', icon: CiParking1, selected: false },
  { name: 'fire pit', icon: FaFire, selected: false },
  { name: 'bbq grill', icon: MdOutlineOutdoorGrill, selected: false },
  { name: 'outdoor furniture', icon: FiSun, selected: false },
  { name: 'private bathroom', icon: MdOutlineBathroom, selected: false },
  { name: 'hot shower', icon: FiFeather, selected: false },
  { name: 'kitchenette', icon: FiAirplay, selected: false },
  { name: 'heating', icon: FiTrello, selected: false },
  { name: 'air conditioning', icon: TbAirConditioning, selected: false },
  { name: 'bed linens', icon: MdOutlineNightlightRound, selected: false },
  { name: 'towels', icon: PiTowel, selected: false },
  { name: 'picnic table', icon: MdOutlineTableRestaurant, selected: false },
  { name: 'hammock', icon: FiSunrise, selected: false },
  { name: 'solar power', icon: FiSunset, selected: false },
  { name: 'water supply', icon: IoWaterOutline, selected: false },
  { name: 'cooking utensils', icon: PiCookingPotBold, selected: false },
  { name: 'cool box', icon: CgBox, selected: false },
  { name: 'lanterns', icon: GiLanternFlame, selected: false },
  { name: 'first aid kit', icon: PiFirstAidKit, selected: false },
];

import { Booking } from '@/utils/types';
import { DateRange } from 'react-day-picker';
import { create } from 'zustand';

// 139. Zustand Library

// Define the state's shape
type PropertyState = {
  propertyId: string;
  price: number;
  // Booking は types.ts で定義されています。
  bookings: Booking[];
  range: DateRange | undefined;
};

// Create the store
export const useProperty = create<PropertyState>(() => {
  return { propertyId: '', price: 0, bookings: [], range: undefined };
});

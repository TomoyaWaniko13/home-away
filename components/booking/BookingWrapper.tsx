'use client';

import { Booking } from '@/utils/types';
import { useEffect } from 'react';
import { useProperty } from '@/utils/store';
import BookingCalendar from '@/components/booking/BookingCalendar';
import BookingContainer from '@/components/booking/BookingContainer';

// 138. Booking Components

type Props = {
  propertyId: string;
  price: number;
  bookings: Booking[];
};

const BookingWrapper = ({ propertyId, price, bookings }: Props) => {
  // TODO この useEffect の使い方は適切か?
  useEffect(() => {
    useProperty.setState({ propertyId, price, bookings });
  }, []);

  return (
    <div className={'mt-8 lg:mt-0'}>
      <h2 className={'font-bold text-lg text-center'}>Booking</h2>
      <BookingCalendar />
      <BookingContainer />
    </div>
  );
};

export default BookingWrapper;

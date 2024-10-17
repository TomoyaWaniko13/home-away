'use client';

import { Booking } from '@/utils/types';
import { useEffect } from 'react';
import { useProperty } from '@/utils/store';
import BookingCalendar from '@/components/booking/BookingCalendar';

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
    <>
      <BookingCalendar />
      <BookingCalendar />
    </>
  );
};

export default BookingWrapper;

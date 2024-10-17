'use client';

import { useProperty } from '@/utils/store';
import BookingForm from '@/components/booking/BookingForm';
import ConfirmBooking from '@/components/booking/ConfirmBooking';

// 138. Booking Components

const BookingContainer = () => {
  const state = useProperty((state) => state);
  console.log(state);

  return (
    <div className={'w-full'}>
      <BookingForm />
      <ConfirmBooking />
    </div>
  );
};

export default BookingContainer;

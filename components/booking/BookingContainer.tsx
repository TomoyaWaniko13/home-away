'use client';

import { useProperty } from '@/utils/store';
import BookingForm from '@/components/booking/BookingForm';
import ConfirmBooking from '@/components/booking/ConfirmBooking';

// 138. Booking Components
// 140. Booking Container / Calendar - Initial Setup
// 141. Calculate Totals

const BookingContainer = () => {
  const { range } = useProperty((state) => state); // state にアクセスするためにコールバック関数を渡します。

  if (!range || !range.from || !range.to) return null;
  if (range.to.getTime() === range.from.getTime()) return null;

  return (
    <div className={'w-full'}>
      <BookingForm />
      <ConfirmBooking />
    </div>
  );
};

export default BookingContainer;

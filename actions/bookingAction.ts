'use server';

import { getAuthUser } from '@/actions/profileAction';
import db from '@/utils/db';
import { calculateTotals } from '@/utils/calculateTotals';
import { renderError } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// 143. Confirm Booking Component
// 144. Create Booking Action
export const createBookingAction = async (prevState: { propertyId: string; checkIn: Date; checkOut: Date }) => {
  const user = await getAuthUser();
  const { propertyId, checkIn, checkOut } = prevState;

  // フロントエンドから(引数として)物件の価格を取得するのではなく、バックエンド(データベース)から物件の価格をを取得します。
  const property = await db.property.findUnique({
    where: { id: propertyId },
    select: { price: true },
  });

  if (!property) return { message: 'Property not found' };

  const { orderTotal, totalNights } = calculateTotals({ checkIn, checkOut, price: property.price });

  try {
    const booking = await db.booking.create({
      data: { orderTotal, totalNights, checkIn, checkOut, profileId: user.id, propertyId },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect('/bookings');
};

// 147. Fetch Bookings and Delete Booking
export const fetchBookings = async () => {
  const user = await getAuthUser();

  const bookings = await db.booking.findMany({
    where: { profileId: user.id },
    include: { property: { select: { id: true, name: true, country: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return bookings;
};

// 147. Fetch Bookings and Delete Booking
export const deleteBookingAction = async (prevState: { bookingId: string }) => {
  const { bookingId } = prevState;
  const user = await getAuthUser();

  try {
    const result = await db.booking.delete({
      // TODO なぜ id: bookingId と profileId: user.id の両方が必要?
      where: { id: bookingId, profileId: user.id },
    });

    revalidatePath('/bookings');
    return { message: 'Booking deleted successfully' };
  } catch (error) {
    renderError(error);
  }
};

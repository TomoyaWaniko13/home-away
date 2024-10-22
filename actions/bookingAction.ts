'use server';

import { getAuthUser } from '@/actions/profileAction';
import db from '@/utils/db';
import { calculateTotals } from '@/utils/calculateTotals';
import { renderError } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// 143. Confirm Booking Component
// 144. Create Booking Action
// 166. Stripe - Setup
// データベース側で価格を取得するので、propertyId を渡します。
export const createBookingAction = async (prevState: { propertyId: string; checkIn: Date; checkOut: Date }) => {
  const user = await getAuthUser();
  let bookingId: null | string = null;

  // データベースから物件の価格を取得するために、propertyId が必要です。
  const { propertyId, checkIn, checkOut } = prevState;

  // フロントエンドから(引数で)物件の価格を取得するのではなく、バックエンド(データベース)から物件の価格を取得します。
  const property: { price: number } | null = await db.property.findUnique({
    where: { id: propertyId },
    select: { price: true },
  });

  if (!property) return { message: 'Property not found' };

  const { orderTotal, totalNights } = calculateTotals({ checkIn, checkOut, price: property.price });

  try {
    const booking = await db.booking.create({
      data: { checkIn, checkOut, totalNights, orderTotal, profileId: user.id, propertyId },
    });

    bookingId = booking.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/checkout?bookingId=${bookingId}`);
};

// 147. Fetch Bookings and Delete Booking
// 現在のユーザーの bookings を取得します。
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
// 149. Delete Booking
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
    return renderError(error);
  }
};

// 158. Fetch Reservations
// 現在のユーザーの properties に対しての bookings を 取得します。
export const fetchReservations = async () => {
  const user = await getAuthUser();

  const reservations = await db.booking.findMany({
    where: { property: { profileId: user.id } },
    orderBy: { createdAt: 'desc' },
    include: { property: { select: { id: true, name: true, price: true, country: true } } },
  });

  return reservations;
};

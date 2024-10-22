import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';
import db from '@/utils/db';

// 169. Stripe - Confirm Route

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get('session_id') as string;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    // console.log(session);

    const bookingId = session.metadata?.bookingId;
    if (session.status === 'complete' && bookingId) {
      await db.booking.update({ where: { id: bookingId }, data: { paymentStatus: true } });
    }
  } catch (err) {
    console.log(err);
    return Response.json(null, { status: 500, statusText: 'Internal Server Error' });
  }
  redirect('/bookings');
};

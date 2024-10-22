import Stripe from 'stripe';
import { type NextRequest, type NextResponse } from 'next/server';
import db from '@/utils/db';
import { formatDate } from '@/utils/format';

// 168. Stripe - Payment Route

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = async (req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers);
  // リクエストの送信元（オリジン）のURLを取得します。これは通常、https://example.comのような形式です。
  // 支払い完了後のリダイレクト先URLを動的に生成知るために使われます。
  const origin = requestHeaders.get('origin');

  const { bookingId } = await req.json();

  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    include: { property: { select: { name: true, image: true } } },
  });

  if (!booking) return Response.json(null, { status: 404, statusText: 'Not Found' });

  const {
    totalNights,
    orderTotal,
    checkIn,
    checkOut,
    property: { image, name },
  } = booking;

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded', // embedded: ウェブサイトに埋め込み形式で表示
      metadata: { bookingId: booking.id }, // 追加情報を保存するための場所 支払い完了後に予約情報と紐付けるために使用
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of
          // the product you want to sell
          quantity: 1,
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${name}`,
              images: [image],
              description: `Stay in this wonderful place for ${totalNights} nights, from ${formatDate(checkIn)} to ${formatDate(checkOut)}. Enjoy your stay!`,
            },
            unit_amount: orderTotal * 100,
          },
        },
      ],
      mode: 'payment', // 一回限りの支払い
      // 支払い完了後にリダイレクトするURL
      // {CHECKOUT_SESSION_ID}: Stripeが自動的に置き換えるセッションID
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);
    return Response.json(null, { status: 500, statusText: 'Internal Server Error' });
  }
};

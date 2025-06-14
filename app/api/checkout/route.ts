import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { CheckoutItem } from '@/types/Types';
import { saveOrderToSanity } from '@/lib/orderUtils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil'
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items = body.items;
    await saveOrderToSanity(items);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: body.items.map((item: CheckoutItem) => ({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.name
          },
          unit_amount: Math.round(item.price * 100)
        },
        quantity: item.quantity
      })),
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

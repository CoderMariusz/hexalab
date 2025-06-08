// app/api/get-orders/route.ts

import { NextResponse } from 'next/server';
import { fetchOrdersByEmail } from '@/lib/queries';

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    const orders = await fetchOrdersByEmail(email);
    return NextResponse.json({ orders });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

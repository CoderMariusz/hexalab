import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanityClient';

export async function POST(req: Request) {
  const data = await req.json();

  try {
    await sanityClient.create({
      _type: 'order',
      userEmail: data.userEmail,
      total: data.total,
      items: data.items,
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

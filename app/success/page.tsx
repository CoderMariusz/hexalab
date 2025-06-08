'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart(); // Czyścimy koszyk po udanym zakupie
  }, []);

  return (
    <main className='max-w-2xl mx-auto px-4 py-16 text-center'>
      <h1 className='text-3xl font-bold mb-4 text-green-600'>
        Thank you for your purchase!
      </h1>
      <p className='mb-6 text-gray-700'>
        Your order has been successfully processed. You&#39;ll receive an email
        confirmation shortly.
      </p>

      <Link href='/products'>
        <button className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'>
          Continue Shopping
        </button>
      </Link>
    </main>
  );
}

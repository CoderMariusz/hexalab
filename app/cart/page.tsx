'use client';

import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const handleCheckout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart })
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <div className='p-10 text-center text-xl'>Your cart is empty.</div>;
  }

  return (
    <main className='max-w-5xl mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold mb-6'>Your Cart</h1>

      <ul className='space-y-6'>
        {cart.map((item) => (
          <li
            key={item.id}
            className='flex items-center gap-4 border-b pb-4'>
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={80}
              className='rounded-md object-cover'
            />
            <div className='flex-1'>
              <h2 className='font-semibold text-lg'>{item.name}</h2>
              <p className='text-sm text-gray-600'>
                £{item.price.toFixed(2)} x {item.quantity}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className='text-red-600 hover:underline text-sm'>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className='mt-10 text-right'>
        <p className='text-xl font-semibold mb-4'>Total: £{total.toFixed(2)}</p>
        <p className='text-sm text-gray-600 mb-6'>
          Shipping and taxes calculated at checkout.
        </p>
        <button
          onClick={handleCheckout}
          className='bg-blue-300 text-white px-6 py-2 rounded hover:bg-blue-700 transition'>
          Proceed to Checkout
        </button>
      </div>
    </main>
  );
}

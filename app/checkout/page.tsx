'use client';

import { useCart } from '@/app/context/CartContext';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address) return alert('Please fill in all fields');
    setSubmitted(true);
    clearCart(); // czyścimy koszyk po "wysłaniu"
  };

  if (cart.length === 0 && !submitted) {
    return <p className='p-10 text-center text-xl'>Your cart is empty.</p>;
  }

  if (submitted) {
    return (
      <div className='max-w-xl mx-auto py-16 text-center'>
        <h2 className='text-2xl font-semibold mb-4'>Thank you, {name}!</h2>
        <p className='text-gray-600'>
          Your order has been received. We&#39;ll be in touch via email.
        </p>
      </div>
    );
  }

  return (
    <main className='max-w-4xl mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold mb-6'>Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className='grid md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <input
            type='text'
            placeholder='Full Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded'
            required
          />
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded'
            required
          />
          <textarea
            placeholder='Shipping Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded'
            rows={4}
            required
          />
          <button
            type='submit'
            className='bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded transition'>
            Confirm Order
          </button>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
          <ul className='space-y-2'>
            {cart.map((item) => (
              <li
                key={item.id}
                className='flex justify-between'>
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>£{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className='mt-4 text-lg font-semibold'>
            Total: <span className='text-blue-600'>£{total.toFixed(2)}</span>
          </p>
        </div>
      </form>
    </main>
  );
}

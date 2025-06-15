'use client';

import Link from 'next/link';
import { ShoppingCart, UserRound, UserRoundCheck } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { data: session } = useSession();
  const { cart } = useCart();
  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header className='shadow-sm'>
      {/* Górna linia */}
      <div className='bg-white px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between max-w-7xl mx-auto'>
        {/* Logo */}
        <Link
          href='/'
          className='text-2xl font-bold text-primary tracking-tight'>
          HexaLab
        </Link>

        {/* Wyszukiwarka */}
        <div className='flex-1 mx-6 max-w-md'>
          <input
            type='text'
            placeholder='Search products...'
            className='w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary'
          />
        </div>

        {session ? (
          <div className='ml-6 h-full flex items-center gap-6'>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className='text-red-600 hover:underline'>
              <UserRoundCheck className='inline-block mr-1 w-5 h-5' />
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn('google', { callbackUrl: '/login' })}
            className='text-blue-600 hover:underline'>
            <UserRound className='inline-block mr-1 w-5 h-5' />
          </button>
        )}

        {/* Koszyk */}
        <Link
          href='/cart'
          className='relative'>
          <ShoppingCart className='w-6 h-6 text-gray-700 hover:text-primary' />
          {totalQty > 0 && (
            <span className='absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full px-1.5'>
              {totalQty}
            </span>
          )}
        </Link>
      </div>

      {/* Dolna linia */}
    </header>
  );
}

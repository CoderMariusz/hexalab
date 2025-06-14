'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { data: session } = useSession();
  const { cart } = useCart();
  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header className='w-full border-b shadow-sm'>
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
      <nav className='bg-blue-400 text-blue-900 text-sm font-medium flex justify-center align-middle'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-6 py-2 items-center justify-between'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-6 py-2'>
            <Link
              href='/products'
              className='hover:underline hover:text-blue-200 transition-colors'>
              Products
            </Link>
            <Link
              href='/contact'
              className='hover:underline'>
              Contact
            </Link>
            <Link
              href='/about'
              className='hover:underline'>
              About
            </Link>
          </div>
          {session ? (
            <>
              <Link
                href='/orders'
                className='hover:underline'>
                Orders
              </Link>
              <Link
                href='/profile'
                className='hover:underline'>
                Profile
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className='text-red-600 hover:underline'>
                Log out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn('google', { callbackUrl: '/login' })}
              className='text-blue-600 hover:underline'>
              Log in
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function Navbar() {
  return (
    <header className='w-full border-b bg-white shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between'>
        {/* Logo */}
        <Link
          href='/'
          className='text-2xl font-bold text-blue-600 tracking-tight'>
          HexaLab
        </Link>

        {/* Navigation */}
        <nav className='hidden md:flex space-x-6 font-medium text-gray-700'>
          <Link
            href='/products'
            className='hover:text-blue-600'>
            Products
          </Link>
          <Link
            href='/contact'
            className='hover:text-blue-600'>
            Contact
          </Link>
          <Link
            href='/about'
            className='hover:text-blue-600'>
            About
          </Link>
        </nav>

        {/* Cart button */}
        <Link
          href='/cart'
          className='relative flex items-center'>
          <ShoppingCart className='w-6 h-6 text-gray-700 hover:text-blue-600' />
          <span className='absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full px-1.5'>
            0
          </span>
        </Link>
      </div>
    </header>
  );
}

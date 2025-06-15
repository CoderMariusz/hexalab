'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export default function Nav() {
  const { data: session } = useSession();

  return (
    <nav className='sticky top-0 z-50 bg-blue-100 text-blue-900/90 uppercase font-bold text-[18px] flex justify-center align-middle'>
      <div className='w-full m-auto'>
        <div className='flex items-center justify-center max-w-7xl h-14 mx-auto px-4 sm:px-6 lg:px-8 '>
          <div className='h-full flex items-center gap-6'>
            <Link
              href='/products'
              className=' px-2 h-full flex items-center justify-center hover:bg-blue-200 transition-all'>
              Products
            </Link>
            <Link
              href='/contact'
              className=' px-2 h-full flex items-center justify-center hover:bg-blue-200 transition-all'>
              Contact
            </Link>
            <Link
              href='/about'
              className=' px-2 h-full flex items-center justify-center hover:bg-blue-200 transition-all'>
              About
            </Link>
            {session ? (
              <div className='h-full flex items-center gap-6'>
                <Link
                  href='/orders'
                  className='  px-2 h-full flex items-center justify-center hover:bg-blue-200 transition-all'>
                  Orders
                </Link>
                <Link
                  href='/profile'
                  className=' px-2 h-full flex items-center justify-center hover:bg-blue-200 transition-all'>
                  Profile
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}

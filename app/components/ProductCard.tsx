'use client';

import Image from 'next/image';
import Link from 'next/link';

type ProductCardProps = {
  id: string;
  name: string;
  image: string;
  price: number;
};

export default function ProductCard({
  id,
  name,
  image,
  price
}: ProductCardProps) {
  return (
    <Link
      href={`/product/${id}`}
      className='group border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition'>
      <div className='relative w-full aspect-square bg-gray-100'>
        <Image
          src={image}
          alt={name}
          fill
          className='object-cover group-hover:scale-105 transition-transform duration-300'
        />
      </div>

      <div className='p-4'>
        <h3 className='text-lg font-semibold text-gray-900 group-hover:text-blue-600'>
          {name}
        </h3>
        <p className='text-blue-600 font-bold mt-1'>£{price.toFixed(2)}</p>
      </div>
    </Link>
  );
}

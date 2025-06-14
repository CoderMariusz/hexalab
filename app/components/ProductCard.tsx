'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

export type ProductCardProps = {
  _id: string;
  name: string;
  image?: string;
  price: number;
  slug?: string;
  description?: string;
  category?: string;
  topSeller: boolean;
};

export default function ProductCard({
  _id,
  name,
  image,
  price
}: ProductCardProps) {
  const { addToCart } = useCart();

  console.log('Rendering ProductCard:', image, name, price);

  return (
    <div className='group m-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition'>
      <Link
        href={`/product/${_id}`}
        className='block'>
        <div className='relative w-full aspect-square bg-gray-100'>
          <Image
            src={image ?? '/placeholder.png'}
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

      <button
        onClick={() =>
          addToCart({ id: _id, name, price, image: image ?? '', quantity: 1 })
        }
        className='w-full bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 font-medium transition'>
        Add to Basket
      </button>
    </div>
  );
}

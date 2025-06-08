'use client';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { useParams } from 'next/navigation';
import { dummyProducts } from '@/data/dummyProducts';

export default function ProductPage() {
  const params = useParams(); // useParams is synchronous in client components

  const slug = params.slug;
  const { addToCart } = useCart();
  console.log('Product slug:', slug);

  const product = dummyProducts.find((p) => p.id === slug);
  console.log('Found product:', product);
  if (!product) return notFound();

  return (
    <main className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='grid md:grid-cols-2 gap-12 items-start'>
        {/* Obraz */}
        <div className='relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden'>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className='object-cover'
          />
        </div>

        {/* Dane produktu */}
        <div>
          <h1 className='text-3xl font-bold text-gray-900 mb-4'>
            {product.name}
          </h1>
          <p className='text-xl text-blue-600 font-semibold mb-6'>
            £{product.price.toFixed(2)}
          </p>

          <p className='text-gray-700 leading-relaxed mb-8'>
            {product.description}
          </p>

          <button
            className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition'
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity: 1
              })
            }>
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}

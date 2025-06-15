'use client';

import { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import ProductCard, { ProductCardProps } from './ProductCard';
import { sanityClient } from '@/lib/sanityClient';
import { productsQuery } from '@/lib/queries';

export default function TopProducts() {
  const [topProducts, setTopProducts] = useState<ProductCardProps[]>([]);

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 3, spacing: 16 },
    breakpoints: {
      '(max-width: 768px)': {
        slides: { perView: 1.2, spacing: 12 }
      },
      '(max-width: 1024px)': {
        slides: { perView: 2, spacing: 16 }
      }
    },
    created(slider) {
      setInterval(() => slider.next(), 3000);
    }
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await sanityClient.fetch(productsQuery);
      console.log('Fetched products:', data);
      const topProducts = data.filter(
        (product: ProductCardProps) => product.topSeller === true
      );
      setTopProducts(topProducts);
      console.log('Fetched products:', topProducts);
    };
    fetchProducts();
  }, []);

  if (topProducts.length === 0) {
    return (
      <p className='text-center text-gray-500'>No top products available</p>
    );
  }

  return (
    <section className='flex flex-col items-center justify-center w-full mb-12'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Top Products</h2>

      <div
        ref={sliderRef}
        className='keen-slider w-full max-w-6xl px-4 sm:px-6 lg:px-8'>
        {topProducts.map((product) => (
          <div
            className='keen-slider__slide px-2'
            key={product._id}>
            <ProductCard
              key={product._id}
              _id={product._id}
              slug={product.slug}
              name={product.name}
              category={product.category}
              price={product.price}
              image={product.image}
              description={product.description}
              topSeller={product.topSeller || false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import FilterBar from '@/app/components/FilterBar';
import { sanityClient } from '@/lib/sanityClient';
import { productsQuery } from '@/lib/queries';
import ProductCard from '@/app/components/ProductCard';
import { ProductType } from '@/types/Types';

import { useEffect } from 'react';

export default function ProductsPage() {
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(100);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await sanityClient.fetch(productsQuery);
      setProducts(data);
    };
    fetchProducts();
    console.log('Fetched products:', products);
  }, []);

  console.log('Fetched products:', products);

  const filtered = products.filter((product) => {
    const matchCategory = category ? product.category === category : true;
    const matchPrice = product.price <= maxPrice;
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchCategory && matchPrice && matchSearch;
  });

  return (
    <main className='max-w-6xl mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold mb-6'>Products</h1>
      <FilterBar
        onCategoryChange={setCategory}
        onPriceChange={setMaxPrice}
        onSearchChange={setSearch}
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {filtered.map((product: ProductType) => (
          <ProductCard
            key={product._id}
            _id={product._id}
            name={product.name}
            category={product.category}
            price={product.price}
            image={product.image}
            description={product.description}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className='mt-8 text-center text-gray-500'>
          No products found matching your criteria.
        </p>
      )}
    </main>
  );
}

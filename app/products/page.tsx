'use client';

import { useState } from 'react';
import FilterBar from '@/app/components/FilterBar';
import { dummyProducts } from '@/data/dummyProducts';
import ProductCard from '@/app/components/ProductCard';

export default function ProductsPage() {
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(100);
  const [search, setSearch] = useState('');

  const filtered = dummyProducts.filter((product) => {
    const matchCategory = category ? product.category === category : true;
    const matchPrice = product.price <= maxPrice;
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchCategory && matchPrice && matchSearch;
  });

  return (
    <main className='max-w-6xl mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold mb-4'>Products</h1>

      <FilterBar
        onCategoryChange={setCategory}
        onPriceChange={setMaxPrice}
        onSearchChange={setSearch}
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            description={product.description}
            category={product.category}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className='mt-10 text-gray-600 text-center'>
          No products found matching the filters.
        </p>
      )}
    </main>
  );
}

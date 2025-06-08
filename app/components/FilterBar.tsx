'use client';

import { useState } from 'react';

type FilterProps = {
  onCategoryChange: (value: string) => void;
  onPriceChange: (value: number) => void;
  onSearchChange: (value: string) => void;
};

export default function FilterBar({
  onCategoryChange,
  onPriceChange,
  onSearchChange
}: FilterProps) {
  const [maxPrice, setMaxPrice] = useState(100);

  return (
    <div className='flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-blue-100 rounded-md mb-6'>
      <select
        onChange={(e) => onCategoryChange(e.target.value)}
        className='p-2 rounded border border-gray-300'>
        <option value=''>All Categories</option>
        <option value='Peptide'>Peptides</option>
        <option value='SARM'>SARMs</option>
        <option value='HGH'>HGH</option>
      </select>

      <input
        type='number'
        value={maxPrice}
        onChange={(e) => {
          const val = Number(e.target.value);
          setMaxPrice(val);
          onPriceChange(val);
        }}
        className='p-2 rounded border border-gray-300'
        placeholder='Max Price'
      />

      <input
        type='text'
        onChange={(e) => onSearchChange(e.target.value)}
        className='p-2 rounded border border-gray-300 w-full md:w-1/3'
        placeholder='Search products...'
      />
    </div>
  );
}

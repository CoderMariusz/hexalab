import ProductCard from '@/app/components/ProductCard';

const dummyProducts = [
  {
    id: 'ghrp-6',
    name: 'GHRP-6 Peptide',
    image: '/products/b157.jpg',
    price: 29.99
  },
  {
    id: 'cjc-1295',
    name: 'CJC-1295 DAC',
    image: '/products/b157.jpg',
    price: 34.99
  },
  {
    id: 'bpc-157',
    name: 'BPC-157',
    image: '/products/b157.jpg',
    price: 39.99
  }
];

export default function HomePage() {
  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <section className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-blue-600'>HexaLab Peptides</h1>
        <p className='mt-2 text-gray-600'>
          UK-based | Research use only | Made for serious performance
        </p>
      </section>

      <section>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
          Best Sellers
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {dummyProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

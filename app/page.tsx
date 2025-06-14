import ReassuranceSlider from './components/ReassuranceSlider';
import TopProducts from './components/TopProduct';

export default function HomePage() {
  return (
    <main className=''>
      <section className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-blue-600'>HexaLab Peptides</h1>
        <p className='mt-2 text-gray-600'>
          UK-based | Research use only | Made for serious performance
        </p>
      </section>
      <div className='mx-auto px-4 bg-blue-200/30 shadow-lg'>
        <ReassuranceSlider />
      </div>

      <section>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
          Best Sellers
        </h2>

        <TopProducts />
      </section>
    </main>
  );
}

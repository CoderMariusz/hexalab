import HeroSlider from './components/HeroSlider';
import InfoSection from './components/InfoSection';
import ReassuranceSlider from './components/ReassuranceSlider';
import TopProducts from './components/TopProduct';

export default function HomePage() {
  return (
    <main className=''>
      <section className='relative bg-gradient-to-r from-blue-50 to-white py-12 text-center mb-6 shadow-sm'>
        <div className='max-w-2xl mx-auto px-4'>
          <h1 className='text-5xl font-extrabold text-blue-800 tracking-tight mb-4'>
            HexaLab Peptides
          </h1>
          <p className='text-lg text-gray-700 font-medium'>
            🇬🇧 UK-based | Research use only | Built for serious performance
          </p>
          <div className='mt-6 flex justify-center gap-4'>
            <button className='bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition'>
              Shop Now
            </button>
            <button className='border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition'>
              Learn More
            </button>
          </div>
        </div>
      </section>

      <HeroSlider />
      <div className='mx-auto px-4 bg-blue-200/30 shadow-lg'>
        <ReassuranceSlider />
      </div>

      <section>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
          Best Sellers
        </h2>

        <TopProducts />
      </section>
      <InfoSection />
    </main>
  );
}

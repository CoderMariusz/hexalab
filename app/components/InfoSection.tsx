import Image from 'next/image';
import Img1 from '@/public/Delivery_1.jpeg';
import img2 from '@/public/Zasob_20.png';

export default function InfoSection() {
  return (
    <section className='flex flex-col max-w-full mx-auto px-4 py-0 bg-blue-200/20 my-24'>
      {/* International Shipping */}
      <div className=' max-w-4xl mx-auto relative'>
        <div className='  grid md:grid-cols-2 items-center gap-2 absolute'>
          <div className='aspect-square w-[200px] h-[200px] relative top-[-50px]'>
            <Image
              src={Img1}
              fill={true}
              alt='International shipping'
              className='rounded-full object-cover hover:scale-105 transition-transform duration-300'
            />
          </div>
          <div>
            <h3 className='text-xl font-bold text-blue-800 mb-2'>
              International Shipping
            </h3>
            <p className='text-sm text-gray-700'>
              We ship our products to many countries around the world. We have
              launched international payments that allow you to make a quick
              transfer. Thanks to this, we pack and ship your orders the next
              day!
            </p>
          </div>
        </div>

        {/* Multi-purchase Promotion */}
        <div className='grid md:grid-cols-2 items-center gap-28 '>
          <div className=' max-w-sm flex flex-col justify-center gap-4 pt-36'>
            <h3 className='text-xl font-bold text-blue-800 mb-2'>
              Multi-purchase promotion!
            </h3>
            <p className='text-sm text-gray-700'>
              We know perfectly well that your orders rarely concern single
              products! That’s why we’ve launched automatic discounts for 3 or 5
              items in your cart — enjoy your extra savings!
            </p>
          </div>
          <div className='aspect-square flex items-end-safe justify-center relative top-[50px] right-[-50px]'>
            <Image
              src={img2}
              alt='Multi-purchase Promotion'
              width={250}
              height={250}
              className='rounded-full object-contain hover:scale-105 transition-transform duration-300'
            />
          </div>
        </div>
      </div>
    </section>
  );
}

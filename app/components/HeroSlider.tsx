// components/HeroSlider.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Image from 'next/image';
import image1 from '@/public/hero1.jpg';
import image2 from '@/public/hero2.jpg';
import image3 from '@/public/hero3.jpg';
import Link from 'next/link';

const slides = [
  { src: image1, alt: 'Hero 1', link: '/' },
  { src: image2, alt: 'Hero 2', link: '/products' },
  { src: image3, alt: 'Hero 3', link: '/' }
];

export default function HeroSlider() {
  return (
    <div className='w-full h-[40vh] relative'>
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect='fade'
        autoplay={{ delay: 4000 }}
        loop
        className='w-full h-full'>
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link href={slide.link}>
              <div className='relative w-full h-full'>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className='object-fill'
                  priority={index === 0}
                />
                <div className='absolute inset-0 bg-black/30' />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

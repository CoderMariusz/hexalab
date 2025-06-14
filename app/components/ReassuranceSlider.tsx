'use client';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import image1 from './sliderSVG/document.svg';
import image2 from './sliderSVG/hands.svg';
import image3 from './sliderSVG/pill_bottle.svg';
import image4 from './sliderSVG/target.svg';

const items = [
  {
    img: image1,
    text: 'Products tailored to your goals'
  },
  {
    img: image2,
    text: 'Over 400 products on offer'
  },
  {
    img: image3,
    text: 'Specialized support'
  },
  {
    img: image4,
    text: 'The highest quality based on research'
  }
];

// Autoplay plugin
import type { KeenSliderInstance } from 'keen-slider/react';

function AutoplayPlugin(slider: KeenSliderInstance) {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }

  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 3000);
  }

  slider.on('created', () => {
    slider.container.addEventListener('mouseover', () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener('mouseout', () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });

  slider.on('dragStarted', clearNextTimeout);
  slider.on('animationEnded', nextTimeout);
  slider.on('updated', nextTimeout);
}

export default function ReassuranceSlider() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: {
        perView: 1,
        spacing: 15
      },
      breakpoints: {
        '(min-width: 640px)': {
          slides: { perView: 2, spacing: 15 }
        },
        '(min-width: 1024px)': {
          slides: { perView: 3, spacing: 30 }
        }
      }
    },
    [AutoplayPlugin]
  );

  return (
    <div
      ref={sliderRef}
      className='keen-slider py-6'>
      {items.map((item, index) => (
        <div
          key={index}
          className='keen-slider__slide bg-white rounded-lg flex gap-3 items-center justify-center p-4 text-center shadow-sm'>
          <div className='mb-4'>
            <Image
              src={item.img}
              alt={item.text}
              width={60}
              height={60}
            />
          </div>
          <p className='text-blue-700 font-medium text-sm'>{item.text}</p>
        </div>
      ))}
    </div>
  );
}

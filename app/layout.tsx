// app/layout.tsx

import './globals.css';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { CartProvider } from '@/app/context/CartContext';

// app/layout.tsx
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HexaLab',
  description: 'Your UK source for premium research peptides.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={inter.className}>
      <body className='bg-white text-gray-900 dark:bg-gray-900 dark:text-white font-sans'>
        <CartProvider>
          {children}
          <Footer />
        </CartProvider>
        <Navbar />
      </body>
    </html>
  );
}

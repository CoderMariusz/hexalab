'use client';

import { productsQuery } from '@/lib/queries';
import { sanityClient } from '@/lib/sanityClient';
import { ProductType } from '@/types/Types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [product, setProduct] = useState<ProductType | null>(null);

  const p: ProductType | undefined = products.find(
    (p: ProductType) => p._id === pathname.split('/').pop()
  );
  useEffect(() => {
    if (p) {
      setProduct(p);
      console.log('Found product:', p);
    } else {
      console.log('No product found for current path');
    }
  }, [p]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await sanityClient.fetch(productsQuery);
      setProducts(data);
    };
    fetchProducts();
    console.log('Fetched products:', products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pathParts = pathname.split('/').filter(Boolean);

  const crumbs = pathParts.map((part, index) => {
    const href = '/' + pathParts.slice(0, index + 1).join('/');
    console.log(`Part: ${part}, Href: ${href}`); // Debugging line
    const label = decodeURIComponent(part).replace(/-/g, ' ');
    const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1);

    return {
      label: capitalizedLabel,
      href
    };
  });

  return (
    <nav
      aria-label='Breadcrumb'
      className='text-sm text-gray-600 my-4'>
      <ol className='flex space-x-1'>
        <li>
          <Link
            href='/'
            className='hover:underline text-blue-600'>
            Home
          </Link>
          <span className='mx-1'>/</span>
        </li>

        {crumbs.map((crumb, i) => (
          <li
            key={crumb.href}
            className='flex items-center'>
            {i < crumbs.length - 1 ? (
              <>
                {crumb.href === '/product' ? (
                  <span className='text-gray-900'>Product / </span>
                ) : (
                  <>
                    <Link
                      href={crumb.href}
                      className='hover:underline text-blue-600'>
                      {crumb.label}
                    </Link>
                    <span className='mx-1'>/</span>
                  </>
                )}
              </>
            ) : (
              <span className='text-gray-900'>
                {product ? product.name : crumbs[crumbs.length - 1].label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

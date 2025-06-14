import { sanityClient } from './sanityClient';

export const productsQuery = `*[_type == "product"]{
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  "image": image.asset->url,
  category,
  topSeller
}`;

export async function fetchOrdersByEmail(email: string) {
  const query = `*[_type == "order" && userEmail == $email] | order(createdAt desc) {
    _id,
    userEmail,
    total,
    createdAt,
    items
  }`;

  const orders = await sanityClient.fetch(query, { email });
  return orders;
}

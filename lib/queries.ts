export const productsQuery = `*[_type == "product"]{
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  "image": image.asset->url,
  category
}`;

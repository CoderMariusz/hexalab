export interface ProductType {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
}

export interface CheckoutItem {
  name: string;
  price: number;
  quantity: number;
}

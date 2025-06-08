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

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  createdAt: string | Date;
  items: OrderItem[];
  total: number;
  userEmail?: string;
  status?: 'Order' | 'Paid' | 'Canceled';
}

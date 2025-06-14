import { sanityClient } from './sanityClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export const saveOrderToSanity = async (cart: CartItem[]) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error('User not authenticated');

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const orderDoc = {
    _type: 'order',
    userEmail: session.user.email,
    items: cart.map((item) => ({
      _key: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      productId: item.id
    })),
    total,
    Status: 'Order',
    createdAt: new Date().toISOString()
  };

  const result = await sanityClient.create(orderDoc);
  return result;
};

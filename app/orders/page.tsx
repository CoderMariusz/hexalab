import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { fetchOrdersByEmail } from '@/lib/queries';
import { OrderItem, Order } from '@/types/Types';

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect('/login');
  }

  const orders: Order[] = await fetchOrdersByEmail(session.user.email);

  console.log('Fetched orders:', orders);

  return (
    <main className='max-w-4xl mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold mb-6'>Your Orders</h1>

      {orders.length === 0 ? (
        <p className='text-gray-600'>
          No orders found for {session.user.email}
        </p>
      ) : (
        <ul className='space-y-6'>
          {orders.map((order: Order) => (
            <div key={order._id}>
              <li className='border p-4 rounded-md shadow-sm bg-white dark:bg-gray-800'>
                <p className='text-sm text-gray-500'>
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <ul className='mt-2 space-y-1'>
                  {order.items.map((item: OrderItem, index: number) => {
                    console.log('Order item:', item.price);

                    return (
                      <li
                        key={index}
                        className='text-sm'>
                        {item.name} × {item.quantity} – £
                        {item?.price?.toFixed?.(2) ?? 'N/A'}
                      </li>
                    );
                  })}
                </ul>
                <p className='mt-2 font-semibold'>
                  Total: £{order?.total?.toFixed?.(2) ?? 'N/A'}
                </p>
              </li>
              <li className='text-sm text-gray-500 mt-2'>
                Status: {order.status || 'Order'}
              </li>
            </div>
          ))}
          <li className='text-sm text-gray-500 mt-4'>
            Total Orders: {orders.length}
          </li>
        </ul>
      )}
    </main>
  );
}

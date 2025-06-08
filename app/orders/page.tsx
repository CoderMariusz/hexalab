import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <main className='max-w-4xl mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold mb-4'>Your Orders</h1>
      <p>Tu będzie historia zamówień z Sanity (dla {session.user?.email})</p>
    </main>
  );
}

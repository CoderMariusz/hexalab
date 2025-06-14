'use client';

import { signIn, useSession } from 'next-auth/react';

export default function LoginPage() {
  const session = useSession(); // Placeholder for session, can be used if needed
  const handleGoogleLogin = async () => {
    await signIn('google', {
      callbackUrl: '/orders'
    });
  };

  return (
    <main className='max-w-md mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6 text-center'>Log in to HexaLab</h1>

      {session.status === 'authenticated' && (
        <div className=' flex flex-col gap-2 text-center mb-4'>
          <p className='text-green-600'>You are already logged in!</p>
          <button
            onClick={() => signIn('google', { callbackUrl: '/orders' })}
            className='mt-2 inline-block bg-blue-100 text-blue-800 font-medium px-4 py-2 rounded hover:bg-blue-200 transition-colors duration-200'>
            Go to your orders
          </button>
          <button
            onClick={() => signIn('google', { callbackUrl: '/profile' })}
            className='mt-2 inline-block bg-blue-100 text-blue-800 font-medium px-4 py-2 rounded hover:bg-blue-200 transition-colors duration-200'>
            Go to your Profile
          </button>
        </div>
      )}
      {session.status !== 'authenticated' && (
        <button
          onClick={handleGoogleLogin}
          className='w-full border px-4 py-2 rounded hover:bg-gray-100'>
          Continue with Google
        </button>
      )}
    </main>
  );
}

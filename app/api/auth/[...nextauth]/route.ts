import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (
          credentials?.email === 'test@hexalab.com' &&
          credentials.password === 'admin123'
        ) {
          return { id: '1', name: 'Test User', email: credentials.email };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt' as const
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

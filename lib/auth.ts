import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // 🔐 Tu robisz własną walidację użytkownika – możesz porównać z bazą Sanity, Firebase itp.
        const hardcodedUser = {
          id: '1',
          name: 'Admin',
          email: 'admin@hexalab.com',
          password: 'admin123' // 🔥 Tylko do testów!
        };

        if (
          credentials?.email === hardcodedUser.email &&
          credentials?.password === hardcodedUser.password
        ) {
          return {
            id: hardcodedUser.id,
            name: hardcodedUser.name,
            email: hardcodedUser.email
          };
        }

        return null; // 🔒 Zwróć null jeśli dane niepoprawne
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  }
};

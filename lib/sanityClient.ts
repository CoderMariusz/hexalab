import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'f52z6pr5', // <-- podmień
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_WRITE_TOKEN
});

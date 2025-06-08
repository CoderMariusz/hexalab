// sanity/lib/client.ts
import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-06-01', // lub inna aktualna data
  useCdn: false, // CDN = false jeśli zapisujemy dane
  token: process.env.SANITY_API_WRITE_TOKEN, // wymagany do zapisu
})

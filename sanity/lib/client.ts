import { createClient } from 'next-sanity'

// import { apiVersion, dataset, projectId, useCdn } from './/';
import next from 'next/types'
// import { ImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  apiVersion:'2023-07-04',
  dataset:'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn :true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
}) 

export default client;


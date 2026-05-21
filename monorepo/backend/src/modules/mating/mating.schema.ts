import { z } from 'zod';

export const createListingSchema = z.object({
  petId: z.string().min(1),
  species: z.enum(['dog', 'cat']),
  breed: z.string().min(1),
  gender: z.enum(['male', 'female']),
  age: z.number().positive(),
  description: z.string().max(1000).optional(),
  healthCertified: z.boolean().default(false),
  location: z.object({
    city: z.string(),
    country: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
  }).optional(),
  photos: z.array(z.string().url()).optional(),
  price: z.number().min(0).optional(),
  requirements: z.string().max(500).optional(),
});

export const updateListingSchema = createListingSchema.partial();

export const sendRequestSchema = z.object({
  listingId: z.string().min(1),
  petId: z.string().min(1),
  message: z.string().max(500).optional(),
});

export const respondRequestSchema = z.object({
  status: z.enum(['accepted', 'rejected']),
});

export type CreateListingInput = z.infer<typeof createListingSchema>;
export type SendRequestInput = z.infer<typeof sendRequestSchema>;

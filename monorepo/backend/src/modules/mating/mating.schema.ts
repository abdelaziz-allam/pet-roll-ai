import { z } from 'zod';

export const createListingSchema = z.object({
  petId: z.string().min(1),
  description: z.string().max(500).optional(),
  location: z.object({
    city: z.string().min(1),
    country: z.string().min(1),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
  }),
  preferences: z.object({
    minAge: z.number().min(0).optional(),
    maxAge: z.number().min(0).optional(),
    preferredBreeds: z.array(z.string()).optional(),
  }).optional(),
});

export const updateListingSchema = z.object({
  description: z.string().max(500).optional(),
  location: z.object({
    city: z.string().min(1),
    country: z.string().min(1),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
  }).optional(),
  preferences: z.object({
    minAge: z.number().min(0).optional(),
    maxAge: z.number().min(0).optional(),
    preferredBreeds: z.array(z.string()).optional(),
  }).optional(),
  status: z.enum(['active', 'paused', 'removed']).optional(),
});

export const createMatchRequestSchema = z.object({
  listingId: z.string().min(1),
  message: z.string().max(300).optional(),
});

export const updateMatchRequestSchema = z.object({
  status: z.enum(['accepted', 'rejected']),
});

export const browseListingsQuerySchema = z.object({
  species: z.string().optional(),
  breed: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
export type CreateMatchRequestInput = z.infer<typeof createMatchRequestSchema>;
export type UpdateMatchRequestInput = z.infer<typeof updateMatchRequestSchema>;
export type BrowseListingsQuery = z.infer<typeof browseListingsQuerySchema>;

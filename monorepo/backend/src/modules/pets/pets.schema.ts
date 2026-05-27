import { z } from 'zod';

export const locationSchema = z.object({
  country: z.string().optional(),
  city: z.string().optional(),
}).optional();

export const createPetSchema = z.object({
  name: z.string().min(1).max(50),
  species: z.string().min(1).max(50),
  breed: z.string().min(1).max(100),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string(),
  weight: z.number().positive().optional(),
  color: z.string().optional(),
  microchipId: z.string().optional(),
  isNeutered: z.boolean().default(false),
  isAvailableForMating: z.boolean().default(false),
  notes: z.string().max(500).optional(),
  location: locationSchema,
});

export const updatePetSchema = createPetSchema.partial();

export type CreatePetInput = z.infer<typeof createPetSchema>;
export type UpdatePetInput = z.infer<typeof updatePetSchema>;

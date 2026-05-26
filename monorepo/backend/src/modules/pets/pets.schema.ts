import { z } from 'zod';

export const createPetSchema = z.object({
  name: z.string().min(2).max(50),
  species: z.string().min(1),
  breed: z.string().optional(),
  breedId: z.string().optional(),
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be ISO date format (YYYY-MM-DD)'),
  weight: z.number().positive().optional(),
  weightUnit: z.enum(['kg', 'lbs']).default('kg'),
  color: z.string().optional(),
  microchipId: z.string().optional(),
  isNeutered: z.boolean().default(false),
  notes: z.string().optional(),
});

export const updatePetSchema = createPetSchema.partial();

export type CreatePetInput = z.infer<typeof createPetSchema>;
export type UpdatePetInput = z.infer<typeof updatePetSchema>;

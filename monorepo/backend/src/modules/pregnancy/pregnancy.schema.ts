import { z } from 'zod';

export const createPregnancySchema = z.object({
  petId: z.string().min(1),
  breedingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be ISO date (YYYY-MM-DD)'),
  notes: z.string().optional(),
});

export const updatePregnancySchema = z.object({
  status: z.enum(['active', 'completed', 'lost']).optional(),
  actualDeliveryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be ISO date (YYYY-MM-DD)').optional(),
  numberOfOffspring: z.number().int().positive().optional(),
  notes: z.string().optional(),
});

export const addWeightSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be ISO date (YYYY-MM-DD)'),
  weight: z.number().positive(),
  unit: z.enum(['kg', 'lbs']),
  notes: z.string().optional(),
});

export const completeMilestoneSchema = z.object({
  milestoneId: z.string().min(1),
});

export type CreatePregnancyInput = z.infer<typeof createPregnancySchema>;
export type UpdatePregnancyInput = z.infer<typeof updatePregnancySchema>;
export type AddWeightInput = z.infer<typeof addWeightSchema>;
export type CompleteMilestoneInput = z.infer<typeof completeMilestoneSchema>;

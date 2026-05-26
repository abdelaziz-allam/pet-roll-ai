import { z } from 'zod';

export const createTipSchema = z.object({
  title: z.string().min(2).max(100),
  body: z.string().min(5).max(500),
  category: z.enum(['health', 'nutrition', 'grooming', 'training', 'safety', 'general']),
  species: z.array(z.string()).optional(),
  active: z.boolean().default(true),
});

export const updateTipSchema = createTipSchema.partial();

export type CreateTipInput = z.infer<typeof createTipSchema>;
export type UpdateTipInput = z.infer<typeof updateTipSchema>;

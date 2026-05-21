import { z } from 'zod';

export const createHealthRecordSchema = z.object({
  type: z.enum(['checkup', 'illness', 'injury', 'surgery', 'dental', 'other']),
  date: z.string(),
  title: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  veterinarian: z.string().optional(),
  clinic: z.string().optional(),
  weight: z.number().positive().optional(),
  temperature: z.number().optional(),
  notes: z.string().max(500).optional(),
  nextVisitDate: z.string().optional(),
  attachments: z.array(z.string().url()).optional(),
});

export const updateHealthRecordSchema = createHealthRecordSchema.partial();

export type CreateHealthRecordInput = z.infer<typeof createHealthRecordSchema>;
export type UpdateHealthRecordInput = z.infer<typeof updateHealthRecordSchema>;

import { z } from 'zod';

const healthRecordTypes = [
  'vet_visit', 'surgery', 'diagnosis', 'medication',
  'allergy', 'note', 'injury', 'test_result', 'other',
] as const;

export const createHealthRecordSchema = z.object({
  petId: z.string().min(1),
  type: z.enum(healthRecordTypes),
  title: z.string().min(2).max(200),
  description: z.string().optional(),
  date: z.string(),
  veterinarian: z.string().optional(),
  clinic: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  cost: z.number().positive().optional(),
  currency: z.string().length(3).optional(),
});

export const updateHealthRecordSchema = z.object({
  type: z.enum(healthRecordTypes).optional(),
  title: z.string().min(2).max(200).optional(),
  description: z.string().optional(),
  date: z.string().optional(),
  veterinarian: z.string().optional(),
  clinic: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  cost: z.number().positive().optional(),
  currency: z.string().length(3).optional(),
});

export type CreateHealthRecordInput = z.infer<typeof createHealthRecordSchema>;
export type UpdateHealthRecordInput = z.infer<typeof updateHealthRecordSchema>;

import { z } from 'zod';

export const createHealthRecordSchema = z.object({
  petId: z.string().min(1),
  type: z.enum(['vet_visit', 'surgery', 'diagnosis', 'medication', 'injury', 'test_result', 'other']),
  title: z.string().min(2).max(200),
  description: z.string().optional(),
  date: z.string().datetime(),
  vetName: z.string().optional(),
  vetClinic: z.string().optional(),
  cost: z.number().positive().optional(),
  currency: z.string().length(3).optional(),
});

export const updateHealthRecordSchema = z.object({
  type: z.enum(['vet_visit', 'surgery', 'diagnosis', 'medication', 'injury', 'test_result', 'other']).optional(),
  title: z.string().min(2).max(200).optional(),
  description: z.string().optional(),
  date: z.string().datetime().optional(),
  vetName: z.string().optional(),
  vetClinic: z.string().optional(),
  cost: z.number().positive().optional(),
  currency: z.string().length(3).optional(),
});

export type CreateHealthRecordInput = z.infer<typeof createHealthRecordSchema>;
export type UpdateHealthRecordInput = z.infer<typeof updateHealthRecordSchema>;

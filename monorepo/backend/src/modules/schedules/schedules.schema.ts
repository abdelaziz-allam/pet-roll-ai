import { z } from 'zod';

export const createScheduleSchema = z.object({
  title: z.string().min(1).max(100),
  type: z.enum(['feeding', 'medication', 'grooming', 'exercise', 'vet_visit', 'other']),
  frequency: z.enum(['daily', 'weekly', 'biweekly', 'monthly', 'custom']),
  nextDue: z.string(),
  time: z.string().optional(),
  customIntervalDays: z.number().int().positive().optional(),
  reminderMinutesBefore: z.number().int().default(30),
  notes: z.string().max(500).optional(),
  enabled: z.boolean().default(true),
});

export const updateScheduleSchema = createScheduleSchema.partial();

export type CreateScheduleInput = z.infer<typeof createScheduleSchema>;
export type UpdateScheduleInput = z.infer<typeof updateScheduleSchema>;

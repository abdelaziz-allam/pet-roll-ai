import { z } from 'zod';

export const createScheduleSchema = z.object({
  petId: z.string().min(1),
  type: z.enum(['feeding', 'medication', 'exercise', 'grooming', 'other']),
  title: z.string().min(2).max(100),
  description: z.string().optional(),
  times: z.array(z.string().regex(/^\d{2}:\d{2}$/, 'Must be HH:MM format')).min(1),
  frequency: z.enum(['daily', 'weekly', 'custom']),
  daysOfWeek: z.array(z.number().int().min(0).max(6)).optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be ISO date (YYYY-MM-DD)'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be ISO date (YYYY-MM-DD)').optional(),
  reminderEnabled: z.boolean().default(true),
});

export const updateScheduleSchema = z.object({
  type: z.enum(['feeding', 'medication', 'exercise', 'grooming', 'other']).optional(),
  title: z.string().min(2).max(100).optional(),
  description: z.string().optional(),
  times: z.array(z.string().regex(/^\d{2}:\d{2}$/, 'Must be HH:MM format')).min(1).optional(),
  frequency: z.enum(['daily', 'weekly', 'custom']).optional(),
  daysOfWeek: z.array(z.number().int().min(0).max(6)).optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be ISO date (YYYY-MM-DD)').optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be ISO date (YYYY-MM-DD)').optional(),
  reminderEnabled: z.boolean().optional(),
  active: z.boolean().optional(),
});

export const logCompletionSchema = z.object({
  completedAt: z.string().datetime(),
  notes: z.string().optional(),
});

export type CreateScheduleInput = z.infer<typeof createScheduleSchema>;
export type UpdateScheduleInput = z.infer<typeof updateScheduleSchema>;
export type LogCompletionInput = z.infer<typeof logCompletionSchema>;

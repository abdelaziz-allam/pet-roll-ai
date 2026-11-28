import { z } from 'zod';

// Chat rooms are created automatically when a mating match is accepted.
// No create schema needed — room lifecycle is managed by the mating module.

export const chatRoomQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(50).default(20),
  cursor: z.string().optional(),
});

export const messagesQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

export const sendMessageSchema = z
  .object({
    text: z.string().trim().min(1).max(2000).optional(),
    imageUrl: z.string().url().max(2048).optional(),
  })
  .refine((b) => b.text !== undefined || b.imageUrl !== undefined, { message: 'text or imageUrl is required' });

export interface ChatRoom {
  id: string;
  participants: string[];
  matchId: string;
  createdAt: string;
  lastMessage?: {
    text: string;
    senderId: string;
    timestamp: string;
  };
  unreadCount?: number;
}

export interface ChatRoomDetail extends ChatRoom {
  participantProfiles: Array<{
    uid: string;
    displayName: string;
    photoUrl?: string;
  }>;
}

export type ChatRoomQueryInput = z.infer<typeof chatRoomQuerySchema>;

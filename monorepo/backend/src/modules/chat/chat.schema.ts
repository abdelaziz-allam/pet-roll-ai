import { z } from 'zod';

// Chat rooms are created automatically when a mating match is accepted.
// No create schema needed — room lifecycle is managed by the mating module.

export const chatRoomQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(50).default(20),
  cursor: z.string().optional(),
});

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

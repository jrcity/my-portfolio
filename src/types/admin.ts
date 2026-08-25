import { Conversation, Message } from '@prisma/client';

export interface ConversationWithMessages extends Conversation {
  messages: Message[];
}

export interface AdminStats {
  totalConversations: number;
  totalMessages: number;
  conversationsToday: number;
}

export interface AdminConversationsResponse {
  conversations: ConversationWithMessages[];
  stats: AdminStats;
}

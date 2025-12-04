import { User } from './user';

// ChatUser extends basic user info needed for chat
export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  isOnline?: boolean;
  email?: string;
}

// Helper to convert User to ChatUser
export function userToChatUser(user: User): ChatUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: undefined, // User type doesn't have avatar, can be added later
    isOnline: false
  };
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
  isRead?: boolean;
}

export interface Conversation {
  id: string;
  participants: ChatUser[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}

export interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  currentUser: ChatUser | null;
  loading: boolean;
  availableUsers: ChatUser[];
  setCurrentConversation: (conversation: Conversation | null) => void;
  addMessage: (conversationId: string, text: string) => void;
  markAsRead: (conversationId: string) => void;
  createConversation: (participant: ChatUser) => void;
  startConversationWithUser: (userId: string) => void;
}

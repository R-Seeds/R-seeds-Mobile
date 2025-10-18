export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  isOnline?: boolean;
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
  currentUser: ChatUser;
  setCurrentConversation: (conversation: Conversation | null) => void;
  addMessage: (conversationId: string, text: string) => void;
  markAsRead: (conversationId: string) => void;
  createConversation: (participant: ChatUser) => void;
}

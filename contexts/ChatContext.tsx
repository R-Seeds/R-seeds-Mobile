import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { ChatContextType, Conversation, Message, ChatUser, userToChatUser } from '@/types';
import { useUser } from './UserContext';
import { useAuth } from './AuthContext';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const { users, userMe } = useUser();
  const { isAuthenticated } = useAuth();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [loading] = useState(false);

  // Convert current user to ChatUser format
  const currentUser: ChatUser | null = useMemo(() => {
    if (!userMe) return null;
    return userToChatUser(userMe);
  }, [userMe]);

  // Convert all users to ChatUser format (excluding current user)
  const availableUsers: ChatUser[] = useMemo(() => {
    if (!users || !userMe) return [];
    return users
      .filter(user => user.id !== userMe.id)
      .map(user => userToChatUser(user));
  }, [users, userMe]);

  // Initialize conversations when users are loaded
  useEffect(() => {
    if (isAuthenticated && availableUsers.length > 0 && currentUser && conversations.length === 0) {
      // Create initial sample conversations with first few users
      const initialConversations: Conversation[] = availableUsers.slice(0, 3).map((user, index) => ({
        id: `conv_${user.id}`,
        participants: [currentUser, user],
        messages: [
          {
            id: `msg_${index}_1`,
            text: `Hi! I'm ${user.name}. Great to connect with you on R-Seeds!`,
            senderId: user.id,
            timestamp: new Date(Date.now() - Math.random() * 86400000), // Random time within last 24h
            isRead: false
          }
        ],
        unreadCount: 1
      }));

      // Update last messages
      const conversationsWithLastMessage = initialConversations.map(conv => ({
        ...conv,
        lastMessage: conv.messages[conv.messages.length - 1]
      }));

      setConversations(conversationsWithLastMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, availableUsers.length, currentUser]);

  const addMessage = (conversationId: string, text: string) => {
    if (!currentUser) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      text,
      senderId: currentUser.id,
      timestamp: new Date(),
      isRead: true
    };

    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: newMessage
          };
        }
        return conv;
      })
    );

    // Update current conversation if it's the active one
    if (currentConversation?.id === conversationId) {
      setCurrentConversation(prev => prev ? {
        ...prev,
        messages: [...prev.messages, newMessage],
        lastMessage: newMessage
      } : null);
    }
  };

  const markAsRead = (conversationId: string) => {
    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            unreadCount: 0,
            messages: conv.messages.map(msg => ({ ...msg, isRead: true }))
          };
        }
        return conv;
      })
    );
  };

  const createConversation = (participant: ChatUser) => {
    if (!currentUser) return;

    // Check if conversation already exists
    const existingConv = conversations.find(conv =>
      conv.participants.some(p => p.id === participant.id)
    );

    if (existingConv) {
      setCurrentConversation(existingConv);
      return;
    }

    const newConversation: Conversation = {
      id: `conv_${Date.now()}`,
      participants: [currentUser, participant],
      messages: [],
      unreadCount: 0
    };

    setConversations(prev => [...prev, newConversation]);
    setCurrentConversation(newConversation);
  };

  const startConversationWithUser = (userId: string) => {
    const user = availableUsers.find(u => u.id === userId);
    if (user) {
      createConversation(user);
    }
  };

  const value: ChatContextType = {
    conversations,
    currentConversation,
    currentUser,
    loading,
    availableUsers,
    setCurrentConversation,
    addMessage,
    markAsRead,
    createConversation,
    startConversationWithUser
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

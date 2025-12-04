import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo, useRef, useCallback } from 'react';
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

  // Track if we've already initialized to prevent infinite loops
  const hasInitialized = useRef(false);

  // Convert current user to ChatUser format
  const currentUser: ChatUser | null = useMemo(() => {
    if (!userMe) return null;
    return userToChatUser(userMe);
  }, [userMe?.id]); // Only depend on userMe.id, not the whole object

  // Convert all users to ChatUser format (excluding current user)
  const availableUsers: ChatUser[] = useMemo(() => {
    if (!users || !userMe) return [];
    return users
      .filter(user => user.id !== userMe.id)
      .map(user => userToChatUser(user));
  }, [users?.length, userMe?.id]); // Only depend on array length and userMe id

  // Initialize conversations when users are loaded (only once)
  useEffect(() => {
    if (
      isAuthenticated &&
      availableUsers.length > 0 &&
      currentUser &&
      !hasInitialized.current
    ) {
      hasInitialized.current = true;

      // Create initial sample conversations with first few users
      const initialConversations: Conversation[] = availableUsers.slice(0, 3).map((user, index) => ({
        id: `conv_${user.id}`,
        participants: [currentUser, user],
        messages: [
          {
            id: `msg_${index}_1`,
            text: `Hi! I'm ${user.name}. Great to connect with you on R-Seeds!`,
            senderId: user.id,
            timestamp: new Date(Date.now() - (index + 1) * 3600000), // Stagger by hours
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
  }, [isAuthenticated, availableUsers.length > 0, currentUser?.id]);

  // Reset initialization when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      hasInitialized.current = false;
      setConversations([]);
      setCurrentConversation(null);
    }
  }, [isAuthenticated]);

  const addMessage = useCallback((conversationId: string, text: string) => {
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
    setCurrentConversation(prev => {
      if (prev?.id === conversationId) {
        return {
          ...prev,
          messages: [...prev.messages, newMessage],
          lastMessage: newMessage
        };
      }
      return prev;
    });
  }, [currentUser]);

  const markAsRead = useCallback((conversationId: string) => {
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
  }, []);

  const createConversation = useCallback((participant: ChatUser) => {
    if (!currentUser) return;

    // Check if conversation already exists
    setConversations(prev => {
      const existingConv = prev.find(conv =>
        conv.participants.some(p => p.id === participant.id)
      );

      if (existingConv) {
        setCurrentConversation(existingConv);
        return prev;
      }

      const newConversation: Conversation = {
        id: `conv_${Date.now()}`,
        participants: [currentUser, participant],
        messages: [],
        unreadCount: 0
      };

      setCurrentConversation(newConversation);
      return [...prev, newConversation];
    });
  }, [currentUser]);

  const startConversationWithUser = useCallback((userId: string) => {
    const user = availableUsers.find(u => u.id === userId);
    if (user) {
      createConversation(user);
    }
  }, [availableUsers, createConversation]);

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

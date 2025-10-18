import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ChatContextType, Conversation, Message, ChatUser } from '@/types';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [conversations, setConversations] = useState<Conversation[]>([
    // Mock data for demonstration
    {
      id: '1',
      participants: [
        { id: 'current', name: 'Me' },
        { id: 'uwaeli', name: 'Uwaeli Nadla', avatar: 'https://via.placeholder.com/40', isOnline: true }
      ],
      messages: [
        {
          id: 'm1',
          text: 'Hello there! How are you today?',
          senderId: 'uwaeli',
          timestamp: new Date('2024-10-18T15:30:00'),
          isRead: true
        },
        {
          id: 'm2',
          text: 'Hi! I\'m doing great, thanks for asking!',
          senderId: 'current',
          timestamp: new Date('2024-10-18T15:31:00'),
          isRead: true
        },
        {
          id: 'm3',
          text: 'Can you tell me about your project progress so far?',
          senderId: 'uwaeli',
          timestamp: new Date('2024-10-18T15:32:00'),
          isRead: true
        },
        {
          id: 'm4',
          text: 'Sure thing! The app is really coming together nicely.',
          senderId: 'current',
          timestamp: new Date('2024-10-18T15:33:00'),
          isRead: true
        },
        {
          id: 'm5',
          text: 'Wonderful! Working on the latest features now?',
          senderId: 'uwaeli',
          timestamp: new Date('2024-10-18T15:34:00'),
          isRead: true
        },
        {
          id: 'm6',
          text: 'Just finished the chat functionality!',
          senderId: 'current',
          timestamp: new Date('2024-10-18T15:35:00'),
          isRead: true
        },
        {
          id: 'm7',
          text: 'Nice! When will it be live?',
          senderId: 'uwaeli',
          timestamp: new Date('2024-10-18T15:36:00'),
          isRead: false
        },
        {
          id: 'm8',
          text: 'Hi there',
          senderId: 'uwaeli',
          timestamp: new Date('2024-10-18T15:37:00'),
          isRead: false
        }
      ],
      unreadCount: 2
    }
  ]);

  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  
  const currentUser: ChatUser = {
    id: 'current',
    name: 'Me'
  };

  // Update last message for conversations
  const updateConversations = () => {
    setConversations(prev => 
      prev.map(conv => ({
        ...conv,
        lastMessage: conv.messages[conv.messages.length - 1]
      }))
    );
  };

  React.useEffect(() => {
    updateConversations();
  }, []);

  const addMessage = (conversationId: string, text: string) => {
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
        messages: [...prev.messages, newMessage]
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
    const newConversation: Conversation = {
      id: `conv_${Date.now()}`,
      participants: [currentUser, participant],
      messages: [],
      unreadCount: 0
    };

    setConversations(prev => [...prev, newConversation]);
  };

  const value: ChatContextType = {
    conversations,
    currentConversation,
    currentUser,
    setCurrentConversation,
    addMessage,
    markAsRead,
    createConversation
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

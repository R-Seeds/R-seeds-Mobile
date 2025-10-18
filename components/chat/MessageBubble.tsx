import React from 'react';
import { View, Text } from 'react-native';
import { Message } from '@/types';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  showTime?: boolean;
}

export default function MessageBubble({ message, isCurrentUser, showTime = false }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <View className={`mb-2 ${isCurrentUser ? 'items-end' : 'items-start'}`}>
      <View
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isCurrentUser 
            ? 'bg-teal-500 rounded-br-md' 
            : 'bg-gray-100 rounded-bl-md'
        }`}
      >
        <Text 
          className={`text-base ${
            isCurrentUser ? 'text-white' : 'text-gray-900'
          }`}
        >
          {message.text}
        </Text>
      </View>
      
      {showTime && (
        <Text className="text-xs text-gray-500 mt-1 px-2">
          {formatTime(message.timestamp)}
        </Text>
      )}
    </View>
  );
}

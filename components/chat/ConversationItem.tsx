import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Conversation } from '@/types';

interface ConversationItemProps {
  conversation: Conversation;
  currentUserId: string;
  onPress: () => void;
}

export default function ConversationItem({ conversation, currentUserId, onPress }: ConversationItemProps) {
  const otherParticipant = conversation.participants.find(p => p.id !== currentUserId);
  const lastMessage = conversation.lastMessage;
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <TouchableOpacity 
      className="flex-row items-center p-4 border-b border-gray-100 gap-x-4"
      onPress={onPress}
    >
      {/* Avatar */}
      <View className="relative">
        {otherParticipant?.avatar ? (
          <Image 
            source={require('@/assets/images/profile.jpg')} 
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <View className="w-12 h-12 rounded-full bg-gray-300 items-center justify-center">
            <Text className="text-gray-600 font-semibold text-lg">
              {otherParticipant?.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        
        {/* Online indicator */}
        {otherParticipant?.isOnline && (
          <View className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        )}
      </View>

      {/* Message content */}
      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold text-gray-900 text-base">
            {otherParticipant?.name}
          </Text>
          {lastMessage && (
            <Text className="text-xs text-gray-500">
              {formatTime(lastMessage.timestamp)}
            </Text>
          )}
        </View>
        
        {lastMessage && (
          <View className="flex-row items-center justify-between mt-1">
            <Text 
              className="text-gray-600 text-sm flex-1" 
              numberOfLines={1}
            >
              {lastMessage.text}
            </Text>
            
            {/* Unread count */}
            {conversation.unreadCount > 0 && (
              <View className="bg-teal-500 rounded-full w-5 p-2 h-5 items-center justify-center ml-2">
                <Text className="text-white text-xs font-semibold">
                  {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

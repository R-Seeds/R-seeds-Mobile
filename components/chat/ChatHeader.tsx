import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ChatUser } from '@/types';

interface ChatHeaderProps {
  participant: ChatUser;
  onBackPress: () => void;
  onVideoCall?: () => void;
  onVoiceCall?: () => void;
  onMoreOptions?: () => void;
}

export default function ChatHeader({ 
  participant, 
  onBackPress, 
  onVideoCall, 
  onVoiceCall, 
  onMoreOptions 
}: ChatHeaderProps) {
  return (
    <View className="bg-teal-500 px-4 py-3 pt-10 flex-row items-center justify-between ">
      <View className="flex-row items-center flex-1 gap-x-4">
        <TouchableOpacity 
          onPress={onBackPress}
          className="mr-3 p-1"
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Avatar */}
        <View className="relative">
          {participant.avatar ? (
            <Image 
              source={require('@/assets/images/profile.jpg')} 
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
              <Text className="text-white font-semibold text-sm">
                {participant.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          
          {/* Online indicator */}
          {participant.isOnline && (
            <View className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white" />
          )}
        </View>

        <View className="ml-3 flex-1">
          <Text className="text-white font-semibold text-base">
            {participant.name}
          </Text>
          <Text className="text-white/80 text-xs">
            {participant.isOnline ? 'Online' : 'Last seen recently'}
          </Text>
        </View>
      </View>

      {/* Action buttons */}
      <View className="flex-row items-center">
        {onVideoCall && (
          <TouchableOpacity 
            onPress={onVideoCall}
            className="mr-3 p-2"
          >
            <Ionicons name="videocam" size={20} color="white" />
          </TouchableOpacity>
        )}
        
        {onVoiceCall && (
          <TouchableOpacity 
            onPress={onVoiceCall}
            className="mr-3 p-2"
          >
            <Ionicons name="call" size={20} color="white" />
          </TouchableOpacity>
        )}
        
        {onMoreOptions && (
          <TouchableOpacity 
            onPress={onMoreOptions}
            className="p-2"
          >
            <Ionicons name="ellipsis-vertical" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

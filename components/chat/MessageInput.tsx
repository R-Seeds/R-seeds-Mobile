import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

export default function MessageInput({ onSendMessage, placeholder = "Type something here..." }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <View className="flex-row items-center px-4 py-3 bg-white border-t border-gray-200">
      {/* Attachment button */}
      <TouchableOpacity className="mr-3 p-2">
        <Ionicons name="attach" size={24} color="#6b7280" />
      </TouchableOpacity>

      {/* Text input */}
      <View className="flex-1 bg-gray-100 rounded-full px-4 py-3 mr-3">
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          multiline
          maxLength={1000}
          className="text-base text-gray-900"
          style={{ maxHeight: 100 }}
        />
      </View>

      {/* Voice/Send button */}
      <TouchableOpacity 
        onPress={message.trim() ? handleSend : undefined}
        className="p-2"
      >
        {message.trim() ? (
          <View className="bg-teal-500 p-2 rounded-full">
            <Ionicons name="send" size={20} color="white" />
          </View>
        ) : (
          <Ionicons name="mic" size={24} color="#6b7280" />
        )}
      </TouchableOpacity>
    </View>
  );
}

import React from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ConversationItem } from '@/components/chat';
import { useChat } from '@/contexts/ChatContext';
import { Conversation } from '@/types';
import Header from '@/components/ui/Header';
import TabNavigation from '@/components/ui/Tabs';

export default function MessagesScreen() {
    const { conversations, currentUser, setCurrentConversation, loading, availableUsers } = useChat();

    const handleConversationPress = (conversation: Conversation) => {
        setCurrentConversation(conversation);
        router.push('/chat/detail');
    };

    const handleNewMessage = () => {
        // If we have available users and no conversations with them, start a new one
        if (availableUsers.length > 0) {
            const userWithoutConv = availableUsers.find(
                user => !conversations.some(conv => conv.participants.some(p => p.id === user.id))
            );
            if (userWithoutConv) {
                // Navigate to a user selection or start conversation directly
                console.log('Start new conversation with:', userWithoutConv.name);
            }
        }
    };

    const renderConversationItem = ({ item }: { item: Conversation }) => (
        <ConversationItem
            conversation={item}
            currentUserId={currentUser?.id || ''}
            onPress={() => handleConversationPress(item)}
        />
    );

    if (!currentUser) {
        return (
            <View className="flex-1 bg-white justify-center items-center">
                <ActivityIndicator size="large" color="#14b8a6" />
                <Text className="mt-4 text-gray-500">Loading...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">

            <Header />
            {/* Header */}
            <View className="px-4 pt-2 pb-4">
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-2xl font-bold text-gray-900">Messages</Text>
                    <TouchableOpacity className="p-2" onPress={handleNewMessage}>
                        <Ionicons name="create-outline" size={24} color="#374151" />
                    </TouchableOpacity>
                </View>

                {/* Search bar */}
                <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
                    <Ionicons name="search" size={20} color="#6b7280" className="mr-3" />
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor="#6b7280"
                        className="flex-1 text-base text-gray-900 ml-3"
                    />
                </View>
            </View>

            {/* Conversations list */}
            {conversations.length === 0 ? (
                <View className="flex-1 justify-center items-center px-6">
                    <Ionicons name="chatbubbles-outline" size={64} color="#d1d5db" />
                    <Text className="text-lg font-semibold text-gray-400 mt-4">No messages yet</Text>
                    <Text className="text-gray-400 text-center mt-2">
                        Start a conversation with other R-Seeds users!
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={conversations}
                    keyExtractor={(item) => item.id}
                    renderItem={renderConversationItem}
                    showsVerticalScrollIndicator={false}
                    className="flex-1"
                />
            )}

            <TabNavigation />
        </View>
    );
}
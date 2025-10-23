import React from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ConversationItem } from '@/components/chat';
import { useChat } from '@/contexts/ChatContext';
import { Conversation } from '@/types';
import Header from '@/components/ui/Header';
import TabNavigation from '@/components/ui/Tabs';

export default function MessagesScreen() {
    const { conversations, currentUser, setCurrentConversation } = useChat();

    const handleConversationPress = (conversation: Conversation) => {
        setCurrentConversation(conversation);
        router.push('/chat/detail');
    };

    const renderConversationItem = ({ item }: { item: Conversation }) => (
        <ConversationItem
            conversation={item}
            currentUserId={currentUser.id}
            onPress={() => handleConversationPress(item)}
        />
    );

    return (
        <View className="flex-1 bg-white">
            
            <Header/>
            {/* Header */}
            <View className="px-4 pt-2 pb-4">
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-2xl font-bold text-gray-900">Messages</Text>
                    <TouchableOpacity className="p-2">
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
            <FlatList
                data={conversations}
                keyExtractor={(item) => item.id}
                renderItem={renderConversationItem}
                showsVerticalScrollIndicator={false}
                className="flex-1"
            />

            <TabNavigation/>
        </View>
    );
}
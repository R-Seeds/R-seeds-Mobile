import React, { useEffect } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { ChatHeader, MessageBubble, MessageInput } from '@/components/chat';
import { useChat } from '@/contexts/ChatContext';
import { Message } from '@/types';

export default function ChatDetailScreen() {
    const { 
        currentConversation, 
        currentUser, 
        addMessage, 
        markAsRead 
    } = useChat();

    const otherParticipant = currentConversation?.participants.find(
        p => p.id !== currentUser.id
    );

    useEffect(() => {
        if (currentConversation) {
            markAsRead(currentConversation.id);
        }
    }, [currentConversation, markAsRead]);

    const handleSendMessage = (text: string) => {
        if (currentConversation) {
            addMessage(currentConversation.id, text);
        }
    };

    const handleBackPress = () => {
        router.back();
    };

    const renderMessage = ({ item, index }: { item: Message; index: number }) => {
        const isCurrentUser = item.senderId === currentUser.id;
        const prevMessage = currentConversation?.messages[index - 1];
        const showTime = !prevMessage || 
            new Date(item.timestamp).getTime() - new Date(prevMessage.timestamp).getTime() > 300000; // 5 minutes

        return (
            <MessageBubble 
                message={item} 
                isCurrentUser={isCurrentUser}
                showTime={showTime}
            />
        );
    };

    if (!currentConversation || !otherParticipant) {
        return null; // or loading state
    }

    return (
        <KeyboardAvoidingView 
            className="flex-1" 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View className="flex-1 bg-white pb-10">
                <StatusBar style="light" />
                
                {/* Header */}
                <ChatHeader
                    participant={otherParticipant}
                    onBackPress={handleBackPress}
                    onVideoCall={() => console.log('Video call')}
                    onVoiceCall={() => console.log('Voice call')}
                    onMoreOptions={() => console.log('More options')}
                />

                {/* Messages list */}
                <FlatList
                    data={currentConversation.messages}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMessage}
                    className="flex-1 px-4 py-2"
                    showsVerticalScrollIndicator={false}
                    inverted={false}
                />

                {/* Message input */}
                <MessageInput onSendMessage={handleSendMessage} />
            </View>
        </KeyboardAvoidingView>
    );
}
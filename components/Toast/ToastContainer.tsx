import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from '@/contexts/ToastContext';
import Toast from './Toast';

export default function ToastContainer() {
  const { toasts, hideToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <SafeAreaView className="absolute top-0 left-0 right-0 z-50 pointer-events-none">
      <View className="pt-2 pointer-events-auto">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onDismiss={hideToast}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

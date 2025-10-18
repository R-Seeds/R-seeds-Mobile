import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Toast as ToastType, ToastConfig } from '@/types';

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

const toastConfig: ToastConfig = {
  success: {
    backgroundColor: 'bg-green-500',
    textColor: 'text-white',
    iconColor: '#ffffff',
  },
  error: {
    backgroundColor: 'bg-red-500',
    textColor: 'text-white',
    iconColor: '#ffffff',
  },
  info: {
    backgroundColor: 'bg-blue-500',
    textColor: 'text-white',
    iconColor: '#ffffff',
  },
  warning: {
    backgroundColor: 'bg-yellow-500',
    textColor: 'text-white',
    iconColor: '#ffffff',
  },
};

const getIcon = (type: ToastType['type']) => {
  switch (type) {
    case 'success':
      return 'check';
    case 'error':
      return 'close';
    case 'info':
      return 'info';
    case 'warning':
      return 'warning';
    default:
      return 'info';
  }
};

export default function Toast({ toast, onDismiss }: ToastProps) {
  const config = toastConfig[toast.type];

  return (
    <View className={`mx-4 mb-2 p-4 rounded-lg flex-row items-start justify-between shadow-lg ${config.backgroundColor}`}>
      <View className="flex-row items-start flex-1">
        <AntDesign
          name={getIcon(toast.type)}
          size={24}
          color={config.iconColor}
          className="mr-3 mt-0.5"
        />
        <View className="flex-1">
          <Text className={`font-semibold text-base ${config.textColor}`}>
            {toast.title}
          </Text>
          {toast.message && (
            <Text className={`text-sm mt-1 opacity-90 ${config.textColor}`}>
              {toast.message}
            </Text>
          )}
        </View>
      </View>
      
      <TouchableOpacity
        onPress={() => onDismiss(toast.id)}
        className="ml-2 p-1"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <AntDesign name="close" size={16} color={config.iconColor} />
      </TouchableOpacity>
    </View>
  );
}

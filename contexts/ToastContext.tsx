import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Animated, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 4000;

type ToastType = "success" | "error";

type Toast = {
  id: string;
  title: string;
  message: string;
  type?: ToastType;
};

const ToastContext = createContext<{
  toasts: Toast[];
  showToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}>({
  toasts: [],
  showToast: () => {},
  removeToast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now().toString();
    const newToast = { id, ...toast };
    setToasts((prev) => [newToast, ...prev].slice(0, TOAST_LIMIT));
    setTimeout(() => removeToast(id), TOAST_REMOVE_DELAY);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: Toast[];
  onClose: (id: string) => void;
}) {

  return (
    <View
      className="absolute left-0 right-0 items-center px-4 pointer-events-none"
      style={{
        top: 10,
        zIndex: 9999,
      }}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => onClose(toast.id)} />
      ))}
    </View>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const opacity = useMemo(() => new Animated.Value(0), []);
  const translateY = useMemo(() => new Animated.Value(20), []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        tension: 100,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();

    return () => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };
  }, [opacity, translateY]);

  const bgColor =
    toast.type === "error" ? "bg-red-600" : toast.type === "success" ? "bg-teal-500" : "bg-gray-700";

  return (
    <Animated.View
      className={`flex-row items-center justify-between p-4 rounded-xl mb-3 shadow-lg shadow-black/20 w-full max-w-sm pointer-events-auto ${bgColor}`}
      style={{ opacity, transform: [{ translateY }] }}
    >
      <View className="flex-1 pr-3">
        {toast.title && (
          <Text className="text-white font-semibold text-base mb-1">{toast.title}</Text>
        )}
        {toast.message && <Text className="text-white text-sm">{toast.message}</Text>}
      </View>
      <TouchableOpacity onPress={onClose} className="p-1 -mr-2" activeOpacity={0.7}>
        <Ionicons name="close" size={20} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
}

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Toast, ToastContextType } from '@/types';
import { ToastContainer } from '@/components/Toast';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const generateId = (): string => {
    return `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const showToast = (toastData: Omit<Toast, 'id'>) => {
    const newToast: Toast = {
      id: generateId(),
      duration: 4000,
      autoHide: true,
      ...toastData,
    };

    setToasts(prev => [...prev, newToast]);

    if (newToast.autoHide && newToast.duration) {
      setTimeout(() => {
        hideToast(newToast.id);
      }, newToast.duration);
    }
  };

  const hideToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  const value: ToastContextType = {
    toasts,
    showToast,
    hideToast,
    clearAllToasts,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  const { showToast, ...rest } = context;
  
  // Helper methods for easier usage
  const showSuccess = (title: string, message?: string, options?: Partial<Toast>) => {
    showToast({ title, message, type: 'success', ...options });
  };
  
  const showError = (title: string, message?: string, options?: Partial<Toast>) => {
    showToast({ title, message, type: 'error', ...options });
  };
  
  const showInfo = (title: string, message?: string, options?: Partial<Toast>) => {
    showToast({ title, message, type: 'info', ...options });
  };
  
  const showWarning = (title: string, message?: string, options?: Partial<Toast>) => {
    showToast({ title, message, type: 'warning', ...options });
  };
  
  return {
    ...rest,
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
}

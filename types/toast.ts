export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
  duration?: number;
  autoHide?: boolean;
}

export interface ToastContextType {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  hideToast: (id: string) => void;
  clearAllToasts: () => void;
}

export interface ToastConfig {
  success: {
    backgroundColor: string;
    textColor: string;
    iconColor: string;
  };
  error: {
    backgroundColor: string;
    textColor: string;
    iconColor: string;
  };
  info: {
    backgroundColor: string;
    textColor: string;
    iconColor: string;
  };
  warning: {
    backgroundColor: string;
    textColor: string;
    iconColor: string;
  };
}

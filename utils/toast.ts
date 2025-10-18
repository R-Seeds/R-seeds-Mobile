import { ToastType } from '@/types';

export interface ShowToastOptions {
  title: string;
  message?: string;
  duration?: number;
  autoHide?: boolean;
}

export interface ToastHelpers {
  showSuccess: (options: ShowToastOptions) => void;
  showError: (options: ShowToastOptions) => void;
  showInfo: (options: ShowToastOptions) => void;
  showWarning: (options: ShowToastOptions) => void;
}

export const createToastHelpers = (showToast: (toast: any) => void): ToastHelpers => {
  const createToastMethod = (type: ToastType) => (options: ShowToastOptions) => {
    showToast({
      type,
      ...options,
    });
  };

  return {
    showSuccess: createToastMethod('success'),
    showError: createToastMethod('error'),
    showInfo: createToastMethod('info'),
    showWarning: createToastMethod('warning'),
  };
};

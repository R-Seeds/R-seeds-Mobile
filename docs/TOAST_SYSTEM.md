# Toast System Documentation

## Overview
A custom toast notification system built with React Context for displaying success, error, info, and warning messages throughout your React Native application.

## Features
- 🎨 **4 Toast Types**: Success, Error, Info, Warning
- 🎯 **Easy to Use**: Simple hooks and helper methods
- ⚡ **Auto-dismiss**: Configurable duration and auto-hide
- 🎭 **Custom Styling**: TailwindCSS-based with consistent theming
- 📱 **Mobile Optimized**: Designed for React Native with safe area support

## Setup
The toast system is already integrated into your app through the `ToastProvider` in `_layout.tsx`.

## Usage

### Basic Usage
```tsx
import { useToast } from '@/contexts/ToastContext';

function MyComponent() {
  const { showSuccess, showError, showInfo, showWarning } = useToast();

  const handleSuccess = () => {
    showSuccess("Operation Successful", "Your data has been saved!");
  };

  const handleError = () => {
    showError("Error", "Something went wrong. Please try again.");
  };

  const handleInfo = () => {
    showInfo("Information", "This is an informational message.");
  };

  const handleWarning = () => {
    showWarning("Warning", "Please review your input.");
  };

  return (
    // Your component JSX
  );
}
```

### Advanced Usage
```tsx
import { useToast } from '@/contexts/ToastContext';

function MyComponent() {
  const { showToast } = useToast();

  const customToast = () => {
    showToast({
      title: "Custom Toast",
      message: "This toast won't auto-hide",
      type: "success",
      autoHide: false,
      duration: 10000, // 10 seconds
    });
  };

  return (
    // Your component JSX
  );
}
```

### Available Methods
- `showSuccess(title, message?, options?)` - Green success toast
- `showError(title, message?, options?)` - Red error toast  
- `showInfo(title, message?, options?)` - Blue info toast
- `showWarning(title, message?, options?)` - Yellow warning toast
- `showToast(toastObject)` - Full control toast method
- `hideToast(id)` - Manually hide a specific toast
- `clearAllToasts()` - Clear all visible toasts

### Toast Configuration
```tsx
interface Toast {
  id: string;           // Auto-generated unique ID
  title: string;        // Required: Toast title
  message?: string;     // Optional: Toast message
  type: ToastType;      // 'success' | 'error' | 'info' | 'warning'
  duration?: number;    // Default: 4000ms
  autoHide?: boolean;   // Default: true
}
```

## File Structure
```
├── types/toast.ts              # TypeScript type definitions
├── contexts/ToastContext.tsx   # Context provider and hooks
├── components/Toast/
│   ├── Toast.tsx              # Individual toast component
│   ├── ToastContainer.tsx     # Toast container with positioning
│   └── index.ts               # Export barrel
└── utils/toast.ts             # Helper utilities
```

## Customization

### Colors
Toast colors are defined in `components/Toast/Toast.tsx`:
- **Success**: Green (`bg-green-500`)
- **Error**: Red (`bg-red-500`)
- **Info**: Blue (`bg-blue-500`) 
- **Warning**: Yellow (`bg-yellow-500`)

### Icons
Icons are from `@expo/vector-icons/AntDesign`:
- **Success**: `check`
- **Error**: `close`
- **Info**: `info`
- **Warning**: `warning`

### Positioning
Toasts appear at the top of the screen within the safe area. Modify `ToastContainer.tsx` to change positioning.

## Examples in the App
Check `app/profile.tsx` for live examples of all toast types in action.

import EventManager from '@/app/lib/EventManager';

export const toastEventManager = new EventManager();

type ToastTypes = 'success' | 'warning' | 'danger' | 'info' | 'modal';

export type ToastProps = {
  id?: number;
  type: ToastTypes;
  text: string;
  duration: number;
};

export default function toast({ type, text, duration }: ToastProps) {
  toastEventManager.emit('addtoast', {
    type,
    text,
    duration,
  });
}

export function mountToastStyle(type: ToastProps['type']) {
  switch (type) {
    case 'success':
      return 'bg-green-500';
    case 'warning':
      return 'bg-yellow-500';
    case 'danger':
      return 'bg-red-500';
    case 'info':
      return 'bg-blue-500';
    default:
      return 'bg-blue-500';
  }
}

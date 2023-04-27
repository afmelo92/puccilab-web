'use client';

import { toastEventManager, ToastProps } from '@/utils/toast';
import React, { useCallback, useEffect, useState } from 'react';
import ToastMessage from './Message';

const ToastContainer: React.FC = () => {
  const [messages, setMessages] = useState<ToastProps[] | []>([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }: ToastProps) {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.round(Math.random() * 100),
          type,
          text,
          duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => toastEventManager.removeListener('addtoast', handleAddToast);
  }, []);

  const handleRemoveMessage = useCallback((id?: number) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  }, []);

  return (
    <div className="flex flex-col gap-4 z-40 fixed top-24 right-6">
      {messages.map((message, index) => (
        <ToastMessage
          key={index}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </div>
  );
};

export default ToastContainer;

'use client';

import Icon from '@/utils/getIcon';
import { mountToastStyle, ToastProps } from '@/utils/toast';
import React, { useEffect } from 'react';

type ToastMessageProps = {
  message: ToastProps;
  // eslint-disable-next-line no-unused-vars
  onRemoveMessage: (id?: number) => void;
};

const ToastMessage: React.FC<ToastMessageProps> = ({
  message,
  onRemoveMessage,
}) => {
  const { id, text, type, duration } = message;

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemoveMessage(id);
    }, duration || 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, duration, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(id);
  }

  return (
    <div
      onClick={handleRemoveToast}
      tabIndex={0}
      className={`${mountToastStyle(
        type
      )} flex gap-2 items-center justify-center p-4 shadow-gray-600 shadow-md rounded`}
      role="button"
    >
      {type === 'danger' && (
        <Icon name="close" className="w-6 h-6 stroke-white" />
      )}
      {type === 'success' && (
        <Icon name="close" className="w-6 h-6 stroke-white" />
      )}
      <strong className="text-sm">{text}</strong>
    </div>
  );
};

export default ToastMessage;

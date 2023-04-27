import Icon from '@/utils/getIcon';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

type ModalProps = {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const Modal: React.FC<ModalProps> = ({ children, showModal, setShowModal }) => {
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowModal(false);
      }
    },
    [setShowModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return showModal ? (
    <div
      id="container"
      className="fixed top-0 right-0 bottom-0 left-0 bg-gray-600 bg-opacity-80 flex items-center justify-center z-50"
    >
      <div
        id="close-button"
        className="fixed top-4 right-4 cursor-pointer stroke-white hover:stroke-zinc-500 transition-colors"
        onClick={() => setShowModal(false)}
      >
        <Icon name="close" className="w-24 h-24" />
      </div>
      {children}
    </div>
  ) : null;
};

export default Modal;

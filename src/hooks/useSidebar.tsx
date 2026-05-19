import { useState } from 'react';

export const useSidebar: () => {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
} = (): {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
} => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle: () => void = (): void => {
    setIsOpen((prev: boolean): boolean => !prev);
  };

  const close: () => void = (): void => {
    setIsOpen(false);
  };
  return {
    isOpen,
    toggle,
    open,
    close,
  };
};

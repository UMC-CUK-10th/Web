import { useCallback, useState } from "react";

type UseSidebarReturn = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const useSidebar = (initialState = false): UseSidebarReturn => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((previousState) => !previousState);
  }, []);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};

export default useSidebar;

import type { StateCreator } from 'zustand';

interface ModalSlice {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const createModalSlice: StateCreator<ModalSlice> = (set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
});

export type { ModalSlice };

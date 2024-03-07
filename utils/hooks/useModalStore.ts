import { create } from "zustand";

export type ModalType = "PricingModal" | "ConfirmPolicy";

interface ModalState {
  type: ModalType | null;
  isOpen: boolean;
  data: any;
}

interface ModalAction {
  onOpen: (type: ModalType, data?: any) => void;
  onClose: () => void;
}
interface ModalStore extends ModalState, ModalAction {}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));

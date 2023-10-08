import { create } from "zustand";

interface Modal {
  showModal: string;
  onClose: () => any;
  onOpen: (id: string) => any;
}

const useModalInfo = create<Modal>((set) => ({
  showModal: "",
  onClose: () => set({ showModal: "" }),
  onOpen: (id) => {
    set({ showModal: id });
  },
}));

export default useModalInfo;

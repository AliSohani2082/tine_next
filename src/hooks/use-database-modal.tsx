import { create } from "zustand";

interface useDatabaseModalDatabase {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const useDatabaseModal = create<useDatabaseModalDatabase>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

import { FilterType } from "@/types/items";
import { Content } from "next/font/google";
import React from "react";
import { create } from "zustand";

type Item = {
	id: string;
	type: FilterType;
} | null;

interface useDownSliderProps {
	item: Item;
	databaseId: string;
	setDatabaseId: (databaseId: string) => void;
	isOpen: boolean;
	onOpen: (item: Item) => void;
	onClose: () => void;
}

export const useDownSlider = create<useDownSliderProps>((set) => ({
	databaseId: "1",
	item: null,
	isOpen: false,
	setDatabaseId: (databaseId) =>
		set({ databaseId: databaseId }),
	onOpen: (item) =>
		set((state) => ({
			...state,
			item: item,
			isOpen: true,
		})),
	onClose: () => set({ isOpen: false }),
}));

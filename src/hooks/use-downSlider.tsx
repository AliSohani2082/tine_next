import { FilterType } from '@/types/items'
import { Content } from 'next/font/google'
import React from 'react'
import { create } from 'zustand'

type Item = {
  id: string
  type: FilterType
} | null


interface useDownSliderProps {
  item: Item
  isOpen: boolean
  onOpen: (item: Item) => void
  onClose: () => void
}

export const useDownSlider = create<useDownSliderProps>((set) => ({
  item: null,
  isOpen: false,
  onOpen: (item) =>
    set((state) => ({
      item: item,
      isOpen: true,
    })),
  onClose: () => set({ isOpen: false }),
}))

import { colord } from "colord";
import { create } from "zustand";

interface useTheme {
  primary: string;
  add: (color: string) => void;
}

export const useTheme = create<useTheme>((set) => ({
  primary: "",
  add: (color) =>
    set((state) => {
      const colors = color.split(" ")
      const result = `${colors[0]} ${colors[1]}% ${colors[2]}%`
      state.primary = result
      console.log("result",colord(`hsl(${colors[0]}, ${colors[1]}% , ${colors[2]}%)`).toRgbString())





      return { primary: state.primary };
    }),
}));

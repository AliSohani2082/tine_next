import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function translate(key: string) {
  switch (key) {
    case "country":
      return "کشور";
    case "document":
      "مقاله";
    case "author":
      "نویسنده";
  }
}

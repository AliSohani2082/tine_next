import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function translate(key: string) {
  switch (key) {
    case 'country':
      return 'کشور'
    case 'document':
      'مقاله'
    case 'author':
      'نویسنده'
  }
}

export function farsiNumber(num: number): string | undefined {
  const numStr = num.toString()
  let result = ''
  for (let i = 0; i <= numStr.length; i++) {
    if (numStr[i] === '0') {
      result += '۰'
    } else if (numStr[i] === '1') {
      result += '۱'
    } else if (numStr[i] === '2') {
      result += '۲'
    } else if (numStr[i] === '3') {
      result += '۳'
    } else if (numStr[i] === '4') {
      result += '۴'
    } else if (numStr[i] === '5') {
      result += '۵'
    } else if (numStr[i] === '6') {
      result += '۶'
    } else if (numStr[i] === '7') {
      result += '۷'
    } else if (numStr[i] === '8') {
      result += '۸'
    } else if (numStr[i] === '9') {
      result += '۹'
    } else return undefined
  }
  return result
}

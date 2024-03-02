import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
let fs: any
if (!process.browser) {
  fs = require('fs')
}
import tinycolor from 'tinycolor2'

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

// Function to extract primary color from CSS file
export function getPrimaryColor(): string | null {
  const cssContent = fs.readFileSync('@/app/globals.css', 'utf8')
  const match = cssContent.match(/--primary:\s*([^;]+)/)
  if (match && match[1]) {
    return match[1].trim()
  }
  return null
}

// Function to generate color shades
export function generateColorShades(primaryColor: string | null): string[] {
  if (!primaryColor) return []
  const shades = []
  for (let i = 100; i <= 900; i += 100) {
    const shade = tinycolor(primaryColor)
      .lighten(i - 100)
      .toHexString()
    shades.push(shade)
  }
  return shades
}

export function numberToLetter(num: number): string {
  const alphabetLength = 26
  let result = ''

  while (num > 0) {
    const remainder = (num - 1) % alphabetLength
    result = String.fromCharCode('a'.charCodeAt(0) + remainder) + result
    num = Math.floor((num - 1) / alphabetLength)
  }

  return result
}

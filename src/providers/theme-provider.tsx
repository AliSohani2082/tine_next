'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import React from 'react'
import { colord } from 'colord'

import { useTheme } from '@/hooks/use-theme'

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  ...props
}) => {
  const theme = useTheme()
  React.useEffect(() => {
    var bodyStyle = document.body.style
    bodyStyle.setProperty('--primary', theme.primary)
  }, [theme])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export default ThemeProvider

"use client"

import React from 'react'
import { colord } from 'colord'

import { useTheme } from '@/hooks/use-theme'

type ThemeProviderProps = {
  children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {

  const theme = useTheme();
  React.useEffect(() => {
    var bodyStyle = document.body.style
    bodyStyle.setProperty("--primary", theme.primary);
  }, [theme])

  return (
    <>
      {children}
    </>
  )
}

export default ThemeProvider
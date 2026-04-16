'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type ThemePalette = {
  name: string
  primary: string
  secondary: string
  accent: string
  darkBg: string
  lightBg: string
}

export const THEME_PALETTES: Record<string, ThemePalette> = {
  default: {
    name: 'Défaut',
    primary: 'oklch(0.65 0.13 180)',      // Cyan
    secondary: 'oklch(0.95 0.005 250)',    // Light gray
    accent: 'oklch(0.75 0.16 65)',         // Orange
    darkBg: 'oklch(0.13 0.025 250)',       // Dark navy
    lightBg: 'oklch(0.98 0 0)',            // Light
  },
  ocean: {
    name: 'Océan',
    primary: 'oklch(0.5 0.15 220)',        // Deep blue
    secondary: 'oklch(0.93 0.01 200)',     // Light blue-gray
    accent: 'oklch(0.8 0.14 40)',          // Gold
    darkBg: 'oklch(0.1 0.02 220)',         // Dark blue
    lightBg: 'oklch(0.99 0 0)',            // Pure white
  },
  forest: {
    name: 'Forêt',
    primary: 'oklch(0.6 0.12 150)',        // Teal
    secondary: 'oklch(0.94 0.008 160)',    // Light teal-gray
    accent: 'oklch(0.78 0.15 70)',         // Warm gold
    darkBg: 'oklch(0.12 0.03 150)',        // Dark teal
    lightBg: 'oklch(0.98 0 0)',            // Off-white
  },
  sunset: {
    name: 'Coucher de soleil',
    primary: 'oklch(0.68 0.14 30)',        // Coral-red
    secondary: 'oklch(0.96 0.004 0)',      // Off-white
    accent: 'oklch(0.75 0.16 70)',         // Yellow-gold
    darkBg: 'oklch(0.14 0.03 30)',         // Dark red-brown
    lightBg: 'oklch(0.99 0 0)',            // White
  },
  tech: {
    name: 'Tech',
    primary: 'oklch(0.55 0.18 280)',       // Purple
    secondary: 'oklch(0.92 0.01 280)',     // Light purple-gray
    accent: 'oklch(0.7 0.16 180)',         // Cyan
    darkBg: 'oklch(0.1 0.02 280)',         // Dark purple
    lightBg: 'oklch(0.98 0.005 280)',      // Off-white
  },
}

type ThemeContextType = {
  palette: ThemePalette
  setPalette: (palette: ThemePalette) => void
  palettes: Record<string, ThemePalette>
}

const ThemeCustomContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeCustomProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPalette] = useState<ThemePalette>(THEME_PALETTES.default)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('guya-theme-palette')
    if (saved && THEME_PALETTES[saved]) {
      setPalette(THEME_PALETTES[saved])
    }
  }, [])

  const handleSetPalette = (newPalette: ThemePalette) => {
    setPalette(newPalette)
    const paletteName = Object.entries(THEME_PALETTES).find(
      ([_, p]) => p.name === newPalette.name
    )?.[0]
    if (paletteName) {
      localStorage.setItem('guya-theme-palette', paletteName)
    }
  }

  return (
    <ThemeCustomContext.Provider
      value={{
        palette,
        setPalette: handleSetPalette,
        palettes: THEME_PALETTES,
      }}
    >
      {mounted && (
        <style>{`
          :root {
            --primary: ${palette.primary};
            --secondary: ${palette.secondary};
            --accent: ${palette.accent};
            --brand-dark: ${palette.darkBg};
            --brand-light: ${palette.lightBg};
          }
        `}</style>
      )}
      {children}
    </ThemeCustomContext.Provider>
  )
}

export function useThemeCustom() {
  const context = useContext(ThemeCustomContext)
  // Return default values if not mounted or outside provider
  if (!context) {
    return {
      palette: THEME_PALETTES.default,
      setPalette: () => {},
      palettes: THEME_PALETTES,
    }
  }
  return context
}

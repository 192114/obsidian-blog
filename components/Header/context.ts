import { createContext } from 'react'

export type ThemeContextType = 'light' | 'dark' | 'auto'

export const ThemeContext = createContext<ThemeContextType>('auto')
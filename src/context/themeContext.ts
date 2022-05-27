import React from 'react';

export type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({} as ThemeContextType);

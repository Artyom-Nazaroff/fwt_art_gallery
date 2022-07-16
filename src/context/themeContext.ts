import React from 'react';

export type ThemeContextType = {
  theme?: string;
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({} as ThemeContextType);

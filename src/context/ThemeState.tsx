import React, { useState, useMemo, FC } from 'react';
import { Theme, ThemeContext } from './themeContext';

type ThemeStateProps = {
  children: React.ReactNode;
};

export const ThemeState: FC<ThemeStateProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>;
};

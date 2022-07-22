import React, { useState, useMemo, FC, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Theme, ThemeContext } from './themeContext';

type ThemeStateProps = {
  children: React.ReactNode;
};

export const ThemeState: FC<ThemeStateProps> = ({ children }) => {
  useEffect(() => {
    if (!Cookies.get('theme')) {
      setTheme('dark');
      Cookies.set('theme', 'dark');
    }
    if (Cookies.get('theme')) {
      setTheme(Cookies.get('theme'));
    }
  }, []);
  const [theme, setTheme] = useState<Theme>('dark');
  const toggleTheme = () => {
    const changeTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(changeTheme);
    Cookies.set('theme', changeTheme);
  };

  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>;
};

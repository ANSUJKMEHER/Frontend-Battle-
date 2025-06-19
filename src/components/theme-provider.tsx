
'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: string;
  setTheme: (theme: string) => void;
}

const initialState: ThemeProviderState = {
  theme: 'system', // This will be quickly overridden by useEffect
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'app-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }
    return localStorage.getItem(storageKey) || defaultTheme;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const value = {
    theme,
    setTheme: (newTheme: string) => {
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      light: string;
    };
    gradients: {
      primary: string;
      secondary: string;
      hero: string;
      cta: string;
    };
  };
}

const themes: Record<string, Theme> = {
  default: {
    name: 'Default',
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      accent: '#06B6D4',
      background: '#FFFFFF',
      surface: '#F8FAFC',
      text: {
        primary: '#1F2937',
        secondary: '#6B7280',
        light: '#9CA3AF'
      },
      gradients: {
        primary: 'from-blue-600 via-purple-600 to-blue-800',
        secondary: 'from-blue-500 via-cyan-500 to-purple-600',
        hero: 'from-blue-50 via-white to-purple-50',
        cta: 'from-blue-600 via-purple-600 to-blue-800'
      }
    }
  },
  blackWhite: {
    name: 'Black & White',
    colors: {
      primary: '#000000',
      secondary: '#374151',
      accent: '#6B7280',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      text: {
        primary: '#000000',
        secondary: '#374151',
        light: '#6B7280'
      },
      gradients: {
        primary: 'from-black via-gray-800 to-gray-900',
        secondary: 'from-gray-800 via-gray-700 to-black',
        hero: 'from-gray-50 via-white to-gray-100',
        cta: 'from-black via-gray-800 to-gray-900'
      }
    }
  }
};

interface ThemeContextType {
  currentTheme: Theme;
  themeName: string;
  toggleTheme: () => void;
}

const  ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export  const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<string>('default');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme]) {
      setThemeName(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = themeName === 'default' ? 'blackWhite' : 'default';
    setThemeName(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const currentTheme = themes[themeName];

  return (
    <ThemeContext.Provider value={{ currentTheme, themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
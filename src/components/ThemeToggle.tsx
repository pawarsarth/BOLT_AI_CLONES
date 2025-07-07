// components/ThemeToggle.jsx
import React from 'react';
import { Palette, MonitorSpeaker } from 'lucide-react';
import { useTheme } from './ThemeContext';

const ThemeToggle: React.FC = () => {
  const { themeName, toggleTheme, currentTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border group"
      style={{ 
        backgroundColor: currentTheme.name === 'Black & White' ? '#1F2937' : '#FFFFFF',
        borderColor: currentTheme.name === 'Black & White' ? '#374151' : '#E5E7EB'
      }}
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Palette 
          className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
            themeName === 'default' 
              ? 'text-blue-600 opacity-100 rotate-0' 
              : 'text-gray-400 opacity-0 rotate-90'
          }`}
        />
        <MonitorSpeaker 
          className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
            themeName === 'blackWhite' 
              ? 'text-white opacity-100 rotate-0' 
              : 'text-gray-400 opacity-0 -rotate-90'
          }`}
        />
      </div>
      
      <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        themeName === 'default' 
          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
          : 'bg-gradient-to-r from-black to-gray-600'
      }`}></div>
    </button>
  );
};

export default ThemeToggle;
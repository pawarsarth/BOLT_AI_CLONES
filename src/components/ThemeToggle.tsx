import React from 'react';
import { Palette, MonitorSpeaker } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { themeName, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-400 group"
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
              ? 'text-black opacity-100 rotate-0' 
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
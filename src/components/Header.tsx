import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code, Menu, X } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const { currentTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Chat', href: '/chat' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${currentTheme.colors.gradients.primary} group-hover:scale-110 transition-transform duration-300`}>
              <Code className="h-6 w-6 text-white" />
            </div>
            <span className={`text-xl font-bold ${currentTheme.colors.text.primary === '#000000' ? 'text-black' : 'text-gray-900'}`}>CodeAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-base font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? `bg-gradient-to-r ${currentTheme.colors.gradients.primary} bg-clip-text text-transparent`
                    : `${currentTheme.colors.text.primary === '#000000' ? 'text-black hover:text-gray-600' : 'text-gray-700 hover:text-blue-600'}`
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link
              to="/chat"
              className={`bg-gradient-to-r ${currentTheme.colors.gradients.primary} text-white px-6 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
            >
              Start Coding
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                currentTheme.colors.text.primary === '#000000' 
                  ? 'text-black hover:text-gray-600 hover:bg-gray-100' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive(item.href)
                      ? `bg-gradient-to-r ${currentTheme.colors.gradients.primary} bg-clip-text text-transparent`
                      : `${currentTheme.colors.text.primary === '#000000' ? 'text-black hover:text-gray-600 hover:bg-gray-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/chat"
                onClick={() => setIsMenuOpen(false)}
                className={`mx-4 mt-2 bg-gradient-to-r ${currentTheme.colors.gradients.primary} text-white px-6 py-3 rounded-lg text-sm font-semibold text-center hover:shadow-lg transition-all duration-300`}
              >
                Start Coding
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
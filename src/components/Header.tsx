import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code, Menu, X, Image } from 'lucide-react';
import { useTheme } from './ThemeContext';
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

  const handleChatAIClick = () => {
    window.open('https://unrivaled-taffy-ae8f7c.netlify.app/', '_blank');
  };

  const handleGenerateImagesClick = () => {
    window.open('https://images-generation.netlify.app/', '_blank');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes goldenBorderMove {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          
          @keyframes goldenGlow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3), 0 0 60px rgba(255, 215, 0, 0.2);
            }
            50% {
              box-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.6), 0 0 90px rgba(255, 215, 0, 0.4);
            }
          }
          
          .golden-border-btn {
            position: relative;
            overflow: hidden;
            background: linear-gradient(45deg, #FFD700, #FFA500, #FF8C00, #FFD700);
            background-size: 400% 400%;
            animation: goldenBorderMove 3s ease infinite, goldenGlow 2s ease-in-out infinite;
            border: 2px solid transparent;
          }
          
          .golden-border-btn::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #FFD700, #FFA500, #FF8C00, #FFD700, #FFD700);
            background-size: 400% 400%;
            animation: goldenBorderMove 3s ease infinite;
            border-radius: inherit;
            z-index: -1;
          }
          
          .golden-text {
            background: linear-gradient(45deg, #FFD700, #FFA500, #FF8C00);
            background-size: 400% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: goldenBorderMove 3s ease infinite;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
          }
          
          @keyframes neonSweep {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `
      }} />
      
      <header 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-500"
        style={{ 
          backgroundColor: `${currentTheme.colors.background}CC`,
          borderColor: currentTheme.name === 'Black & White' ? '#374151' : '#E5E7EB'
        }} 
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${currentTheme.colors.gradients.primary} group-hover:scale-110 transition-transform duration-300`}>
                <Code className="h-6 w-6 text-white" />
              </div>
              <span 
                className="text-xl font-bold transition-colors duration-300"
                style={{ color: currentTheme.colors.text.primary }}
              >
                CodeAI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link relative px-6 py-3 text-lg font-semibold transition-all duration-500 rounded-xl overflow-hidden group ${
                    isActive(item.href) ? 'active' : ''
                  }`}
                  style={{ 
                    color: isActive(item.href) 
                      ? 'transparent' 
                      : currentTheme.colors.text.secondary 
                  }}
                >
                  {/* Neon border animation */}
                  <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${
                    isActive(item.href) 
                      ? `bg-gradient-to-r ${currentTheme.colors.gradients.primary} opacity-100 animate-pulse` 
                      : 'bg-transparent opacity-0 group-hover:opacity-100'
                  } ${
                    !isActive(item.href) ? `group-hover:bg-gradient-to-r group-hover:${currentTheme.colors.gradients.primary}` : ''
                  }`}></div>
                  
                  {/* Moving neon border effect */}
                  <div 
                    className={`absolute inset-0 rounded-xl transition-all duration-700 ${
                      isActive(item.href) || 'group-hover:animate-pulse'
                    }`} 
                    style={{
                      background: isActive(item.href) 
                        ? `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)` 
                        : 'transparent',
                      backgroundSize: '200% 200%',
                      animation: isActive(item.href) ? 'neonSweep 2s ease-in-out infinite' : 'none'
                    }}
                  ></div>

                  {/* Text content */}
                  <span className={`relative z-10 transition-all duration-500 ${
                    isActive(item.href) 
                      ? 'text-white font-bold text-xl drop-shadow-lg' 
                      : 'group-hover:text-white group-hover:font-bold group-hover:text-xl group-hover:drop-shadow-lg'
                  }`}>
                    {item.name}
                  </span>

                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${
                    isActive(item.href) 
                      ? 'shadow-lg shadow-blue-500/50' 
                      : 'group-hover:shadow-lg group-hover:shadow-blue-500/50'
                  }`}></div>
                </Link>
              ))}
              {/* <Link
                to="/chat"
                onClick={() => setIsMenuOpen(false)}
                className={`mx-4 mt-2 golden-border-btn text-white px-6 py-3 rounded-lg text-sm font-semibold text-center hover:shadow-lg transition-all duration-300 relative z-10`}
              >
                <span className="golden-text">Start Coding</span>
              </Link> */}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <Link
                to="/chat"
                className={`golden-border-btn text-white px-6 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 relative z-10`}
              >
                <span className="golden-text">Start Coding</span>
              </Link>
              <button
                onClick={handleChatAIClick}
                className={`bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
              >
                Chat AI
              </button>
              <button
                onClick={handleGenerateImagesClick}
                className={`bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2`}
              >
                <Image className="h-4 w-4" />
                <span>Generate Images</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg transition-colors duration-300"
                style={{ color: currentTheme.colors.text.primary }}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div 
              className="md:hidden py-4 border-t backdrop-blur-md transition-all duration-300"
              style={{ 
                backgroundColor: `${currentTheme.colors.background}F5`,
                borderColor: currentTheme.name === 'Black & White' ? '#374151' : '#E5E7EB'
              }}
            >
              <div className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`mobile-nav-link relative px-4 py-3 rounded-lg text-lg font-semibold transition-all duration-500 overflow-hidden group ${
                      isActive(item.href) ? 'active' : ''
                    }`}
                    style={{ 
                      color: isActive(item.href) 
                        ? 'transparent' 
                        : currentTheme.colors.text.secondary 
                    }}
                  >
                    {/* Mobile neon background */}
                    <div className={`absolute inset-0 rounded-lg transition-all duration-500 ${
                      isActive(item.href) 
                        ? `bg-gradient-to-r ${currentTheme.colors.gradients.primary} opacity-100` 
                        : 'bg-transparent opacity-0 group-hover:opacity-100'
                    } ${
                      !isActive(item.href) ? `group-hover:bg-gradient-to-r group-hover:${currentTheme.colors.gradients.primary}` : ''
                    }`}></div>
                    
                    <span className={`relative z-10 transition-all duration-500 ${
                      isActive(item.href) 
                        ? 'text-white font-bold' 
                        : 'group-hover:text-white group-hover:font-bold'
                    }`}>
                      {item.name}
                    </span>
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleChatAIClick();
                    setIsMenuOpen(false);
                  }}
                  className={`mx-4 mt-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg text-sm font-semibold text-center hover:shadow-lg transition-all duration-300`}
                >
                  Chat AI
                </button>
                <button
                  onClick={() => {
                    handleGenerateImagesClick();
                    setIsMenuOpen(false);
                  }}
                  className={`mx-4 mt-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-lg text-sm font-semibold text-center hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2`}
                >
                  <Image className="h-4 w-4" />
                  <span>Generate Images</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;

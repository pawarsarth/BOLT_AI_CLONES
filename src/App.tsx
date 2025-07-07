import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider,useTheme } from './components/ThemeContext';
import Header from './components/Header';
import Landing from './Landing';
import Chat from './components/chat';
import Pricing from './Pricing';
import Features from './Features';

const AppContent = () => {
  const { currentTheme } = useTheme();
  
  return (
    <Router>
      <div 
        className="min-h-screen transition-all duration-500"
        style={{ 
          backgroundColor: currentTheme.colors.background,
          color: currentTheme.colors.text.primary 
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
        </Routes>
      </div>
    </Router>
  );
};


function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
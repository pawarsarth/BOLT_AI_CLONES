import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import Header from './components/Header';
import Landing from './Landing';
import Chat from './components/chat';
import Pricing from './Pricing';
import Features from './Features';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/features" element={<Features />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
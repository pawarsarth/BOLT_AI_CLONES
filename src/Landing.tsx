import React, { useEffect, useRef } from 'react';
import { ArrowRight, Code, Zap, Shield, Sparkles, CheckCircle, Star } from 'lucide-react';
import { useTheme } from './components/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const Landing = () => {
  const { currentTheme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [showDemoAlert, setShowDemoAlert] = useState(false);

const handleDemoClick = () => {
  setShowDemoAlert(true);
  setTimeout(() => setShowDemoAlert(false), 3000); // hides after 3s
};

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className={`relative min-h-screen flex items-center justify-center bg-gradient-to-br ${currentTheme.colors.gradients.hero} transition-all duration-500`}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll opacity-0">
            <div 
              className="inline-flex items-center px-5 py-3 rounded-full shadow-lg border mb-10 transition-all duration-500"
              style={{ 
                backgroundColor: currentTheme.name === 'Black & White' ? '#1F2937' : '#FFFFFF',
                borderColor: currentTheme.name === 'Black & White' ? '#374151' : '#E5E7EB'
              }}
            >
              <Sparkles className="h-5 w-5 text-yellow-500 mr-3" />
              <span 
                className="text-base font-semibold transition-colors duration-300"
                style={{ color: currentTheme.colors.text.secondary }}
              >
                AI-Powered Development Platform
              </span>
            </div>
            
            <h1 
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-10 leading-tight transition-colors duration-500"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Build{' '}
              <span className={`bg-gradient-to-r ${currentTheme.colors.gradients.secondary} bg-clip-text text-transparent`}>
                Faster
              </span>
              <br />
              Code{' '}
              <span className={`bg-gradient-to-r ${currentTheme.colors.gradients.primary} bg-clip-text text-transparent`}>
                Smarter
              </span>
            </h1>
            
            <p 
              className="text-2xl md:text-3xl mb-16 max-w-4xl mx-auto leading-relaxed font-medium transition-colors duration-500"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              Transform your development workflow with AI-powered coding assistance. 
              Write, debug, and deploy applications at unprecedented speed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Link
                to="/chat"
                className={`group bg-gradient-to-r ${currentTheme.colors.gradients.primary} text-white px-10 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center`}
              >
                Start Coding
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
             <div className="relative">
  <button 
    onClick={handleDemoClick}
    className="border-2 px-10 py-5 rounded-2xl text-xl font-semibold transition-all duration-300"
    style={{ 
      borderColor: currentTheme.name === 'Black & White' ? '#374151' : '#D1D5DB',
      color: currentTheme.colors.text.secondary 
    }}
  >
    Watch Demo
  </button>

  {showDemoAlert && (
    <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 px-6 py-3 rounded-xl shadow-md border border-yellow-300 animate-fadeInUp">
      🎥 Demo video coming soon! Stay tuned.
    </div>
  )}
</div>

            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
              <div className="text-center group">
                <div 
                  className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  10x
                </div>
                <div 
                  className="text-xl font-medium"
                  style={{ color: currentTheme.colors.text.secondary }}
                >
                  Faster Development
                </div>
              </div>
              <div className="text-center group">
                <div 
                  className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  50+
                </div>
                <div 
                  className="text-xl font-medium"
                  style={{ color: currentTheme.colors.text.secondary }}
                >
                  Programming Languages
                </div>
              </div>
              <div className="text-center group">
                <div 
                  className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  99.9%
                </div>
                <div 
                  className="text-xl font-medium"
                  style={{ color: currentTheme.colors.text.secondary }}
                >
                  Uptime Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef} 
        className="py-28 transition-all duration-500"
        style={{ backgroundColor: currentTheme.name === 'Black & White' ? '#111827' : '#FFFFFF' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24 animate-on-scroll opacity-0">
            <h2 
              className="text-5xl md:text-6xl font-bold mb-8 transition-colors duration-500"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Supercharge Your{' '}
              <span className={`bg-gradient-to-r ${currentTheme.colors.gradients.primary} bg-clip-text text-transparent`}>
                Development
              </span>
            </h2>
            <p 
              className="text-2xl max-w-3xl mx-auto font-medium"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              Experience the future of coding with our advanced AI assistant
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Code className="h-10 w-10" />,
                title: "Smart Code Generation",
                description: "AI-powered code generation that understands context and writes production-ready code with intelligent suggestions",
                gradient: currentTheme.name === 'Black & White' ? "from-black to-gray-700" : "from-blue-500 to-cyan-500"
              },
              {
                icon: <Zap className="h-10 w-10" />,
                title: "Lightning Fast",
                description: "Get instant responses and code suggestions with our optimized AI infrastructure and blazing-fast performance",
                gradient: currentTheme.name === 'Black & White' ? "from-gray-800 to-gray-600" : "from-purple-500 to-pink-500"
              },
              {
                icon: <Shield className="h-10 w-10" />,
                title: "Secure & Private",
                description: "Your code stays private with enterprise-grade security, encryption, and comprehensive data protection",
                gradient: currentTheme.name === 'Black & White' ? "from-gray-700 to-gray-500" : "from-green-500 to-teal-500"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 group rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border hover:-translate-y-2"
                style={{ 
                  backgroundColor: currentTheme.name === 'Black & White' ? '#1F2937' : '#FFFFFF',
                  borderColor: currentTheme.name === 'Black & White' ? '#374151' : '#E5E7EB',
                  animationDelay: `${index * 0.2}s` 
                }}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 
                  className="text-2xl font-bold mb-6"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: currentTheme.colors.text.secondary }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section 
        className={`py-28 bg-gradient-to-br ${currentTheme.colors.gradients.hero} transition-all duration-500`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24 animate-on-scroll opacity-0">
            <h2 
              className="text-5xl font-bold mb-8 transition-colors duration-500"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Loved by Developers Worldwide
            </h2>
            <p 
              className="text-2xl font-medium"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              See what our users are saying
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                name: "Sarah Chen",
                role: "Senior Developer",
                company: "TechCorp",
                content: "This AI assistant has completely transformed how I write code. It's like having a senior developer pair programming with me 24/7. The suggestions are incredibly accurate and contextual.",
                rating: 5,
                avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
              },
              {
                name: "Marcus Johnson",
                role: "Startup Founder",
                company: "InnovateLab",
                content: "We shipped our MVP 3x faster using this platform. The code quality and suggestions are absolutely incredible. It's revolutionized our development process completely.",
                rating: 5,
                avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
              },
              {
                name: "Elena Rodriguez",
                role: "Full Stack Engineer",
                company: "DevStudio",
                content: "The best coding assistant I've ever used. It understands context better than any other AI tool out there. The learning curve was minimal and the results were immediate.",
                rating: 5,
                avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                style={{ 
                  backgroundColor: currentTheme.name === 'Black & White' ? '#1F2937' : '#FFFFFF',
                  animationDelay: `${index * 0.15}s` 
                }}
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p 
                  className="mb-8 italic text-lg leading-relaxed"
                  style={{ color: currentTheme.colors.text.secondary }}
                >
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div 
                      className="font-bold text-lg"
                      style={{ color: currentTheme.colors.text.primary }}
                    >
                      {testimonial.name}
                    </div>
                    <div 
                      className="text-base"
                      style={{ color: currentTheme.colors.text.secondary }}
                    >
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section 
        className={`py-28 bg-gradient-to-r ${currentTheme.colors.gradients.cta} transition-all duration-500`}
      >
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll opacity-0">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-10">
              Ready to Code the Future?
            </h2>
            <p 
              className={`text-2xl mb-16 max-w-3xl mx-auto font-medium leading-relaxed ${
                currentTheme.name === 'Black & White' ? 'text-gray-300' : 'text-blue-100'
              }`}
            >
              Join thousands of developers who are already building amazing applications with our AI-powered platform. Start your journey today.
            </p>
            <Link
              to="/chat"
              className="inline-flex items-center bg-white text-black px-12 py-6 rounded-2xl text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
            >
              Get Started Free
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
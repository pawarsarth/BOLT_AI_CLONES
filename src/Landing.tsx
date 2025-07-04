import React, { useEffect, useRef } from 'react';
import { ArrowRight, Code, Zap, Shield, Sparkles, CheckCircle, Star } from 'lucide-react';
import { useTheme } from './components/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import { useNavigate } from 'react-router-dom';


const Landing = () => {
  const { currentTheme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();


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
      <section ref={heroRef} className={`relative min-h-screen flex items-center justify-center bg-gradient-to-br ${currentTheme.colors.gradients.hero}`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll opacity-0">
            <div className="inline-flex items-center px-5 py-3 bg-white rounded-full shadow-lg border border-gray-200 mb-10">
              <Sparkles className="h-5 w-5 text-yellow-500 mr-3" />
              <span className={`text-base font-semibold ${currentTheme.colors.text.secondary}`}>AI-Powered Development Platform</span>
            </div>
            
            <h1 className={`text-6xl md:text-8xl lg:text-9xl font-bold ${currentTheme.colors.text.primary} mb-10 leading-tight`}>
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
            
            <p className={`text-2xl md:text-3xl ${currentTheme.colors.text.secondary} mb-16 max-w-4xl mx-auto leading-relaxed font-medium`}>
              Transform your development workflow with AI-powered coding assistance. 
              Write, debug, and deploy applications at unprecedented speed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
             <button
  onClick={() => navigate('/chat')}
  className={`group bg-gradient-to-r ${currentTheme.colors.gradients.primary} text-white px-10 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center`}
>
  Start Coding
  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
</button>

              <button
  onClick={() => alert('🎥 Demo feature is coming soon! Stay tuned.')}
  className="border-2 border-gray-300 text-gray-800 px-10 py-5 rounded-2xl text-xl font-semibold hover:border-gray-500 hover:bg-gray-100 hover:text-black transition-all duration-300 flex items-center gap-3"
>
  <svg
    className="w-6 h-6 text-gray-500 group-hover:text-black transition duration-200"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-5.197-3.03A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  Watch Demo
</button>

            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
              <div className="text-center group">
                <div className={`text-5xl font-bold ${currentTheme.colors.text.primary} mb-3 group-hover:scale-110 transition-transform duration-300`}>10x</div>
                <div className={`text-xl ${currentTheme.colors.text.secondary} font-medium`}>Faster Development</div>
              </div>
              <div className="text-center group">
                <div className={`text-5xl font-bold ${currentTheme.colors.text.primary} mb-3 group-hover:scale-110 transition-transform duration-300`}>50+</div>
                <div className={`text-xl ${currentTheme.colors.text.secondary} font-medium`}>Programming Languages</div>
              </div>
              <div className="text-center group">
                <div className={`text-5xl font-bold ${currentTheme.colors.text.primary} mb-3 group-hover:scale-110 transition-transform duration-300`}>99.9%</div>
                <div className={`text-xl ${currentTheme.colors.text.secondary} font-medium`}>Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24 animate-on-scroll opacity-0">
            <h2 className={`text-5xl md:text-6xl font-bold ${currentTheme.colors.text.primary} mb-8`}>
              Supercharge Your{' '}
              <span className={`bg-gradient-to-r ${currentTheme.colors.gradients.primary} bg-clip-text text-transparent`}>
                Development
              </span>
            </h2>
            <p className={`text-2xl ${currentTheme.colors.text.secondary} max-w-3xl mx-auto font-medium`}>
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
                className="animate-on-scroll opacity-0 group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className={`text-2xl font-bold ${currentTheme.colors.text.primary} mb-6`}>{feature.title}</h3>
                <p className={`text-lg ${currentTheme.colors.text.secondary} leading-relaxed`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className={`py-28 bg-gradient-to-br ${currentTheme.colors.gradients.hero}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24 animate-on-scroll opacity-0">
            <h2 className={`text-5xl font-bold ${currentTheme.colors.text.primary} mb-8`}>
              Loved by Developers Worldwide
            </h2>
            <p className={`text-2xl ${currentTheme.colors.text.secondary} font-medium`}>See what our users are saying</p>
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
                className="animate-on-scroll opacity-0 bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className={`${currentTheme.colors.text.secondary} mb-8 italic text-lg leading-relaxed`}>"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className={`font-bold ${currentTheme.colors.text.primary} text-lg`}>{testimonial.name}</div>
                    <div className={`${currentTheme.colors.text.secondary} text-base`}>{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className={`py-28 bg-gradient-to-r ${currentTheme.colors.gradients.cta}`}>
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll opacity-0">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-10">
              Ready to Code the Future?
            </h2>
            <p className={`text-2xl mb-16 max-w-3xl mx-auto font-medium leading-relaxed ${
              currentTheme.name === 'Black & White' ? 'text-gray-300' : 'text-blue-100'
            }`}>
              Join thousands of developers who are already building amazing applications with our AI-powered platform. Start your journey today.
            </p>
            <button
  onClick={() => navigate('/chat')}
  className="inline-flex items-center bg-white text-black px-12 py-6 rounded-2xl text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
>
  Get Started Free
  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
</button>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
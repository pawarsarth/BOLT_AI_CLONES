import React from 'react';
import { 
  Code, 
  Zap, 
  Shield, 
  Brain, 
  GitBranch, 
  Database, 
  Smartphone, 
  Globe, 
  Users, 
  BarChart3,
  Lightbulb,
  Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from './components/ThemeContext';

const Features: React.FC = () => {
  const { currentTheme } = useTheme();

  const mainFeatures = [
    {
      icon: <Brain className="h-12 w-12" />,
      title: 'Advanced AI Engine',
      description: 'Powered by state-of-the-art language models trained on billions of lines of code',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Code className="h-12 w-12" />,
      title: 'Smart Code Generation',
      description: 'Generate production-ready code with context awareness and best practices',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: 'Lightning Fast',
      description: 'Get instant responses with our optimized infrastructure and caching',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: 'Enterprise Security',
      description: 'Bank-level security with end-to-end encryption and privacy protection',
      gradient: 'from-green-500 to-teal-500'
    }
  ];

  const additionalFeatures = [
    {
      icon: <GitBranch className="h-8 w-8" />,
      title: 'Version Control Integration',
      description: 'Seamlessly integrate with Git, GitHub, GitLab, and other VCS platforms'
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: 'Database Design',
      description: 'Generate optimized database schemas and queries for any database system'
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'Mobile Development',
      description: 'Build native and cross-platform mobile apps with React Native, Flutter'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Web Technologies',
      description: 'Full-stack web development with modern frameworks and libraries'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Team Collaboration',
      description: 'Share code snippets, collaborate on projects, and learn together'
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Analytics & Insights',
      description: 'Track your coding progress and get personalized improvement suggestions'
    }
  ];

  const codeExample = `// AI-generated React component
import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <Spinner />;
  
  return (
    <div className="profile-card">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  );
};`;

  return (
    <div 
      className="min-h-screen pt-16 transition-all duration-500"
      style={{ backgroundColor: currentTheme.name === 'Black & White' ? '#111827' : '#F9FAFB' }}
    >
      {/* Hero Section */}
      <section className={`py-20 bg-gradient-to-br ${currentTheme.colors.gradients.hero} transition-all duration-500`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6 transition-colors duration-500"
            style={{ color: currentTheme.colors.text.primary }}
          >
            Powerful Features for{' '}
            <span className={`bg-gradient-to-r ${currentTheme.colors.gradients.primary} bg-clip-text text-transparent`}>
              Modern Developers
            </span>
          </h1>
          <p 
            className="text-xl max-w-3xl mx-auto mb-12"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            Discover all the tools and capabilities that make our AI coding assistant 
            the perfect companion for your development journey.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section 
        className="py-20 transition-all duration-500"
        style={{ backgroundColor: currentTheme.name === 'Black & White' ? '#1F2937' : '#FFFFFF' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className="group rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border"
                style={{ 
                  backgroundColor: currentTheme.name === 'Black & White' ? '#111827' : '#FFFFFF',
                  borderColor: currentTheme.name === 'Black & White' ? '#374151' : '#E5E7EB'
                }}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 
                  className="text-xl font-bold mb-4"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="leading-relaxed"
                  style={{ color: currentTheme.colors.text.secondary }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section 
        className="py-20 transition-all duration-500"
        style={{ backgroundColor: currentTheme.name === 'Black & White' ? '#000000' : '#1F2937' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                See AI Code Generation in Action
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Watch how our AI understands your requirements and generates 
                clean, production-ready code with proper structure and best practices.
              </p>
              <div className="flex items-center space-x-4">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                <span className="text-gray-300">Context-aware suggestions</span>
              </div>
              <div className="flex items-center space-x-4 mt-3">
                <Rocket className="h-6 w-6 text-blue-400" />
                <span className="text-gray-300">Production-ready output</span>
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 overflow-hidden">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-4">UserProfile.jsx</span>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{codeExample}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section 
        className="py-20 transition-all duration-500"
        style={{ backgroundColor: currentTheme.name === 'Black & White' ? '#1F2937' : '#FFFFFF' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold mb-6"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Everything You Need to Build Amazing Apps
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              From frontend to backend, mobile to web, our AI assistant covers 
              all aspects of modern software development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border"
                style={{ 
                  backgroundColor: currentTheme.name === 'Black & White' ? '#111827' : '#FFFFFF',
                  borderColor: currentTheme.name === 'Black & White' ? '#374151' : '#E5E7EB'
                }}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${currentTheme.colors.gradients.primary} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 
                  className="text-lg font-semibold mb-3"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: currentTheme.colors.text.secondary }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 bg-gradient-to-r ${currentTheme.colors.gradients.cta} transition-all duration-500`}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Experience These Features?
          </h2>
          <p 
            className={`text-xl mb-12 max-w-2xl mx-auto ${
              currentTheme.name === 'Black & White' ? 'text-gray-300' : 'text-blue-100'
            }`}
          >
            Join thousands of developers who are already building faster and smarter with our AI assistant.
          </p>
          <Link
            to="/chat"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Start Building Now
            <Rocket className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Features;
import React, { useState } from 'react';
import { Check, Zap, Crown, Rocket, Clock, Database, Shield, Users, BarChart3, Cpu, X, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from './components/ThemeContext';

const Pricing: React.FC = () => {
  const { currentTheme } = useTheme();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for getting started with AI coding',
      icon: <Zap className="h-8 w-8" />,
      features: [
        { text: '100 AI requests per month', available: true },
        { text: 'Basic code generation', available: true },
        { text: 'Community support', available: true },
        { text: 'Standard response time', available: true },
        { text: 'Basic debugging assistance', available: false, comingSoon: true }
      ],
      buttonText: 'Get Started',
      popular: false,
      available: true
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/month',
      description: 'For professional developers and teams',
      icon: <Crown className="h-8 w-8" />,
      features: [
        { text: 'Unlimited AI requests', available: true },
        { text: 'Advanced code generation', available: true },
        { text: 'Priority support', available: true },
        { text: 'Fast response time', available: true },
        { text: 'Code review assistance', available: true },
        { text: 'Multiple programming languages', available: true },
        { text: 'Database schema generation', available: false, comingSoon: true },
        { text: 'API documentation generator', available: false, comingSoon: true }
      ],
      buttonText: 'Start Free Trial',
      popular: true,
      available: false
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For large teams and organizations',
      icon: <Rocket className="h-8 w-8" />,
      features: [
        { text: 'Everything in Pro', available: true },
        { text: 'Custom AI models', available: true },
        { text: 'Dedicated support', available: true },
        { text: 'SLA guarantee', available: true },
        { text: 'Advanced analytics', available: false, comingSoon: true },
        { text: 'Team collaboration tools', available: false, comingSoon: true },
        { text: 'Custom integrations', available: false, comingSoon: true },
        { text: 'Advanced security features', available: false, comingSoon: true },
        { text: 'Performance monitoring', available: false, comingSoon: true }
      ],
      buttonText: 'Contact Sales',
      popular: false,
      available: false
    }
  ];

  const comingSoonFeatures = [
    {
      icon: <Database className="h-8 w-8" />,
      title: 'Database Integration',
      description: 'Direct database connections, schema generation, and query optimization',
      category: 'Data Management'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Advanced Security',
      description: 'Code vulnerability scanning, security best practices, and compliance checks',
      category: 'Security'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Team Collaboration',
      description: 'Real-time code sharing, team workspaces, and collaborative debugging',
      category: 'Collaboration'
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Analytics Dashboard',
      description: 'Code quality metrics, productivity insights, and performance tracking',
      category: 'Analytics'
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: 'Custom AI Models',
      description: 'Train AI on your codebase, custom coding patterns, and domain-specific knowledge',
      category: 'AI Enhancement'
    }
  ];

  const handlePlanClick = (plan: any) => {
    if (plan.available) {
      // Handle available plans (like Free plan)
      console.log(`Redirecting to ${plan.name} plan`);
    } else {
      // Show coming soon notification
      setShowComingSoon(true);
      setTimeout(() => {
        setShowComingSoon(false);
        setShowEmailForm(true);
      }, 2000);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubmitted(true);
      setEmail('');
      setTimeout(() => {
        setShowEmailForm(false);
        setEmailSubmitted(false);
      }, 2000);
    }
  };

  return (
    <div 
      className="min-h-screen pt-16 transition-all duration-500 relative"
      style={{ backgroundColor: currentTheme.name === 'Black & White' ? '#111827' : '#F9FAFB' }}
    >
      {/* Coming Soon Notification */}
      {showComingSoon && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl animate-scaleIn">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon!</h3>
            <p className="text-gray-600 mb-4">
              This feature is currently in development and will be available soon.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">75% Complete</p>
          </div>
        </div>
      )}

      {/* Email Form Modal */}
      {showEmailForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl animate-scaleIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Get Notified</h3>
              <button
                onClick={() => setShowEmailForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            {emailSubmitted ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h4>
                <p className="text-gray-600">
                  We'll notify you as soon as this feature becomes available.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit}>
                <p className="text-gray-600 mb-6">
                  Enter your email to be notified when this feature launches.
                </p>
                <div className="mb-6">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Notify Me
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6 transition-colors duration-500"
            style={{ color: currentTheme.colors.text.primary }}
          >
            Choose Your{' '}
            <span className={`bg-gradient-to-r ${currentTheme.colors.gradients.primary} bg-clip-text text-transparent`}>
              Plan
            </span>
          </h1>
          <p 
            className="text-xl max-w-3xl mx-auto mb-8"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            Start coding with AI assistance today. Upgrade anytime as your needs grow.
          </p>
          <div className="inline-flex items-center px-4 py-2 rounded-full border-2 border-dashed border-orange-300 bg-orange-50">
            <Clock className="h-5 w-5 text-orange-600 mr-2" />
            <span className="text-orange-700 font-medium">New features launching soon!</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
              }`}
              style={{ 
                backgroundColor: currentTheme.name === 'Black & White' ? '#1F2937' : '#FFFFFF'
              }}
            >
              {plan.popular && (
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${currentTheme.colors.gradients.primary} text-white px-6 py-2 rounded-full text-sm font-semibold`}>
                  Most Popular
                </div>
              )}

              <div className="p-8">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${currentTheme.colors.gradients.primary} text-white mb-6`}>
                  {plan.icon}
                </div>

                {/* Plan Name */}
                <h3 
                  className="text-2xl font-bold mb-2"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  {plan.name}
                </h3>
                <p 
                  className="mb-6"
                  style={{ color: currentTheme.colors.text.secondary }}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <span 
                    className="text-5xl font-bold"
                    style={{ color: currentTheme.colors.text.primary }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span 
                      className="text-xl"
                      style={{ color: currentTheme.colors.text.secondary }}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center justify-between">
                      <div className="flex items-center">
                        {feature.available ? (
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        ) : (
                          <Clock className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                        )}
                        <span 
                          className={feature.available ? '' : 'opacity-70'}
                          style={{ color: currentTheme.colors.text.secondary }}
                        >
                          {feature.text}
                        </span>
                      </div>
                      {feature.comingSoon && (
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                          Soon
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  onClick={() => handlePlanClick(plan)}
                  className={`w-full py-4 px-6 rounded-2xl text-lg font-semibold transition-all duration-300 relative overflow-hidden ${
                    plan.popular
                      ? `bg-gradient-to-r ${currentTheme.colors.gradients.primary} text-white hover:shadow-lg transform hover:scale-105`
                      : 'border-2 hover:shadow-lg'
                  } ${!plan.available ? 'cursor-pointer' : ''}`}
                  style={!plan.popular ? {
                    borderColor: currentTheme.name === 'Black & White' ? '#374151' : '#D1D5DB',
                    color: currentTheme.colors.text.secondary
                  } : {}}
                >
                  {!plan.available && (
                    <div className="absolute top-2 right-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                    </div>
                  )}
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 
              className="text-4xl font-bold mb-4"
              style={{ color: currentTheme.colors.text.primary }}
            >
              🚀 Coming Soon Features
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              We're constantly innovating to bring you the most advanced AI coding experience. 
              Here's what's in our development pipeline:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoonFeatures.map((feature, index) => (
              <div
                key={index}
                className="relative rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-dashed border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 hover:-translate-y-1"
              >
                <div className="absolute top-4 right-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    COMING SOON
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white mb-4">
                    {feature.icon}
                  </div>
                  <div className="text-sm font-medium text-orange-600 mb-2">
                    {feature.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div 
              className="inline-flex items-center px-6 py-3 rounded-full border-2"
              style={{
                backgroundColor: currentTheme.name === 'Black & White' ? '#1F2937' : '#FFFFFF',
                borderColor: currentTheme.name === 'Black & White' ? '#374151' : '#E5E7EB'
              }}
            >
              <Clock className="h-5 w-5 text-blue-500 mr-2" />
              <span 
                className="font-medium"
                style={{ color: currentTheme.colors.text.primary }}
              >
                Expected launch: Q2 2025
              </span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 
            className="text-4xl font-bold text-center mb-12"
            style={{ color: currentTheme.colors.text.primary }}
          >
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'Can I change plans anytime?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and you\'ll only pay the difference.'
              },
              {
                question: 'Is there a free trial?',
                answer: 'Yes, we offer a 14-day free trial for the Pro plan with full access to all currently available features.'
              },
              {
                question: 'What programming languages are supported?',
                answer: 'We support 50+ programming languages including Python, JavaScript, Java, C++, Go, Rust, and many more. New languages are added regularly.'
              },
              {
                question: 'When will the coming soon features be available?',
                answer: 'Most features are planned for Q2 2025. Pro and Enterprise users will get early access to beta versions as they become available.'
              },
              {
                question: 'Is my code secure?',
                answer: 'Absolutely. We use enterprise-grade encryption and never store or share your code. All processing happens in secure, isolated environments.'
              },
              {
                question: 'Do coming soon features cost extra?',
                answer: 'No! All coming soon features will be included in your current plan tier at no additional cost. We believe in growing with our users.'
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ 
                  backgroundColor: currentTheme.name === 'Black & White' ? '#1F2937' : '#FFFFFF'
                }}
              >
                <h3 
                  className="text-lg font-semibold mb-3"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  {faq.question}
                </h3>
                <p style={{ color: currentTheme.colors.text.secondary }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup for Updates */}
        <div 
          className={`mt-20 rounded-3xl p-8 bg-gradient-to-r ${currentTheme.colors.gradients.primary} text-white text-center`}
        >
          <h3 className="text-3xl font-bold mb-4">Stay Updated on New Features</h3>
          <p className="text-xl mb-8 opacity-90">
            Be the first to know when new features launch and get exclusive early access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
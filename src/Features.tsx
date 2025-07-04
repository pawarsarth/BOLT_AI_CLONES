import React from 'react';
import { Code2, Zap, Shield, Cpu, Database, Globe, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Advanced Code Generation",
      description: "Generate production-ready code in multiple programming languages with intelligent context awareness.",
      details: ["Multi-language support", "Context-aware suggestions", "Best practices enforcement", "Code optimization"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Performance",
      description: "Experience blazing-fast responses with our optimized AI infrastructure and global CDN.",
      details: ["Sub-second responses", "Global edge network", "Auto-scaling infrastructure", "99.9% uptime SLA"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Your code and data are protected with enterprise-grade security and privacy controls.",
      details: ["End-to-end encryption", "SOC 2 compliance", "Private cloud options", "Data residency controls"],
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "AI-Powered Intelligence",
      description: "Leverage cutting-edge AI models trained on billions of lines of code for superior assistance.",
      details: ["Latest AI models", "Continuous learning", "Code pattern recognition", "Intelligent debugging"],
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Seamless Integration",
      description: "Integrate with your existing development workflow and tools without disruption.",
      details: ["IDE extensions", "API access", "Webhook support", "CI/CD integration"],
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Accessibility",
      description: "Access your AI assistant from anywhere in the world with consistent performance.",
      details: ["Multi-region deployment", "Mobile responsive", "Offline capabilities", "24/7 availability"],
      gradient: "from-teal-500 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Powerful{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Features
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the comprehensive suite of features that make our AI assistant 
              the most powerful coding companion for developers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                
                <ul className="space-y-3">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-gray-700">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient} mr-3`}></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Experience All Features
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Try our comprehensive feature set and see how it can transform your development workflow.
          </p>
          <Link
            to="/chat"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Start Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Features;
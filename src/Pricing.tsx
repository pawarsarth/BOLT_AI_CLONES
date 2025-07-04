import React, { useState } from 'react';
import { Check, Zap, Crown, Building, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handlePurchaseClick = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 3000);
  };

  const plans = [
    {
      name: "Free",
      icon: <Zap className="h-6 w-6" />,
      price: "$0",
      period: "forever",
      description: "Perfect for trying out our AI assistant",
      features: [
        "100 AI requests per month",
        "Basic code generation",
        "Community support",
        "Standard response time",
        "Basic IDE integration"
      ],
      gradient: "from-gray-400 to-gray-600",
      popular: false,
      buttonText: "Get Started Free",
      buttonStyle: "border-2 border-gray-300 text-gray-700 hover:border-gray-400"
    },
    {
      name: "Pro",
      icon: <Crown className="h-6 w-6" />,
      price: "$29",
      period: "per month",
      description: "Ideal for professional developers",
      features: [
        "Unlimited AI requests",
        "Advanced code generation",
        "Priority support",
        "Fast response time",
        "Full IDE integration",
        "Custom code templates",
        "Advanced debugging",
        "Code review assistance"
      ],
      gradient: "from-blue-500 to-purple-600",
      popular: true,
      buttonText: "Start Pro Trial",
      buttonStyle: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
    },
    {
      name: "Enterprise",
      icon: <Building className="h-6 w-6" />,
      price: "$99",
      period: "per month",
      description: "Built for teams and organizations",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Admin dashboard",
        "SSO integration",
        "Custom AI models",
        "On-premise deployment",
        "24/7 phone support",
        "SLA guarantee",
        "Custom integrations"
      ],
      gradient: "from-purple-600 to-pink-600",
      popular: false,
      buttonText: "Contact Sales",
      buttonStyle: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center animate-pulse">
            <div className="mb-4">
              <div className="inline-flex p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon!</h3>
            <p className="text-gray-600">
              Our pricing plans will be available soon. Stay tuned for updates!
            </p>
          </div>
        </div>
      )}

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
              Simple{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Choose the perfect plan for your development needs. 
              Start free and upgrade as you grow.
            </p>
            
            <div className="inline-flex items-center bg-white rounded-full p-1 shadow-lg border border-gray-200">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium transition-all duration-200">
                Monthly
              </button>
              <button className="px-6 py-2 text-gray-600 rounded-full text-sm font-medium hover:text-gray-900 transition-all duration-200">
                Yearly (Save 20%)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border ${
                  plan.popular 
                    ? 'border-blue-200 ring-4 ring-blue-100 ring-opacity-50' 
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.gradient} text-white mb-4`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={handlePurchaseClick}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Get answers to common questions about our pricing and plans.</p>
          </div>
          
          <div className="space-y-8">
            {[
              {
                question: "Can I change my plan at any time?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                question: "Is there a free trial for paid plans?",
                answer: "Yes, we offer a 14-day free trial for both Pro and Enterprise plans. No credit card required."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise customers."
              },
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Absolutely. You can cancel your subscription at any time from your account settings. No cancellation fees."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join thousands of developers who are already coding faster and smarter with our AI assistant.
          </p>
          <Link
            to="/chat"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Start Free Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Star, Zap, Crown, Users, Code, MessageSquare, Shield, Headphones } from 'lucide-react';

const Subscription = () => {
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: 0,
      yearlyPrice: 0,
      description: "Perfect for getting started with developer networking",
      icon: <Users size={24} />,
      buttonText: "Get Started",
      buttonStyle: "bg-gray-600 hover:bg-gray-700 text-white",
      features: [
        { name: "Up to 5 matches per day", included: true },
        { name: "Basic profile creation", included: true },
        { name: "Community forums access", included: true },
        { name: "Basic messaging", included: true },
        { name: "Advanced matching algorithm", included: false },
        { name: "Unlimited matches", included: false },
        { name: "Enhanced profile features", included: false },
      ]
    },
    {
      name: "Pro",
      price: 19,
      yearlyPrice: 15,
      description: "For serious developers looking to expand their network",
      icon: <Code size={24} />,
      buttonText: "Start Pro Trial",
      buttonStyle: "bg-gradient-to-r from-purple-600 to-blue-500 hover:shadow-lg text-white",
      popular: true,
      features: [
        { name: "Unlimited matches", included: true },
        { name: "Advanced matching algorithm", included: true },
        { name: "Enhanced profile features", included: true },
        { name: "Private project repositories", included: true },
        { name: "Video call integration", included: true },
        { name: "Skill verification badges", included: true },
        { name: "Dedicated account manager", included: false }
      ]
    },
    {
      name: "Team",
      price: 49,
      yearlyPrice: 39,
      description: "Built for teams and organizations seeking top talent",
      icon: <Crown size={24} />,
      buttonText: "Start Team Trial",
      buttonStyle: "bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-lg text-white",
      features: [
        { name: "Everything in Pro", included: true },
        { name: "Bulk invitations", included: true },
        { name: "Custom team branding", included: true },
        { name: "Advanced project management", included: true },
        { name: "Priority support", included: true },
        { name: "API access", included: true },
        { name: "Custom integrations", included: true },
      ]
    }
  ];

  const getPrice = (plan) => {
    return isYearly ? plan.yearlyPrice : plan.price;
  };

  const getSavings = (plan) => {
    if (plan.price === 0) return 0;
    return Math.round(((plan.price * 12 - plan.yearlyPrice * 12) / (plan.price * 12)) * 100);
  };

  return (
    <section className="py-10 px-4 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your
            <span className="block mt-1 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Developer Journey
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Whether you're just starting out or leading a team, we have the perfect plan to help you connect with the right developers and build amazing projects together.
          </p>

          <div className="flex items-center justify-center mb-8">
            <span className={`mr-3 ${!isYearly ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-3 ${isYearly ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>
              Yearly
            </span>
            {isYearly && (
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Save up to 25%
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8 ${
                plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star size={14} className="mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <div className="text-purple-600">{plan.icon}</div>
                </div>
                <h3 className="text-2xl text-gray-700 font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-700 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl  text-gray-700 font-bold">
                    ${getPrice(plan)}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-500">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  )}
                </div>
                {isYearly && plan.price > 0 && getSavings(plan) > 0 && (
                  <div className="text-green-600 text-sm font-medium mb-4">
                    Save {getSavings(plan)}% with yearly billing
                  </div>
                )}
                <button className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${plan.buttonStyle}`}>
                  {plan.buttonText}
                </button>
              </div>

              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    {feature.included ? (
                      <Check size={16} className="text-green-500 mr-3 flex-shrink-0" />
                    ) : (
                      <X size={16} className="text-gray-300 mr-3 flex-shrink-0" />
                    )}
                    <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/feed')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Go to Feed
          </button>
        </div>
      </div>
    </section>
  );
};

export default Subscription;

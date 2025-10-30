import React from 'react';
import { Search, Users, Sparkles, Code2, MessageSquare, Briefcase } from 'lucide-react';

const Feature = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 transition-all duration-300 hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/5">
      <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const Features = () => {
  const featuresList = [
    {
      icon: <Search className="text-pink-500" />,
      title: 'Smart Matching',
      description: 'Our algorithm pairs you with developers who complement your skills and share your interests.',
    },
    {
      icon: <Users className="text-pink-500" />,
      title: 'Global Community',
      description: 'Connect with developers from around the world, expanding your network beyond geographical limits.',
    },
    {
      icon: <Sparkles className="text-pink-500" />,
      title: 'Skill Recognition',
      description: 'Showcase your expertise and get matched based on your technical skills and experience.',
    },
    {
      icon: <Code2 className="text-pink-500" />,
      title: 'Project Collaboration',
      description: 'Find the perfect teammates for your next big idea or join exciting projects that match your interests.',
    },
    {
      icon: <MessageSquare className="text-pink-500" />,
      title: 'Seamless Communication',
      description: 'Chat directly with your matches to discuss ideas, share code, and plan your collaboration.',
    },
    {
      icon: <Briefcase className="text-pink-500" />,
      title: 'Career Opportunities',
      description: 'Discover job opportunities, freelance gigs, and networking possibilities within your matches.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Developers Love Us</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            DevMatch makes it easy to find your perfect coding partner. Our platform is designed specifically for developers seeking collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

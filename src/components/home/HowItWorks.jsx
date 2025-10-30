import React from 'react';
import { UserPlus, ThumbsUp, Code2, MessageSquare } from 'lucide-react';

const Step = ({ number, icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center w-full max-w-xs mx-auto px-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center mb-4">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
          {number}
        </div>
      </div>
      <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: <UserPlus className="text-pink-500" size={32} />,
      title: 'Create Your Profile',
      description: 'Sign up and showcase your skills, interests, and the types of projects you want to work on.',
    },
    {
      number: 2,
      icon: <ThumbsUp className="text-pink-500" size={32} />,
      title: 'Swipe & Match',
      description: "Browse through developer profiles and swipe right on those you'd like to collaborate with.",
    },
    {
      number: 3,
      icon: <MessageSquare className="text-pink-500" size={32} />,
      title: 'Connect & Chat',
      description: "Once matched, start chatting to discuss ideas and determine if you're a good fit.",
    },
    {
      number: 4,
      icon: <Code2 className="text-pink-500" size={32} />,
      title: 'Collaborate & Build',
      description: 'Start collaborating on projects, sharing code, and building amazing things together.',
    },
  ];

  return (
    <section id="how-it-works" className="py-32 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">How DevMatch Works</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Finding your perfect coding match has never been easier. Follow these simple steps to get started.
          </p>
        </div>

        {/* Steps - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <Step
              key={index}
              number={step.number}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>

        {/* Connector line - only for large screens */}
        <div className="hidden lg:block relative h-1 max-w-6xl mx-auto mt-[-125px]">
          <div className="absolute top-0 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-pink-500 to-cyan-400"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

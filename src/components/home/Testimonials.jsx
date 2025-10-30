import React from 'react';
import { Star } from 'lucide-react';

const Testimonial = ({ quote, name, role, imageSrc, rating }) => {
  return (
    <div className="bg-gray-900 rounded-2xl p-6  border border-gray-800 transition-all duration-300 hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/5">
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}  
            size={16}
            className={i < rating ? 'text-pink-500 fill-pink-500' : 'text-gray-600'}
          />
        ))}
      </div>
      <p className="text-gray-300 mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <img
          src={imageSrc}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "DevMatch helped me find the perfect front-end developer to complement my back-end skills. We've now launched two successful apps together!",
      name: "Alex Morgan",
      role: "Backend Developer",
      imageSrc:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 5,
    },
    {
      quote:
        "I was looking for a UI/UX designer for my startup project, and within a week on DevMatch, I found the perfect match. The platform is intuitive and effective.",
      name: "Sarah Chen",
      role: "Full-Stack Developer",
      imageSrc:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 5,
    },
    {
      quote:
        "As a junior developer, I wanted to find mentors and collaborators. DevMatch connected me with experienced devs who were happy to guide me while we built projects together.",
      name: "Michael Rodriguez",
      role: "Junior Developer",
      imageSrc:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 4,
    },
  ];

  return (
    <section id="testimonials" className="py-20  bg-gray-950 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4  text-white">Developer Success Stories</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Hear from developers who found their perfect match on DevMatch and built amazing projects together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              imageSrc={testimonial.imageSrc}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

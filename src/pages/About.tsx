import React from 'react';
import { Users, Target, Lightbulb } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen ">
            <div className="bg-slate-900 h-16 w-full"></div>
      {/* Hero Section */}
      <div className=" py-20 bg-cover">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">About CyberBrain AI Solutions LLP</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're a forward-thinking software development company dedicated to delivering
            innovative solutions that drive business growth.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto px-4 py-16 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
              <value.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const values = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Our team brings decades of professional experience across various technologies and industries."
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "We focus on delivering measurable results that align with our clients' business objectives."
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We stay ahead with cutting-edge technologies and methodologies to deliver the best solutions."
  }
];

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "David Rodriguez",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Emily Thompson",
    role: "Lead Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }
];

export default About;
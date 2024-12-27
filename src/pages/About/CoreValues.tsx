import React from "react";
import { Users, Target, Lightbulb } from "lucide-react";

const CoreValues = () => {
  const values = [
    {
      icon: <Users />, // Updated to use JSX directly
      title: "Expert Team",
      description: "Our team brings decades of professional experience across various technologies and industries.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target />, // Updated to use JSX directly
      title: "Goal-Oriented",
      description: "We focus on delivering measurable results that align with our clients' business objectives.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <Lightbulb />, // Updated to use JSX directly
      title: "Innovation First",
      description: "We stay ahead with cutting-edge technologies and methodologies to deliver the best solutions.",
      color: "from-emerald-500 to-teal-500"
    },
  ];

  return (
    <div className="bg-slate-50 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <div className="flex justify-center gap-2 mb-6">
            <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div className="h-1 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <div className="h-1 w-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Our Guiding Principles
          </h2>
          <p className="text-gray-600 text-lg">
            Committed to delivering excellence, innovation, and transformative technological solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Background gradient circle */}
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-r opacity-10 group-hover:opacity-20 transition-opacity duration-300 blur-2xl" />
              
              {/* Icon container */}
              <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-r ${value.color} p-0.5 mb-8 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300`}>
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  {value.icon} {/* Render the icon directly */}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreValues;

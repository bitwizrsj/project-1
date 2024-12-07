import React from 'react';
import { Users, Award, Code2, Building2 } from 'lucide-react';

const Stats = () => {
  return (
    <div className="bg-gray-700 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <stat.icon className="h-8 w-8 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Happy Clients"
  },
  {
    icon: Award,
    value: "150+",
    label: "Projects Completed"
  },
  {
    icon: Code2,
    value: "50+",
    label: "Expert Developers"
  },
  {
    icon: Building2,
    value: "10+",
    label: "Years Experience"
  }
];

export default Stats;
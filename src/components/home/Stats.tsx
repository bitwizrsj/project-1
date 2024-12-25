import React from "react";
import { Users, Award, Code2, Building2 } from "lucide-react";

const Stats = () => {
  return (
    <div className="bg-gray-800 w-4/5 text-purple-300 py-12 rounded-3xl m-auto mb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <stat.icon className="h-10 w-10 mb-4 text-purple-400" />
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-purple-200 text-sm">{stat.label}</div>
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
    value: "100+",
    label: "Happy Clients",
  },
  {
    icon: Award,
    value: "40+",
    label: "Projects Completed",
  },
  {
    icon: Code2,
    value: "10+",
    label: "Expert Developers",
  },
  {
    icon: Building2,
    value: "02+",
    label: "Years Experience",
  },
];

export default Stats;

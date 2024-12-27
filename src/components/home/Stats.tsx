import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { Users, Award, Code2, Building2 } from "lucide-react";

const Stats = () => {
  return (
    <div className="bg-gray-800 w-4/5 text-purple-300 py-12 rounded-3xl m-auto mb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <stat.icon className="h-10 w-10 mb-4 text-purple-400" />
              <motion.div
                className="text-3xl font-bold"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-purple-200 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const stats = [
  {
    icon: Users,
    value: "50+",
    label: "Happy Clients",
  },
  {
    icon: Award,
    value: "50+",
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

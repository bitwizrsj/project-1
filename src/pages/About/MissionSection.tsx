import React from "react";
import { Eye, Target, Goal } from "lucide-react";
import { motion } from "framer-motion";

const MissionSection = () => {
  const missions = [
    {
      icon: <Eye className="w-6 h-6 text-emerald-500" />,
      title: "Vision",
      description:
        "Continuously evolve our technological capabilities to stay at the forefront of innovation.",
    },
    {
      icon: <Target className="w-6 h-6 text-emerald-500" />,
      title: "Missions",
      description:
        "Develop long-term partnerships by delivering exceptional value and driving business growth.",
    },
    {
      icon: <Goal className="w-6 h-6 text-emerald-500" />,
      title: "Goals",
      description:
        "Maintain the highest standards of software quality and data protection in all solutions.",
    },
  ];

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left side - Mission content */}
          <motion.div
            className="lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
          >
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-1 bg-emerald-500"></div>
              <div className="w-8 h-1 bg-emerald-500"></div>
              <div className="w-8 h-1 bg-emerald-500"></div>
            </div>

            <h2 className="text-4xl font-bold mb-12">Our Mission</h2>

            <div className="space-y-8">
              {missions.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  variants={fadeInUp}
                >
                  <div className="p-3 bg-white shadow-md rounded-lg rotate-45">
                    <div className="-rotate-45">{item.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Image grid */}
          <motion.div
            className="lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGNvZGluZ3xlbnwwfHx8fDE2ODAwMTU5NjI&ixlib=rb-4.0.3&q=80&w=400"
                alt="Code on screen"
                className="rounded-2xl w-full h-48 object-cover"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}  // Add hover effect here
                whileTap={{ scale: 0.95 }}   // Add tap effect (optional)
              />
              <motion.img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fHRlYW13b3JrfGVufDB8fHx8MTY4MDAxNTk2Mg&ixlib=rb-4.0.3&q=80&w=400"
                alt="Team working on laptops"
                className="rounded-2xl w-full h-64 object-cover mt-12"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}  // Add hover effect here
                whileTap={{ scale: 0.95 }}   // Add tap effect (optional)
              />
              <motion.img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHNvZnR3YXJlJTIwZGV2ZWxvcG1lbnR8ZW58MHx8fHwxNjgwMDE1OTYy&ixlib=rb-4.0.3&q=80&w=400"
                alt="Software development"
                className="rounded-2xl w-full h-64 object-cover -mt-16"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}  // Add hover effect here
                whileTap={{ scale: 0.95 }}   // Add tap effect (optional)
              />
              <motion.img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fHRlYW13b3JrfGVufDB8fHx8MTY4MDAxNTk2Mg&ixlib=rb-4.0.3&q=80&w=400"
                alt="Professional meeting"
                className="rounded-2xl w-full h-48 object-cover"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}  // Add hover effect here
                whileTap={{ scale: 0.95 }}   // Add tap effect (optional)
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;

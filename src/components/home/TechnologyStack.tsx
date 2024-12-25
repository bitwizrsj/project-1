import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function TechnologyStack() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const technologies = [
    { name: 'Node.js', logo: 'https://cdn-icons-png.flaticon.com/512/919/919825.png' },
    { name: 'React', logo: 'https://cdn-icons-png.flaticon.com/512/919/919851.png' },
    { name: 'PHP', logo: 'https://cdn-icons-png.flaticon.com/512/919/919830.png' },
    { name: 'MongoDB', logo: 'https://cdn-icons-png.flaticon.com/512/919/919836.png' },
    { name: 'MySQL', logo: 'https://cdn-icons-png.flaticon.com/512/919/919836.png' },
    { name: 'Python', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968350.png' },
    { name: 'Django', logo: 'https://cdn-icons-png.flaticon.com/512/919/919852.png' },
    { name: 'JavaScript', logo: 'https://cdn-icons-png.flaticon.com/512/919/919828.png' },
    { name: 'HTML5', logo: 'https://cdn-icons-png.flaticon.com/512/919/919827.png' },
    { name: 'CSS3', logo: 'https://cdn-icons-png.flaticon.com/512/919/919826.png' },
    { name: 'TypeScript', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968381.png' },
    { name: 'GraphQL', logo: 'https://cdn-icons-png.flaticon.com/512/919/919832.png' },
    { name: 'AWS', logo: 'https://cdn-icons-png.flaticon.com/512/873/873120.png' },
    { name: 'Docker', logo: 'https://cdn-icons-png.flaticon.com/512/919/919853.png' },
    { name: 'Kubernetes', logo: 'https://cdn-icons-png.flaticon.com/512/873/873107.png' },
  ];

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Section: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <h2 className="text-purple-600 text-lg font-semibold uppercase mb-2">
            Our Expertise
          </h2>
          <motion.h3
            className="text-3xl font-bold text-gray-900 leading-tight mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Empowering Businesses with Modern Technology
          </motion.h3>
          <motion.p
            className="text-gray-600 text-lg mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            We leverage cutting-edge tools and platforms to deliver scalable,
            innovative solutions tailored to your business needs.
          </motion.p>
          <motion.p
            className="text-gray-600 text-lg mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            From full-stack development to cloud integration, our expertise covers a
            wide range of technologies.
          </motion.p>
          <motion.button
            className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-500 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Right Section: Technology Logos */}
        <motion.div
          className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 bg-white shadow-lg rounded-lg">
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="h-16 mb-2"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

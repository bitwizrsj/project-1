import React from "react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AboutUs() {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animates only the first time it's in view
    threshold: 0.2, // Trigger when 20% of the component is visible
  });

  return (
    <section ref={ref} className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section: Image Collage */}
        <motion.div
          className="relative grid grid-cols-1 gap-4"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="grid gap-4">
            <motion.img
              src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="Meeting"
              className="rounded-lg shadow-lg w-full h-80 object-cover lg:mt-10"
              initial={{ scale: 0.8 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.8 }}
            />
            <motion.div
              className="bg-purple-700 text-white rounded-lg shadow-lg p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h3 className="text-lg font-bold">15 Years Experiences</h3>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Section: Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <h2 className="text-purple-600 text-lg font-semibold uppercase mb-2">
            About Us
          </h2>
          <motion.h3
            className="text-3xl font-bold text-gray-900 leading-tight mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            We deliver innovative software solutions that drive business growth.
          </motion.h3>
          <motion.p
            className="text-gray-600 text-lg mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            Expert Team | Goal-Oriented | Innovation First
          </motion.p>
          <Link to="/about">
      <motion.button
        className="bg-purple-700 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-600 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Learn More
      </motion.button>
    </Link>
          <motion.img
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="Team Collaboration"
            className="rounded-lg shadow-lg w-full h-60 mt-6 object-cover col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
          />
        </motion.div>
      </div>
    </section>
  );
}

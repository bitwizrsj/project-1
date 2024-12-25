import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import code from "../../../assets/codeicon.png";
import creative from "../../../assets/creative.png";
import growth from "../../../assets/growth.png";

const ServicesHome = () => {
  return (
    <section className="bg-gradient-to-br text-purple-900 py-16 rounded-lg ">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-center text-4xl font-bold mb-12">
          Our <span className="text-purple-600">Services</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      className="p-8 bg-white rounded-lg shadow-lg hover:scale-105 transition-transform"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
    >
      <div className="flex justify-center mb-6">
        <img
          src={service.image}
          alt={`${service.title} illustration`}
          className={`h-24 w-24 object-contain ${
            service.title === "Digital Marketing" ? "w-32" : ""
          }`}
        />
      </div>
      <h3 className="text-2xl font-bold text-center text-black-800 mb-4">
        {service.title}
      </h3>
      <ul className="text-black-700 text-sm list-disc list-inside">
        {service.details.map((detail, i) => (
          <li key={i}>{detail}</li>
        ))}
      </ul>
    </motion.div>
  );
};

const services = [
  {
    image: code,
    title: "Development",
    details: [
      "App Development",
      "Web Development",
      "UI/UX Design",
      "API Integration",
      "Chatbot Development",
      "Custom Software Solutions",
    ],
  },
  {
    image: creative,
    title: "Creative",
    details: [
      "Logo Design",
      "Video Editing",
      "Brand Identity",
      "Social Media Graphics",
      "Illustrations",
    ],
  },
  {
    image: growth,
    title: "Digital Marketing",
    details: [
      "SEO Optimization",
      "Content Marketing",
      "Social Media Campaigns",
      "Email Marketing",
      "PPC Advertising",
    ],
  },
];

export default ServicesHome;

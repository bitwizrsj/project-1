import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import { clients } from '../data/clients';

export const ClientsSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-500">
      <div className="container mx-auto px-4 text-center">
        {/* Header */}
        <motion.h3
          className="text-lg font-bold text-gray-100 uppercase mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          First choice of many organizations
        </motion.h3>

        {/* Logos */}
        <div className="flex justify-center flex-wrap gap-8 mt-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              className="flex items-center justify-center bg-white rounded-lg shadow-md p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <motion.img
                src={client.logo}
                alt={client.name}
                className="w-24 h-24 object-contain"
                title={client.name}
                whileHover={{ scale: 1.1, rotate: 3 }} // Adds hover effect
                transition={{ type: 'spring', stiffness: 300 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { clients } from '../data/clients';

export const ClientsSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-500">
      <div className="container mx-auto px-4 text-center">
        {/* Header */}
        <h3 className="text-lg font-bold text-gray-100 uppercase mb-6">
          First choice of many organizations
        </h3>

        {/* Logos */}
        <div className="flex justify-center flex-wrap gap-8 mt-6">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center bg-white rounded-lg shadow-md p-4"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="w-24 h-24 object-contain"
                title={client.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
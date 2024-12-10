import React from 'react';
import { SectionHeader } from './SectionHeader';
import { ClientCard } from './ClientCard';
import { clients } from '../data/clients';

export const ClientsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader
          subtitle="MEET OUR CLIENTS"
          title="Our Awesome Clients"
          description="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.map((client) => (
            <ClientCard
              key={client.name}
              name={client.name}
              logo={client.logo}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
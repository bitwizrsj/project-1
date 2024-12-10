import React from 'react';

interface ClientCardProps {
  name: string;
  logo: string;
}

export const ClientCard: React.FC<ClientCardProps> = ({ name, logo }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
      <img src={logo} alt={`${name} logo`} className="max-w-[180px] h-auto" />
    </div>
  );
};
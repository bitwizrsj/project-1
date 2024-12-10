import React from 'react';

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  description: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ subtitle, title, description }) => {
  return (
    <div className="text-center mb-16">
      <h3 className="text-blue-600 font-semibold mb-4">{subtitle}</h3>
      <h2 className="text-4xl font-bold mb-6">{title}</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
    </div>
  );
};
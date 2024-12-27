import React, { useEffect, useState } from 'react';
import { Briefcase, Heart, HardHat, Dumbbell, Factory } from 'lucide-react';
import { categories } from '../data/categories';

interface JobCategoriesProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const JobCategories: React.FC<JobCategoriesProps> = ({ selectedCategory, onCategorySelect }) => {
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth <= 768); // Adjust the width threshold as needed
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isSmallDevice) {
    // Small device section
    return (
<div className="p-4 h-16 flex items-center bg-gray-100 rounded-full w-full">
  <h3 className="font-semibold text-base mr-4">Categories</h3>
  <div className="flex gap-4 overflow-x-auto items-center">
    {categories.map((category) => (
      <div
        key={category.name}
        onClick={() => onCategorySelect(category.name)} // Attach the onClick handler
        className={`flex items-center justify-between whitespace-nowrap px-3 py-2 rounded-full shadow-sm text-xs cursor-pointer ${
          selectedCategory === category.name ? 'bg-blue-100 text-blue-600' : 'bg-white'
        }`}
      >
        <div className="flex items-center gap-2">
          {category.icon}
          <span className="font-medium">{category.name}</span>
        </div>
        <span className="text-gray-500">{category.count}</span>
      </div>
    ))}
  </div>
</div>



      

      
    );
  }

  // Default section for larger devices
  return (
    <div className="w-64 bg-white rounded-lg p-4 h-fit">
      <h3 className="font-semibold text-lg mb-4">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategorySelect(category.name)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
              selectedCategory === category.name
                ? 'bg-blue-50 text-blue-600'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              {category.icon}
              <span>{category.name}</span>
            </div>
            <span className="text-sm text-gray-500">{category.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobCategories;

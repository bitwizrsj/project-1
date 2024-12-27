import React from 'react';
import { Briefcase, Heart, HardHat, Dumbbell, Factory } from 'lucide-react';
import { categories } from '../data/categories';

interface JobCategoriesProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const JobCategories: React.FC<JobCategoriesProps> = ({ selectedCategory, onCategorySelect }) => {
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
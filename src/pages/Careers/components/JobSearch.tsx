import React from 'react';
import { Search } from 'lucide-react';

interface JobSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const JobSearch: React.FC<JobSearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="max-w-2xl mx-auto mb-8">
        
      <h1 className="text-4xl font-bold mb-2">
        Find your <span className="bg-purple-600 text-white px-2">dream jobs</span> in
      </h1>
      <h2 className="text-4xl font-bold mb-6">Xyphramin Technologies</h2>
      <p className="text-gray-600 mb-6">
        When you're searching for a job, there are a few things you can do
        to get the most out of your search
      </p>
      <div className="relative">
        <input
          type="text"
          placeholder="Job title or keyword"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
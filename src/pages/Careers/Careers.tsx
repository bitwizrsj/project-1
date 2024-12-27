import React, { useState } from 'react';
import JobSearch from './components/JobSearch';
import JobCategories from './components/JobCategories';
import JobList from './components/JobList';
import ApplicationForm from './components/ApplicationForm';

const Careers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedJob, setSelectedJob] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-50 ">
        <div className="bg-slate-900 h-16 w-full"></div>

        <div className='py-20'>
            <JobSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
  <JobCategories
    selectedCategory={selectedCategory}
    onCategorySelect={setSelectedCategory}
  />
  <JobList
    searchTerm={searchTerm}
    selectedCategory={selectedCategory}
    onApply={setSelectedJob}
  />
</div>
        </div>
        
      

      {selectedJob && (
        <ApplicationForm
          jobTitle={selectedJob.title}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

export default Careers;
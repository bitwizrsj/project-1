import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { jobs } from '../data/jobs';
import { Job } from '../types/job';

interface JobListProps {
    searchTerm: string;
    selectedCategory: string;
    onApply: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ searchTerm, selectedCategory, onApply }) => {
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || job.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Recommended Jobs or Internships</h3>

            </div>
            <div className="space-y-4">
                {filteredJobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h4 className="font-semibold text-lg mb-1">{job.title}</h4>
                                <p className="text-gray-600">{job.company}</p>
                            </div>
                            <button
                                onClick={() => onApply(job)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors"
                            >
                                Apply Now
                            </button>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                            </div>

                            <span>{job.type}</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">{job.salary}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobList;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Job } from "../Careers/types/job";
import { Category } from "../Careers/types/category";
import ApplicationForm from "../Careers/components/ApplicationForm";
import { Briefcase, Heart, HardHat, Dumbbell, Factory, Search, MapPin } from "lucide-react";

// ======================= Careers =======================
const Careers: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // State for jobs
  const [categories, setCategories] = useState<Category[]>([]); // State for categories
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null); // Manage selected job
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState(true); // Loading state for jobs
  const [loadingCategories, setLoadingCategories] = useState(true); // Loading state for categories
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch jobs data
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/admin/jobs");
        setJobs(response.data); // Assuming the response contains a list of jobs
        setLoadingJobs(false);
      } catch (err) {
        setError("Failed to load jobs.");
        setLoadingJobs(false);
      }
    };

    fetchJobs();
  }, []);

  // Fetch categories data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/admin/categories");
        setCategories(response.data); // Assuming the response contains a list of categories
        setLoadingCategories(false);
      } catch (err) {
        setError("Failed to load categories.");
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle resizing
  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ======================= Category Count Logic =======================
  const getCategoryWithCount = () => {
    const jobCounts = jobs.reduce((acc, job) => {
      acc[job.category] = (acc[job.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return categories.map((category) => ({
      ...category,
      count: jobCounts[category.name] || 0,
    }));
  };

  const categoriesWithCount = getCategoryWithCount();

  // Filter jobs based on search and category selection
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApply = (job: Job) => {
    setSelectedJob(job); // Set the selected job
  };

  const handleCloseForm = () => {
    setSelectedJob(null); // Close the application form
  };

  // ======================= JSX Rendering =======================
  if (loadingJobs || loadingCategories) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-slate-900 h-16 w-full"></div>

      <div className="py-20">
        {/* Job Search */}
        <div className="max-w-2xl mx-auto mb-8 text-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
            Find your{" "}
            <span className="bg-purple-600 text-white px-2">dream jobs</span> in
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
            Xyphramin Technologies
          </h2>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-6">
            When you're searching for a job, there are a few things you can do to
            get the most out of your search.
          </p>

          <div className="relative">
            <input
              type="text"
              placeholder="Job title or keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
          {/* Job Categories */}
          <div className="w-full lg:w-64 bg-white rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <div
              className="flex gap-4 overflow-x-auto scrollbar-hide items-center lg:flex-col lg:gap-0 lg:overflow-visible lg:scrollbar-auto lg:items-start"
              style={{ scrollBehavior: "smooth" }}
            >
              {categoriesWithCount.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm cursor-pointer whitespace-nowrap ${
                    selectedCategory === category.name
                      ? "bg-blue-100 text-blue-600"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                  <span className="ml-1 text-gray-500">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Job List */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-4 px-4 lg:p-0">Recommended Jobs or Internships</h3>
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{job.title}</h4>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                    <button
                      onClick={() => handleApply(job)}
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
        </div>
      </div>

      {selectedJob && (
        <ApplicationForm
          jobTitle={selectedJob.title} // Pass job title to the form
          onClose={handleCloseForm} // Close form handler
        />
      )}
    </div>
  );
};

export default Careers;

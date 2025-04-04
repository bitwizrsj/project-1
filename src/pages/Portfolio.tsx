import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [projects, setProjects] = useState([]); // State to store projects data
  const [loading, setLoading] = useState(true); // Loading state for the API call
  const [error, setError] = useState(null); // Error state to handle any API errors

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/projects'); // Adjust the URL based on your backend
        setProjects(response.data); // Set the projects data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError("Failed to load projects"); // Set error if request fails
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchProjects();
  }, []); // Empty dependency array means this effect runs only once after initial render

  if (loading) {
    return <div>Loading...</div>; // Loading message
  }

  if (error) {
    return <div>{error}</div>; // Error message if there's an issue with the API call
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-slate-900 h-16 w-full"></div>

      {/* Hero Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">
            Our <span className="text-purple-600">Work</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore our latest projects and success stories.
          </p>
        </div>
      </div>

      {/* Portfolio Projects */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img
                src={`http://localhost:5002${project.image}`} // Adjust image URL as per your backend
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl text-purple-600 font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

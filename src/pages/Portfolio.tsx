import React from 'react';

const Portfolio = () => {
  return (
    <div className="min-h-screen">
                  <div className="bg-slate-900 h-16 w-full"></div>


    {/* Hero Section */}
    <div className=" py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Our Work</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Explore our latest projects and success stories.
        </p>
      </div>
    </div>

    {/* Portfolio Projects */}
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
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

const projects = [
  {
    title: "HealthTech Platform",
    description: "A comprehensive healthcare management system for medical professionals",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "Node.js", "MongoDB", "AWS"]
  },
  {
    title: "Financial Analytics Dashboard",
    description: "Real-time financial data visualization and analysis platform",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    technologies: ["Vue.js", "Python", "TensorFlow", "Docker"]
  },
  {
    title: "E-commerce Mobile App",
    description: "Cross-platform mobile application for a leading retail brand",
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    technologies: ["React Native", "Firebase", "Redux", "Stripe"]
  }
];

export default Portfolio;
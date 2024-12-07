import React from 'react';

const TechnologyStack = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Our Technology Stack</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          We use cutting-edge technologies to build scalable and efficient solutions, empowering the future of software development.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side: Technology Logos */}
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
              {technologies.map((tech, index) => (
                <div key={index} className="text-center transform hover:scale-105 transition-all duration-300">
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="h-16 mx-auto mb-4 object-contain transition-all duration-300"
                  />
                  <h3 className="font-semibold text-gray-900">{tech.name}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Technology Image */}
          <div className="flex justify-center">
            <img 
              src="https://i.pinimg.com/736x/49/5f/d6/495fd6b6b92ded7b62023352a90881ee.jpg" 
              alt="Tech and Coding" 
              className="max-w-full h-96 object-cover rounded-lg shadow-xl transition-transform duration-300 transform hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const technologies = [
  {
    name: "React",
    logo: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png"
  },
  {
    name: "Node.js",
    logo: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png"
  },
  {
    name: "Python",
    logo: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/python/python.png"
  },
  {
    name: "AWS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
  },
  {
    name: "Docker",
    logo: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/docker/docker.png"
  },
  {
    name: "Kubernetes",
    logo: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/kubernetes/kubernetes.png"
  },
  {
    name: "MongoDB",
    logo: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mongodb/mongodb.png"
  },
  {
    name: "PostgreSQL",
    logo: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/postgresql/postgresql.png"
  }
];

export default TechnologyStack;

import React from 'react';
import { Code2, Cloud, Shield, Smartphone, Database, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      category: "Development",
      title: "Web Development",
      description: "Full-stack web solutions",
      location: "Enterprise Solutions",
      type: "Custom",
      icon: Code2,
      features: [
        "Custom Web Applications",
        "E-commerce Solutions",
        "API Integration"
      ]
    },
    {
      category: "Mobile",
      title: "Mobile Solutions",
      description: "Cross-platform apps",
      location: "iOS & Android",
      type: "Native",
      icon: Smartphone,
      features: [
        "Native Applications",
        "Cross-platform Development",
        "Mobile UI/UX"
      ]
    },
    {
      category: "Cloud",
      title: "Cloud Services",
      description: "Scalable infrastructure",
      location: "Cloud Computing",
      type: "Managed",
      icon: Cloud,
      features: [
        "Cloud Migration",
        "AWS Solutions",
        "Azure Services"
      ]
    },
    {
      category: "Security",
      title: "Cybersecurity",
      description: "Advanced protection",
      location: "Security Solutions",
      type: "Enterprise",
      icon: Shield,
      features: [
        "Threat Detection",
        "Security Audits",
        "Compliance"
      ]
    },
    {
      category: "Data",
      title: "Data Analytics",
      description: "Insights & analytics",
      location: "Data Solutions",
      type: "Custom",
      icon: Database,
      features: [
        "Big Data Analytics",
        "Data Visualization",
        "Predictive Analysis"
      ]
    },
    {
      category: "Business",
      title: "Business Intelligence",
      description: "Smart decisions",
      location: "Enterprise Analytics",
      type: "Managed",
      icon: BarChart3,
      features: [
        "Performance Metrics",
        "Business Reporting",
        "Analytics Dashboard"
      ]
    },
  ];

  return (
    <div>
      <div className="bg-slate-900 h-16 w-full"></div>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive technology solutions to empower your business growth
            </p>
          </div>

          {/* Services List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group">
                {/* Category and Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-500 transition-colors duration-300">
                    <service.icon className="w-5 h-5 text-purple-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-sm font-medium text-purple-600">{service.category}</span>
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>

                {/* Features List */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700 text-sm">
                      <span className="h-1.5 w-1.5 bg-purple-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Service Type Badge */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{service.location}</span>
                  <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    {service.type}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center py-12 bg-gray-800 text-white mt-12">
            <h3 className="text-3xl font-semibold mb-4">Ready to Start?</h3>
            <p className="text-lg mb-6">Contact us today to discuss how we can help your business grow with our innovative solutions.</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg text-lg">
            <Link to="/contact" className="block w-full h-full">
    Get in Touch
  </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

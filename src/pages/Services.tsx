import React from 'react';
import { Code2, Smartphone, Cloud, Shield, Database, BarChart3 } from 'lucide-react';

const Services = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-slate-900 h-16 w-full"></div>

      {/* Hero Section */}
      <div className="  py-20 bg-cover"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive software solutions tailored to elevate your business.
          </p>
        </div>
      </div>

      {/* Service Cards */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <service.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="h-1.5 w-1.5 bg-blue-600 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    description: "Tailored solutions designed to meet your specific business needs",
    features: [
      "Custom web applications",
      "Enterprise software solutions",
      "API development and integration",
      "Legacy system modernization"
    ]
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications",
    features: [
      "iOS and Android development",
      "Cross-platform solutions",
      "UI/UX design",
      "App maintenance and support"
    ]
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Scalable and secure cloud infrastructure services",
    features: [
      "Cloud migration",
      "Infrastructure optimization",
      "DevOps services",
      "24/7 monitoring"
    ]
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Comprehensive security solutions for your digital assets",
    features: [
      "Security audits",
      "Penetration testing",
      "Compliance consulting",
      "Security training"
    ]
  },
  {
    icon: Database,
    title: "Data Analytics",
    description: "Transform your data into actionable insights",
    features: [
      "Big data solutions",
      "Business intelligence",
      "Data visualization",
      "Predictive analytics"
    ]
  },
  {
    icon: BarChart3,
    title: "Digital Transformation",
    description: "Guide your business through digital evolution",
    features: [
      "Digital strategy consulting",
      "Process automation",
      "Technology roadmap",
      "Change management"
    ]
  }
];

export default Services;
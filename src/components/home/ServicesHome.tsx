import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Code, Smartphone, Cloud, Shield, Database, LineChart } from 'lucide-react';

const ScrollableDiv = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  -webkit-overflow-scrolling: touch;
`;

const services = [
  {
    icon: Code,
    title: 'Software Development',
    description: 'Tailored solutions designed to meet your specific business needs'
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications'
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable and secure cloud infrastructure services'
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions for your digital assets'
  },
  {
    icon: Database,
    title: 'Data Analytics',
    description: 'Transform your data into actionable insights'
  },
  {
    icon: LineChart,
    title: 'Digital Transformation',
    description: 'Guide your business through digital evolution'
  }
];

export default function Services() {
  return (
    <section className="py-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive software solutions tailored to elevate your business
          </p>
        </div>

        <ScrollableDiv>
          {services.map((service, index) => (
            <div
              key={index}
              className="group flex-shrink-0 w-80 p-6 bg-gray-50 rounded-xl hover:bg-blue-600 transition-all duration-300 relative"
            >
              <service.icon className="w-12 h-12 text-blue-600 group-hover:text-white mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-100">
                {service.description}
              </p> <br></br> <br />
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full text-center">
                <Link
                  to="/services"
                  className="inline-block text-blue-600 hover:text-white font-medium group-hover:text-white border-b-2 border-transparent group-hover:border-white transition-all duration-300"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          ))}
        </ScrollableDiv>
      </div>
    </section>
  );
}

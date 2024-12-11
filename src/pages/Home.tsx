import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Stats from '../components/home/Stats';
import Testimonials from '../components/home/Testimonials';
import TechnologyStack from '../components/home/TechnologyStack';
import AboutHome from '../components/home/AboutHome';
import ServicesHome from '../components/home/ServicesHome';
import ClientSectors from '../components/home/ClientSectors';
import { ClientsSection } from '../components/ClientsSection';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Innovative Software Solutions
              <br />
              for Tomorrow's Challenges
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              We transform businesses through cutting-edge technology and exceptional software development
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <Stats />

      <ClientsSection />
      
      {/* About Home */ }
      <AboutHome />

      

      {/* Services Preview */}
      <ServicesHome />

      {/* Technology Stack */}
      <TechnologyStack />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-16">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-extrabold mb-4 text-white tracking-tight">
      Ready to Join Our Innovative Team?
    </h2>
    <p className="text-lg mb-8 text-opacity-80">
      Unlock your potential and grow with us. Explore exciting career opportunities today!
    </p>
    <Link
      to="/careers"
      className="inline-flex items-center bg-white text-teal-600 px-8 py-4 rounded-lg shadow-lg hover:bg-teal-100 transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      View Careers <ArrowRight className="ml-2 h-5 w-5" />
    </Link>
  </div>
</div>


    </div>
  );
};

const services = [
  {
    icon: () => <div className="i-lucide-code-2" />,
    title: "Custom Software Development",
    description: "Tailored solutions designed to meet your specific business needs"
  },
  {
    icon: () => <div className="i-lucide-smartphone" />,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications"
  },
  {
    icon: () => <div className="i-lucide-cloud" />,
    title: "Cloud Solutions",
    description: "Scalable and secure cloud infrastructure services"
  }
];

export default Home;
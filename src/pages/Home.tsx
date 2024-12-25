import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Stats from '../components/home/Stats';
import Testimonials from '../components/home/Testimonials';
import TechnologyStack from '../components/home/TechnologyStack';
import AboutHome from '../components/home/AboutHome';
import ServicesHome from '../components/home/ServicesHome';
import { ClientsSection } from '../components/ClientsSection';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen bg-slate-100">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80")',
        }}
      >
        <motion.div
          className="absolute inset-0 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="relative h-full flex items-center justify-center">
        <motion.div
          className="text-center px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Innovative Software Solutions
            <br />
            for Tomorrow's Challenges
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            We transform businesses through cutting-edge technology and
            exceptional software development
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>

      

      
      
      {/* About Home */ }
      <AboutHome />

      

      {/* Services Preview */}
      <ServicesHome />

      {/* Technology Stack */}
      <TechnologyStack />
      
      <ClientsSection />

      {/* Testimonials */}
      <Testimonials />
{/* Stats Section */}
      <Stats />
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


export default Home;
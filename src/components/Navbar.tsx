import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import completeLogo from '../../assets/logo_complete.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect to change the state based on scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
            {/* Use the imported image here */}
            <img src={completeLogo} alt="Logo" className="h-8 w-8" />

              <span
                className={`font-bold text-xl ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                CyberBrain AI Solutions LLP
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`hover:text-blue-600 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`hover:text-blue-600 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              About
            </Link>
            <Link
              to="/services"
              className={`hover:text-blue-600 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              Services
            </Link>
            <Link
              to="/portfolio"
              className={`hover:text-blue-600 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              Portfolio
            </Link>
            <Link
              to="/contact"
              className={`hover:text-blue-600 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-900" />
              ) : (
                <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 bg-white shadow-lg rounded-lg p-4">
            <Link
              to="/"
              className="block text-gray-900 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-gray-900 hover:text-blue-600"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/services"
              className="block text-gray-900 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link
              to="/portfolio"
              className="block text-gray-900 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Portfolio
            </Link>
            <Link
              to="/contact"
              className="block text-gray-900 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

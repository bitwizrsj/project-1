import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Logo from '../../assets/logo.png'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
            {/* Use the imported image here */}
            <img src={Logo} alt="Logo" className="h-8 w-8" />
            <span
                className= "text-white font-bold"
              >
                Xyphramin Technologies 
              </span>
            </Link>
          </div>
            <p className="text-gray-400 mb-4">
              Transforming businesses through innovative software solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/xyphramintechnologies/" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/xyphramintechnology?igsh=MWVtYnhkMmpsbnQwcQ==" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <Link to="/dashboard" className="flex items-center text-gray-400 hover:text-white space-x-2 mt-4">
              Admin Login 
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">Services</Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-400 hover:text-white">Portfolio</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">Custom Software</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">Mobile Development</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">Cloud Solutions</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">Data Analytics</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>6 Akash Vihar Colony</li>
              <li>Mathura, UP 281006</li>
              <li>Phone: +91 6395697514</li>
              <li>Email: info@xyphramin.com </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Xyphramin Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
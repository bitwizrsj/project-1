import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
// import Careers from './pages/Careers/Careers';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import ScrollToTop from './components/ScrollToTop';
import Dashboard from './pages/dashboard/Dashboard';
import Login from "./components/Login";
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import Careers from './pages/Careers/Car';
import CRUDJobs from './pages/dashboard/CRUDJobs';
import CRUDProjects from './pages/dashboard/CRUDProjects';
import CRUDBlogs from './pages/dashboard/CRUDBlogs';
import CRUDApplications from './pages/dashboard/CRUDApplications';
import CRUDTestimonial from './pages/dashboard/CRUDTestimonial';


function App() {
  return (
    <AuthProvider> {/* Wrap the app inside AuthProvider */}
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              {/* <Route path="/careers" element={<Careers />} /> */}
              <Route path="/careers" element={<Careers />} />
              <Route path="/blogs" element={<Blog />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/jobs" element={<CRUDJobs />} />
              <Route path="/dashboard/projects" element={<CRUDProjects />} />
              <Route path="/dashboard/blogs" element={<CRUDBlogs />} />
              <Route path='dashboard/messages' element={<CRUDApplications />} />
              <Route path='dashboard/testimonials' element={<CRUDTestimonial />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

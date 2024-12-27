import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import emailjs from '@emailjs/browser';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const templateParams = {
      to_name: "naam",
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };
  
    emailjs
      .send(
        "service_nbectlk",
        "template_azr880u",
        templateParams,
        "1Ay1s6EjozEEWRxbk"
      )
      .then(
        () => {
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("Failed to send message:", error);
          alert(`Failed to send the message: ${error.text}`);
        }
      );
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission
    console.log("Newsletter subscription for:", newsletterEmail);
    setNewsletterEmail("");
  };

  return (
    <div className="min-h-screen bg-slate-100">
            <div className="bg-slate-900 h-16 w-full"></div>
      {/* Hero Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Ready to start your project? Contact us today for a free consultation.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-3 bg-slate-100 rounded-md border-0 focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 bg-slate-100 rounded-md border-0 focus:ring-2 focus:ring-purple-500"
                required
              />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows={4}
                className="w-full p-3 bg-slate-100 rounded-md border-0 focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Follow Us Section */}
<div className="space-y-8">
<div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
        <p className="text-gray-600 mb-4">
          Stay connected with us on social media for the latest updates and news!
        </p>
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Twitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>


            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-purple-600">
                <Phone className="h-6 w-6" />
                <span>+91 6395697514</span>
              </div>
              <div className="flex items-center space-x-4 text-purple-600">
                <Mail className="h-6 w-6" />
                <span>info@CyberBrainAI.com</span>
              </div>
              <div className="flex items-center space-x-4 text-purple-600">
                <MapPin className="h-6 w-6" />
                <span>6 Akash Vihar Colony Mathura UP 281006 INDIA</span>
              </div>
            </div>

            
          </div>
        </div>
        {/* Map Section */}
<div className="w-full h-64 bg-slate-200 mt-16 rounded-lg overflow-hidden">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.4488550156184!2d77.66302227545846!3d27.45528217632791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397377bd3d9222e5%3A0xf7f3b4a11882fd2c!2sXyphramin%20Technologies!5e0!3m2!1sen!2sin!4v1735270032450!5m2!1sen!2sin"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen={true}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>
</div>
    </div>
  );
};

export default Contact;
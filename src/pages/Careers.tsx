import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import emailjs from '@emailjs/browser';

const Careers = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const templateParams = {
            to_name: "naam", // Replace "naam" with the recipient's name if available
            from_name: formData.name, // User's name
            from_email: formData.email, // User's email
            message: formData.message, // User's message
        };

        emailjs
            .send(
                "service_nbectlk", // Replace with your actual EmailJS service ID
                "template_azr880u", // Replace with your actual EmailJS template ID
                templateParams,
                "1Ay1s6EjozEEWRxbk" // Replace with your actual EmailJS public key
            )
            .then(
                () => {
                    alert("Message sent successfully!");
                    setFormData({ name: "", email: "", message: "" }); // Reset form
                },
                (error) => {
                    console.error("Failed to send message:", error); // Log detailed error
                    alert(`Failed to send the message: ${error.text}`);
                }
            );
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="bg-slate-900 h-16 w-full"></div>
            {/* Hero Section */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-6">Job Opportunities</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Ready to join a team that values innovation and collaboration? Explore our career opportunities.
                    </p>
                </div>
            </div>

            {/* Contact Form and Information */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={6}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Job Opportunities Information */}
                    <div className="space-y-8">
                        <div className="flex items-start space-x-4">
                            <div className="h-6 w-6 text-blue-600 mt-1">
                                {/* You can add an icon related to App Development here */}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">App Developer</h3>
                                <p className="text-gray-600">Join our team and build cutting-edge mobile applications!</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="h-6 w-6 text-blue-600 mt-1">
                                {/* You can add an icon related to Web Development here */}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">Web Developer</h3>
                                <p className="text-gray-600">Be part of our web development team and create amazing user experiences!</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="h-6 w-6 text-blue-600 mt-1">
                                {/* You can add an icon related to Data Science here */}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">Data Scientist</h3>
                                <p className="text-gray-600">Use your data analysis skills to help shape our future decisions!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Careers;

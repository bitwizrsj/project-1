import React from "react";
import { Link } from "react-router-dom";
import { blogData } from "./blogData"; // Import static blog data

const Blog = () => {
  return (
    <div>
      <div className="bg-slate-900 h-16 w-full"></div>
      <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Latest Blogs</h2>
      <div className="space-y-8">
        {blogData.map((blog) => (
          <div key={blog.id} className="border-b pb-8">
            <h3 className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </h3>
            <p className="text-gray-600 mt-2">{blog.description}</p>
            <p className="text-gray-500 text-sm mt-2">{blog.date}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default Blog;

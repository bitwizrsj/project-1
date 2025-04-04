import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center py-16">Loading blogs...</div>;
  }

  return (
    <div>
      <div className="bg-slate-900 h-16 w-full"></div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Latest <span className="text-purple-600">Blogs</span>
        </h2>
        <div className="space-y-8">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} className="border-b pb-8">
                <div className="flex gap-4 items-center">
                  {/* Main Image */}
                  <div className="mb-4">
                    <img
                      src={`http://localhost:5002${blog.mainImage}`}
                      alt={blog.title}
                      className="w-20 h-20 object-cover rounded-lg shadow-md"
                    />
                  </div>
                  {/* Title and Link */}
                  <h3 className="text-2xl font-semibold text-purple-600 hover:text-blue-800 transition-colors">
                    <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                  </h3>
                </div>
                {/* Description */}
                <p className="text-gray-600 mt-2">{blog.description}</p>
                {/* Date */}
                <p className="text-gray-500 text-sm mt-2">
                  {new Date(blog.date).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/blogs");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        
        // Check if the response has the expected structure
        if (result.success && Array.isArray(result.data)) {
          setBlogs(result.data);
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center py-16">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">Error: {error}</div>;
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
                    {blog.mainImage && (
                      <img
                        src={blog.mainImage} // Use the full Cloudinary URL directly
                        alt={blog.title}
                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                      />
                    )}
                  </div>
                  {/* Title and Link */}
                  <div>
                    <h3 className="text-2xl font-semibold text-purple-600 hover:text-blue-800 transition-colors">
                      <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                    </h3>
                    {/* Description */}
                    <p className="text-gray-600 mt-2">{blog.description}</p>
                    {/* Date - using createdAt from your model */}
                    <p className="text-gray-500 text-sm mt-2">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
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
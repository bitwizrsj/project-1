import React from "react";
import { useParams } from "react-router-dom";
import { blogData } from "./blogData";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>(); // Fetch blog id from the URL

  const blog = blogData.find((blog) => blog.id.toString() === id);

  if (!blog) {
    return <div>Blog not found!</div>;
  }

  return (
    <div>
      <div className="bg-slate-900 h-16 w-full"></div>
      <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Main Image */}
      <img
        src={blog.mainImage}
        alt={blog.title}
        className="w-full h-96 object-cover mb-8"
      />
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-8">{blog.date}</p>

      <div className="prose max-w-full">
        <p>{blog.content}</p>
      </div>
    </div>
    </div>
    
  );
};

export default BlogDetail;

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
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-8">{blog.date}</p>
      <div className="prose max-w-full">
        <p>{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;

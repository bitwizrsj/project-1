import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub Flavored Markdown support

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5002/api/blogs/${id}`);
        if (!response.ok) throw new Error("Blog not found");
        
        const result = await response.json();
        
        // Check if the response has the expected structure
        if (result.success && result.data) {
          setBlog(result.data);
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="text-center py-16">Loading blog...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">Error: {error}</div>;
  }

  if (!blog) {
    return <div className="text-center py-16">Blog not found.</div>;
  }

  return (
    <div>
      <div className="bg-slate-900 h-16 w-full"></div>
      <div className="max-w-7xl mx-auto px-4 py-16"><h1 className="text-4xl text-center  font-bold mb-16">{blog.title}</h1>
        {/* Main Image - use Cloudinary URL directly */}
        {blog.mainImage && (
          <img
            src={blog.mainImage} // Remove localhost prefix - Cloudinary URLs are complete
            alt={blog.title}
            className="w-full h-96 object-cover mb-8 rounded-lg shadow-md"
          />
        )}

        
        
        {/* Use createdAt from your model */}
        <p className="text-gray-500 text-sm mb-8">
          {new Date(blog.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>


        <hr></hr>

        {/* Markdown content */}
        <div className="prose max-w-full">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="prose prose-lg max-w-full text-gray-800 leading-relaxed"
            components={{
              h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mt-6 mb-4" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-3xl font-semibold mt-5 mb-3" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-2xl font-medium mt-4 mb-2" {...props} />,
              p: ({ node, ...props }) => <p className="mt-2 mb-4 text-gray-600 leading-relaxed" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc ml-6 space-y-2" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal ml-6 space-y-2" {...props} />,
              li: ({ node, ...props }) => <li className="ml-4" {...props} />,
              a: ({ node, ...props }) => (
                <a className="text-purple-600 hover:underline" {...props} />
              ),
              code({ node, inline, className, children, ...props }) {
                return !inline ? (
                  <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto my-4">
                    <code className="font-mono" {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className="bg-gray-200 px-1 py-0.5 rounded font-mono text-sm" {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { PlusCircle, Edit, Trash2, BookOpen, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  link: string;
  mainImage: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

const CRUDBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [newBlog, setNewBlog] = useState<Omit<Blog, '_id' | 'createdAt' | 'updatedAt' | 'date'>>({
    title: "",
    description: "",
    content: "",
    link: "",
    mainImage: ""
  });
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  // Fetch blogs data
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

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Handle creating a new blog
  const handleCreateBlog = async () => {
    if (!newBlog.title || !newBlog.description || !newBlog.content || !newBlog.link || !imageFile) {
      setError("All fields are required.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', newBlog.title);
      formData.append('description', newBlog.description);
      formData.append('content', newBlog.content);
      formData.append('link', newBlog.link);
      formData.append('mainImage', imageFile);

      const response = await axios.post("http://localhost:5002/api/blogs", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setBlogs([response.data, ...blogs]);
      setNewBlog({
        title: "",
        description: "",
        content: "",
        link: "",
        mainImage: ""
      });
      setImageFile(null);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create blog.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle editing an existing blog
  const handleEditBlog = async () => {
    if (!editingBlog) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', editingBlog.title);
      formData.append('description', editingBlog.description);
      formData.append('content', editingBlog.content);
      formData.append('link', editingBlog.link);
      if (imageFile) {
        formData.append('mainImage', imageFile);
      }

      const response = await axios.put(
        `http://localhost:5002/api/blogs/${editingBlog._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setBlogs(blogs.map(blog => 
        blog._id === editingBlog._id ? response.data : blog
      ));
      setEditingBlog(null);
      setImageFile(null);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update blog.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting a blog
  const handleDeleteBlog = async (blogId: string) => {
    if (!blogId) {
      setError("Invalid blog ID.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5002/api/blogs/${blogId}`);
      setBlogs(blogs.filter(blog => blog._id !== blogId));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete blog.");
    }
  };

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="bg-slate-900 h-16 w-full"></div>
      <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
        <div className="container mx-auto max-w-6xl">
          <header className="mb-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => window.history.back()} 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
              >
                <ArrowLeft size={20} />
                Back to Dashboard
              </button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-4">Blog Management</h1>
            <p className="text-gray-600">Create, edit, and manage blog posts</p>
          </header>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="py-6 space-y-8">
            {/* Create/Edit Blog Form */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 p-4 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-800">
                  {editingBlog ? 'Edit Blog Post' : 'Create a New Blog Post'}
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      placeholder="Blog post title"
                      value={editingBlog ? editingBlog.title : newBlog.title}
                      onChange={(e) => 
                        editingBlog
                          ? setEditingBlog({ ...editingBlog, title: e.target.value })
                          : setNewBlog({ ...newBlog, title: e.target.value })
                      }
                      className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      placeholder="Short description of the blog post"
                      value={editingBlog ? editingBlog.description : newBlog.description}
                      onChange={(e) => 
                        editingBlog
                          ? setEditingBlog({ ...editingBlog, description: e.target.value })
                          : setNewBlog({ ...newBlog, description: e.target.value })
                      }
                      rows={2}
                      className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                      placeholder="Main content of the blog post"
                      value={editingBlog ? editingBlog.content : newBlog.content}
                      onChange={(e) => 
                        editingBlog
                          ? setEditingBlog({ ...editingBlog, content: e.target.value })
                          : setNewBlog({ ...newBlog, content: e.target.value })
                      }
                      rows={4}
                      className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                    <input
                      type="text"
                      placeholder="URL to the full blog post"
                      value={editingBlog ? editingBlog.link : newBlog.link}
                      onChange={(e) => 
                        editingBlog
                          ? setEditingBlog({ ...editingBlog, link: e.target.value })
                          : setNewBlog({ ...newBlog, link: e.target.value })
                      }
                      className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {editingBlog ? 'Update Featured Image (optional)' : 'Featured Image (required)'}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {editingBlog && !imageFile && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Current image:</p>
                        <img 
                          src={editingBlog.mainImage} // Direct Cloudinary URL
                          alt={editingBlog.title} 
                          className="w-32 h-32 object-cover rounded-md mt-1"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/150';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  {editingBlog ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingBlog(null);
                          setImageFile(null);
                        }}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleEditBlog}
                        disabled={isLoading}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition flex items-center gap-2 disabled:opacity-70"
                      >
                        {isLoading ? 'Saving...' : (
                          <>
                            <Edit size={16} />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleCreateBlog}
                      disabled={isLoading || !newBlog.title || !newBlog.description || !newBlog.content || !newBlog.link || !imageFile}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition flex items-center gap-2 disabled:opacity-70"
                    >
                      {isLoading ? 'Creating...' : (
                        <>
                          <PlusCircle size={16} />
                          Create Blog Post
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Blogs List */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 p-4 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-800">Manage Blogs</h2>
              </div>
              <div className="p-0">
                {blogs.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No blogs found. Create your first blog post below.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {blogs.map((blog) => (
                      <div key={blog._id} className="flex justify-between items-start p-4 hover:bg-gray-50 transition">
                        <div className="flex items-start gap-4 flex-1 mr-4">
                          <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                            <img 
                              src={blog.mainImage} // Direct Cloudinary URL
                              alt={blog.title} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/150';
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{blog.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{blog.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500">
                                {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                              </span>
                              <a 
                                href={blog.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline"
                              >
                                View Post
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingBlog(blog);
                              setImageFile(null);
                            }}
                            className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-md transition text-sm flex items-center gap-1"
                          >
                            <Edit size={16} />
                            <span className="sr-only md:not-sr-only">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog._id)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition text-sm flex items-center gap-1"
                          >
                            <Trash2 size={16} />
                            <span className="sr-only md:not-sr-only">Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </>
  );
};

export default CRUDBlogs;
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { PlusCircle, Edit, Trash2, Star, ArrowLeft } from 'lucide-react';

interface Testimonial {
  _id: string;
  content: string;
  name: string;
  role: string;
  stars: number;
  createdAt: string;
}

const CRUDTestimonial = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, '_id' | 'createdAt'>>({
    content: "",
    name: "",
    role: "",
    stars: 5
  });
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Fetch testimonials data
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/testimonials");
        setTestimonials(response.data);
      } catch (err) {
        setError("Failed to load testimonials.");
      }
    };

    fetchTestimonials();
  }, []);

  // Handle creating a new testimonial
  const handleCreateTestimonial = async () => {
    if (!newTestimonial.content || !newTestimonial.name || !newTestimonial.role) {
      setError("All fields are required.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5002/api/testimonials", newTestimonial);

      setTestimonials([...testimonials, response.data]);
      setNewTestimonial({
        content: "",
        name: "",
        role: "",
        stars: 5
      });
      setError(null);
    } catch (err) {
      setError("Failed to create testimonial.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle editing an existing testimonial
  const handleEditTestimonial = async () => {
    if (!editingTestimonial) return;

    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5002/api/testimonials/${editingTestimonial._id}`,
        editingTestimonial
      );

      setTestimonials(
        testimonials.map((testimonial) =>
          testimonial._id === editingTestimonial._id ? response.data : testimonial
        )
      );
      setEditingTestimonial(null);
      setError(null);
    } catch (err) {
      setError("Failed to update testimonial.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting a testimonial
  const handleDeleteTestimonial = async (testimonialId: string) => {
    try {
      await axios.delete(`http://localhost:5002/api/testimonials/${testimonialId}`);
      setTestimonials(testimonials.filter((testimonial) => testimonial._id !== testimonialId));
    } catch (err) {
      setError("Failed to delete testimonial.");
    }
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
          />
        ))}
      </div>
    );
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-4">Testimonials Management</h1>
          <p className="text-gray-600">Create, edit, and manage client testimonials</p>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="py-6 space-y-8">

          {/* Create/Edit Testimonial Form */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 p-4 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingTestimonial ? 'Edit Testimonial' : 'Create a New Testimonial'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    placeholder="Client's name"
                    value={editingTestimonial ? editingTestimonial.name : newTestimonial.name}
                    onChange={(e) => 
                      editingTestimonial
                        ? setEditingTestimonial({ ...editingTestimonial, name: e.target.value })
                        : setNewTestimonial({ ...newTestimonial, name: e.target.value })
                    }
                    className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Role</label>
                  <input
                    type="text"
                    placeholder="Client's role/position"
                    value={editingTestimonial ? editingTestimonial.role : newTestimonial.role}
                    onChange={(e) => 
                      editingTestimonial
                        ? setEditingTestimonial({ ...editingTestimonial, role: e.target.value })
                        : setNewTestimonial({ ...newTestimonial, role: e.target.value })
                    }
                    className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Content</label>
                  <textarea
                    placeholder="Client's testimonial"
                    value={editingTestimonial ? editingTestimonial.content : newTestimonial.content}
                    onChange={(e) => 
                      editingTestimonial
                        ? setEditingTestimonial({ ...editingTestimonial, content: e.target.value })
                        : setNewTestimonial({ ...newTestimonial, content: e.target.value })
                    }
                    rows={3}
                    className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5 stars)</label>
                  <select
                    value={editingTestimonial ? editingTestimonial.stars : newTestimonial.stars}
                    onChange={(e) => 
                      editingTestimonial
                        ? setEditingTestimonial({ ...editingTestimonial, stars: parseInt(e.target.value) })
                        : setNewTestimonial({ ...newTestimonial, stars: parseInt(e.target.value) })
                    }
                    className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} star{num !== 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                {editingTestimonial ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingTestimonial(null);
                      }}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditTestimonial}
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
                    onClick={handleCreateTestimonial}
                    disabled={isLoading || !newTestimonial.content || !newTestimonial.name || !newTestimonial.role}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition flex items-center gap-2 disabled:opacity-70"
                  >
                    {isLoading ? 'Creating...' : (
                      <>
                        <PlusCircle size={16} />
                        Create Testimonial
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Testimonials List */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 p-4 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800">Manage Testimonials ({testimonials.length})</h2>
            </div>
            <div className="p-0">
              {testimonials.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No testimonials found. Create your first testimonial below.
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial._id} className="p-4 hover:bg-gray-50 transition">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                              <p className="text-sm text-gray-600">{testimonial.role}</p>
                              {renderStars(testimonial.stars)}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingTestimonial(testimonial);
                                }}
                                className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-md transition"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteTestimonial(testimonial._id)}
                                className="p-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          <p className="mt-2 text-gray-600">{testimonial.content}</p>
                        </div>
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

export default CRUDTestimonial;
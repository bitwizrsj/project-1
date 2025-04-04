import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Briefcase, Folder, Mail, Users, Star } from 'lucide-react';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="bg-slate-900 h-16 w-full"></div>
      <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
        <div className="container mx-auto max-w-6xl py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Overview and quick actions</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Jobs/Categories Card */}
            <Link 
              to="/dashboard/jobs" 
              className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Briefcase className="text-blue-500" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Jobs & Categories</h2>
                  <p className="text-gray-600 text-sm">Manage job listings and categories</p>
                </div>
              </div>
            </Link>

            {/* Projects Card */}
            <Link to="/dashboard/projects" className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 hover:shadow-md transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Folder className="text-green-500" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Projects</h2>
                  <p className="text-gray-600 text-sm">Manage portfolio projects</p>
                </div>
              </div>
            </Link>

            {/* Contacts Card */}
            <Link to="/dashboard/messages" className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 hover:shadow-md transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Mail className="text-purple-500" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Contacts</h2>
                  <p className="text-gray-600 text-sm">View and manage contact messages</p>
                </div>
              </div>
            </Link>

            {/* Users Card */}
            <Link to="blogs" className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 hover:shadow-md transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-full">
                  <Users className="text-amber-500" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Blogs</h2>
                  <p className="text-gray-600 text-sm">Manage admin blogs</p>
                </div>
              </div>
            </Link>

            {/* Testimonials Card */}
            <Link to="/dashboard/testimonials" className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 hover:shadow-md transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Star className="text-yellow-500" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Testimonials</h2>
                  <p className="text-gray-600 text-sm">Manage client testimonials</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

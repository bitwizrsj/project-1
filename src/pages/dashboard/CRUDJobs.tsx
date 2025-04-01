// src/pages/CRUDJobs.tsx
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Job } from "../Careers/types/job";
import { Category } from "../Careers/types/category";
import { PlusCircle, Edit, Trash2, Briefcase, Tag, ArrowLeft } from 'lucide-react';

const CRUDJobs = () => {
    const [activeTab, setActiveTab] = useState('jobs');
    const [jobs, setJobs] = useState<Job[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [newJob, setNewJob] = useState<Job>({
        title: "",
        company: "",
        location: "",
        type: "",
        salary: "",
        postedAt: "",
        category: "",
        id: 0,
    });
    const [newCategory, setNewCategory] = useState<Category>({
        name: "",
        icon: "",
    });
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();

    // Fetch jobs data
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:5002/api/admin/jobs");
                setJobs(response.data);
            } catch (err) {
                setError("Failed to load jobs.");
            }
        };

        fetchJobs();
    }, []);

    // Fetch categories data
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:5002/api/admin/categories");
                setCategories(response.data);
            } catch (err) {
                setError("Failed to load categories.");
            }
        };

        fetchCategories();
    }, []);

    // Handle creating a new job
    const handleCreateJob = async () => {
        try {
            const response = await axios.post("http://localhost:5002/api/admin/jobs", newJob);
            setJobs([...jobs, response.data]);
            setNewJob({
                title: "",
                company: "",
                location: "",
                type: "",
                salary: "",
                postedAt: "",
                category: "",
                id: 0,
            });
        } catch (err) {
            setError("Failed to create job.");
        }
    };

    // Handle editing an existing job
    const handleEditJob = async () => {
        if (!editingJob) return;
        try {
            const response = await axios.put(
                `http://localhost:5002/api/admin/jobs/${editingJob._id}`,
                editingJob
            );
            setJobs(
                jobs.map((job) =>
                    String(job._id) === String(editingJob._id) ? response.data : job
                )
            );
            setEditingJob(null);
        } catch (err) {
            setError("Failed to update job.");
        }
    };

    // Handle deleting a job
    const handleDeleteJob = async (jobId: number) => {
        console.log("Deleting job with ID:", jobId);
        if (!jobId) {
            setError("Invalid job ID.");
            return;
        }

        try {
            await axios.delete(`http://localhost:5002/api/admin/jobs/${jobId}`);
            setJobs(jobs.filter((job) => job.id !== jobId));
        } catch (err) {
            setError("Failed to delete job.");
        }
    };

    // Handle creating a new category
    const handleCreateCategory = async () => {
        try {
            const response = await axios.post("http://localhost:5002/api/admin/categories", newCategory);
            setCategories([...categories, response.data]);
            setNewCategory({ name: "", icon: "" });
        } catch (err) {
            setError("Failed to create category.");
        }
    };

    // Handle editing an existing category
    const handleEditCategory = async () => {
        if (!editingCategory) return;
        try {
            const response = await axios.put(
                `http://localhost:5002/api/admin/categories/${editingCategory._id}`,
                editingCategory
            );
            setCategories(
                categories.map((category) =>
                    String(category._id) === String(editingCategory._id) ? response.data : category
                )
            );
            setEditingCategory(null);
        } catch (err) {
            setError("Failed to update category.");
        }
    };

    // Handle deleting a category
    const handleDeleteCategory = async (categoryId: number) => {
        try {
            await axios.delete(`http://localhost:5002/api/admin/categories/${categoryId}`);
            setCategories(categories.filter((category) => category.id !== categoryId));
        } catch (err) {
            setError("Failed to delete category.");
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-4">Jobs & Categories Management</h1>
                    <p className="text-gray-600">Create, edit, and manage jobs and categories</p>
                </header>

                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Custom Tabs */}
                <div className="mb-8">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('jobs')}
                            className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${activeTab === 'jobs'
                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <Briefcase size={18} />
                            <span>Jobs</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('categories')}
                            className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${activeTab === 'categories'
                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <Tag size={18} />
                            <span>Categories</span>
                        </button>
                    </div>

                    {/* Jobs Tab Content */}
                    {activeTab === 'jobs' && (
                        <div className="py-6 space-y-8">
                            {/* Jobs List */}
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                <div className="border-b border-gray-200 p-4 bg-gray-50">
                                    <h2 className="text-xl font-semibold text-gray-800">Manage Jobs</h2>
                                </div>
                                <div className="p-0">
                                    {jobs.length === 0 ? (
                                        <div className="p-6 text-center text-gray-500">
                                            No jobs found. Create your first job below.
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-gray-200">
                                            {jobs.map((job) => (
                                                <div key={job.id} className="flex justify-between items-center p-4 hover:bg-gray-50 transition">
                                                    <div className="flex-1 mr-4">
                                                        <p className="font-semibold text-gray-900">{job.title}</p>
                                                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                                            <span>{job.company}</span>
                                                            <span className="h-1 w-1 bg-gray-400 rounded-full"></span>
                                                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">{job.type}</span>
                                                            <span className="h-1 w-1 bg-gray-400 rounded-full"></span>
                                                            <span>{job.location}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setEditingJob(job)}
                                                            className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-md transition text-sm flex items-center gap-1"
                                                        >
                                                            <Edit size={16} />
                                                            <span className="sr-only md:not-sr-only">Edit</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteJob(job._id)}
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

                            {/* Create/Edit Job Form */}
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                <div className="border-b border-gray-200 p-4 bg-gray-50">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {editingJob ? 'Edit Job' : 'Create a New Job'}
                                    </h2>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Frontend Developer"
                                                value={editingJob ? editingJob.title : newJob.title}
                                                onChange={(e) => editingJob
                                                    ? setEditingJob({ ...editingJob, title: e.target.value })
                                                    : setNewJob({ ...newJob, title: e.target.value })}
                                                className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Acme Inc."
                                                value={editingJob ? editingJob.company : newJob.company}
                                                onChange={(e) => editingJob
                                                    ? setEditingJob({ ...editingJob, company: e.target.value })
                                                    : setNewJob({ ...newJob, company: e.target.value })}
                                                className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Remote, New York, NY"
                                                value={editingJob ? editingJob.location : newJob.location}
                                                onChange={(e) => editingJob
                                                    ? setEditingJob({ ...editingJob, location: e.target.value })
                                                    : setNewJob({ ...newJob, location: e.target.value })}
                                                className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. $80,000 - $100,000"
                                                value={editingJob ? editingJob.salary : newJob.salary}
                                                onChange={(e) => editingJob
                                                    ? setEditingJob({ ...editingJob, salary: e.target.value })
                                                    : setNewJob({ ...newJob, salary: e.target.value })}
                                                className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                                            <select
                                                value={editingJob ? editingJob.type : newJob.type}
                                                onChange={(e) => editingJob
                                                    ? setEditingJob({ ...editingJob, type: e.target.value })
                                                    : setNewJob({ ...newJob, type: e.target.value })}
                                                className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select Job Type</option>
                                                <option value="Full-time">Full-time</option>
                                                <option value="Internship">Internship</option>
                                                <option value="Part-time">Part-time</option>
                                                <option value="Contract">Contract</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                            <select
                                                value={editingJob ? editingJob.category : newJob.category}
                                                onChange={(e) => editingJob
                                                    ? setEditingJob({ ...editingJob, category: e.target.value })
                                                    : setNewJob({ ...newJob, category: e.target.value })}
                                                className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.name}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {!editingJob && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Posted At</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. 2025-04-01"
                                                    value={newJob.postedAt}
                                                    onChange={(e) => setNewJob({ ...newJob, postedAt: e.target.value })}
                                                    className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        {editingJob ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setEditingJob(null)}
                                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleEditJob}
                                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition flex items-center gap-2"
                                                >
                                                    <Edit size={16} />
                                                    Save Changes
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={handleCreateJob}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition flex items-center gap-2"
                                            >
                                                <PlusCircle size={16} />
                                                Create Job
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Categories Tab Content */}
                    {activeTab === 'categories' && (
                        <div className="py-6 space-y-8">
                            {/* Categories List */}
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                <div className="border-b border-gray-200 p-4 bg-gray-50">
                                    <h2 className="text-xl font-semibold text-gray-800">Manage Categories</h2>
                                </div>
                                <div className="p-0">
                                    {categories.length === 0 ? (
                                        <div className="p-6 text-center text-gray-500">
                                            No categories found. Create your first category below.
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                                            {categories.map((category) => (
                                                <div key={category.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:bg-gray-50 transition">
                                                    <div className="p-4 flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                        <p className="font-medium text-gray-800">{category.icon}</p>
                                                            <span className="font-medium text-gray-800">{category.name}</span>
                                                        </div>
                                                        <div className="flex gap-1">
                                                            <button
                                                                onClick={() => setEditingCategory(category)}
                                                                className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-md transition"
                                                            >
                                                                <Edit size={14} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteCategory(category._id)}
                                                                className="p-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Create/Edit Category Form */}
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                <div className="border-b border-gray-200 p-4 bg-gray-50">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {editingCategory ? 'Edit Category' : 'Create a New Category'}
                                    </h2>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Development"
                                                value={editingCategory ? editingCategory.name : newCategory.name}
                                                onChange={(e) => editingCategory
                                                    ? setEditingCategory({ ...editingCategory, name: e.target.value })
                                                    : setNewCategory({ ...newCategory, name: e.target.value })}
                                                className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Icon URL</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. https://example.com/icon.svg"
                                                value={editingCategory ? editingCategory.icon : newCategory.icon}
                                                onChange={(e) => editingCategory
                                                    ? setEditingCategory({ ...editingCategory, icon: e.target.value })
                                                    : setNewCategory({ ...newCategory, icon: e.target.value })}
                                                className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        {editingCategory ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setEditingCategory(null)}
                                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleEditCategory}
                                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition flex items-center gap-2"
                                                >
                                                    <Edit size={16} />
                                                    Save Changes
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={handleCreateCategory}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition flex items-center gap-2"
                                            >
                                                <PlusCircle size={16} />
                                                Create Category
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
        
    );
};

export default CRUDJobs;
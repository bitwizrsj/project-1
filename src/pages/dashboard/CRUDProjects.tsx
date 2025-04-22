import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { PlusCircle, Edit, Trash2, Folder, ArrowLeft } from 'lucide-react';

interface Project {
    _id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    createdAt: string;
    updatedAt: string;
}

const CRUDProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [newProject, setNewProject] = useState<Omit<Project, '_id' | 'createdAt' | 'updatedAt'>>({
        title: "",
        description: "",
        image: "",
        technologies: [],
    });
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated } = useAuth();

    // Fetch projects data
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:5002/api/projects");
                setProjects(response.data);
            } catch (err) {
                setError("Failed to load projects.");
            }
        };

        fetchProjects();
    }, []);

    // Handle image file selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    // Handle creating a new project
    const handleCreateProject = async () => {
        if (!newProject.title || !newProject.description || !imageFile) {
            setError("Title, description, and image are required.");
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', newProject.title);
            formData.append('description', newProject.description);
            formData.append('technologies', newProject.technologies.join(','));
            formData.append('image', imageFile);

            const response = await axios.post("http://localhost:5002/api/projects", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setProjects([...projects, response.data]);
            setNewProject({
                title: "",
                description: "",
                image: "",
                technologies: [],
            });
            setImageFile(null);
            setError(null);
        } catch (err) {
            setError("Failed to create project.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle editing an existing project
    const handleEditProject = async () => {
        if (!editingProject) return;

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', editingProject.title);
            formData.append('description', editingProject.description);
            formData.append('technologies', editingProject.technologies.join(','));
            if (imageFile) {
                formData.append('image', imageFile);
            }

            const response = await axios.put(
                `http://localhost:5002/api/projects/${editingProject._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setProjects(
                projects.map((project) =>
                    project._id === editingProject._id ? response.data : project
                )
            );
            setEditingProject(null);
            setImageFile(null);
            setError(null);
        } catch (err) {
            setError("Failed to update project.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle deleting a project
    const handleDeleteProject = async (projectId: string) => {
        if (!projectId) {
            setError("Invalid project ID.");
            return;
        }

        try {
            await axios.delete(`http://localhost:5002/api/projects/${projectId}`);
            setProjects(projects.filter((project) => project._id !== projectId));
        } catch (err) {
            setError("Failed to delete project.");
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-4">Projects Management</h1>
                        <p className="text-gray-600">Create, edit, and manage portfolio projects</p>
                    </header>

                    {error && (
                        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <div className="py-6 space-y-8">
                        {/* Create/Edit Project Form */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <div className="border-b border-gray-200 p-4 bg-gray-50">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {editingProject ? 'Edit Project' : 'Create a New Project'}
                                </h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. E-commerce Website"
                                            value={editingProject ? editingProject.title : newProject.title}
                                            onChange={(e) =>
                                                editingProject
                                                    ? setEditingProject({ ...editingProject, title: e.target.value })
                                                    : setNewProject({ ...newProject, title: e.target.value })
                                            }
                                            className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            placeholder="Describe the project..."
                                            value={editingProject ? editingProject.description : newProject.description}
                                            onChange={(e) =>
                                                editingProject
                                                    ? setEditingProject({ ...editingProject, description: e.target.value })
                                                    : setNewProject({ ...newProject, description: e.target.value })
                                            }
                                            rows={3}
                                            className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {editingProject ? 'Update Image (optional)' : 'Project Image (required)'}
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {editingProject && !imageFile && (
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">Current image:</p>
                                                <img
                                                    src={`http://localhost:5002${editingProject.image}`}
                                                    alt={editingProject.title}
                                                    className="w-32 h-32 object-cover rounded-md mt-1"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma separated)</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. React, Node.js, MongoDB"
                                            value={
                                                editingProject
                                                    ? editingProject.technologies.join(', ')
                                                    : newProject.technologies.join(', ')
                                            }
                                            onChange={(e) => {
                                                const techs = e.target.value.split(',').map(tech => tech.trim());
                                                editingProject
                                                    ? setEditingProject({ ...editingProject, technologies: techs })
                                                    : setNewProject({ ...newProject, technologies: techs });
                                            }}
                                            className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    {editingProject ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingProject(null);
                                                    setImageFile(null);
                                                }}
                                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleEditProject}
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
                                            onClick={handleCreateProject}
                                            disabled={isLoading || !newProject.title || !newProject.description || !imageFile}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition flex items-center gap-2 disabled:opacity-70"
                                        >
                                            {isLoading ? 'Creating...' : (
                                                <>
                                                    <PlusCircle size={16} />
                                                    Create Project
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Projects List */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <div className="border-b border-gray-200 p-4 bg-gray-50">
                                <h2 className="text-xl font-semibold text-gray-800">Manage Projects</h2>
                            </div>
                            <div className="p-0">
                                {projects.length === 0 ? (
                                    <div className="p-6 text-center text-gray-500">
                                        No projects found. Create your first project below.
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-200">
                                        {projects.map((project) => (
                                            <div key={project._id} className="flex justify-between items-center p-4 hover:bg-gray-50 transition">
                                                <div className="flex items-center gap-4 flex-1 mr-4">
                                                    <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                                                        {project.image && (
                                                            <img
                                                                src={project.image}
                                                                alt={project.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{project.title}</p>
                                                        <p className="text-sm text-gray-600 line-clamp-1">{project.description}</p>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {project.technologies.map((tech, index) => (
                                                                <span key={index} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditingProject(project);
                                                            setImageFile(null);
                                                        }}
                                                        className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-md transition text-sm flex items-center gap-1"
                                                    >
                                                        <Edit size={16} />
                                                        <span className="sr-only md:not-sr-only">Edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteProject(project._id)}
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

export default CRUDProjects;
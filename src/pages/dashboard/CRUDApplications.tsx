import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Briefcase, Mail, Download, Trash2, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

interface Application {
    _id: string;
    job_title: string;
    user_name: string;
    user_email: string;
    user_phone: string;
    message: string;
    resume: string;
    createdAt: string;
    read: boolean; // Add the read field
}

interface ContactMessage {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    read: boolean; // Add the read field
}

const CRUDApplications = () => {
    const [activeTab, setActiveTab] = useState<'applications' | 'messages'>('applications');
    const [applications, setApplications] = useState<Application[]>([]);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [unreadCount, setUnreadCount] = useState({
        applications: 0,
        messages: 0
    });
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [appsRes, msgsRes] = await Promise.all([
                    axios.get("http://localhost:5002/api/applications"),
                    axios.get("http://localhost:5002/api/contact-messages")
                ]);

                setApplications(appsRes.data);
                setMessages(msgsRes.data);

                // Calculate unread counts
                const unreadApps = appsRes.data.filter((app: Application) => !app.read).length;
                const unreadMsgs = msgsRes.data.filter((msg: ContactMessage) => !msg.read).length;

                setUnreadCount({
                    applications: unreadApps,
                    messages: unreadMsgs
                });
            } catch (err) {
                setError("Failed to load data.");
            }
        };

        fetchData();
    }, []);

    // Handle downloading resume
    const handleDownloadResume = (resumePath: string) => {
        window.open(`http://localhost:5002${resumePath}`, '_blank');
    };

    // Handle deleting application
    const handleDeleteApplication = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5002/api/applications/${id}`);
            setApplications(applications.filter(app => app._id !== id));
        } catch (err) {
            setError("Failed to delete application.");
        }
    };

    // Handle deleting message
    const handleDeleteMessage = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5002/api/contact-messages/${id}`);
            setMessages(messages.filter(msg => msg._id !== id));
        } catch (err) {
            setError("Failed to delete message.");
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-4">Applications & Messages</h1>
                        <p className="text-gray-600">Manage job applications and contact messages</p>
                    </header>

                    {error && (
                        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="mb-8">
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('applications')}
                                className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors relative ${activeTab === 'applications'
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Briefcase size={18} />
                                <span>Job Applications</span>
                                {unreadCount.applications > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {unreadCount.applications}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('messages')}
                                className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors relative ${activeTab === 'messages'
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Mail size={18} />
                                <span>Contact Messages</span>
                                {unreadCount.messages > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {unreadCount.messages}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Applications Tab Content */}
                        {activeTab === 'applications' && (
                            <div className="py-6">
                                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                    <div className="border-b border-gray-200 p-4 bg-gray-50">
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Job Applications ({applications.length})
                                        </h2>
                                    </div>
                                    <div className="p-0">
                                        {applications.length === 0 ? (
                                            <div className="p-6 text-center text-gray-500">
                                                No applications found.
                                            </div>
                                        ) : (
                                            <div className="divide-y divide-gray-200">
                                                {applications.map((application) => (
                                                    <div key={application._id} className="p-4 hover:bg-gray-50 transition">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="font-semibold text-gray-900">{application.user_name}</h3>
                                                                <p className="text-sm text-gray-600 mt-1">
                                                                    Applied for: <span className="font-medium">{application.job_title}</span>
                                                                </p>
                                                                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                                                    <span>{application.user_email}</span>
                                                                    <span className="h-1 w-1 bg-gray-400 rounded-full"></span>
                                                                    <span>{application.user_phone}</span>
                                                                </div>
                                                                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                                                    {application.message}
                                                                </p>
                                                                <p className="mt-2 text-xs text-gray-400">
                                                                    {format(new Date(application.createdAt), 'MMM dd, yyyy HH:mm')}
                                                                </p>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => handleDownloadResume(application.resume)}
                                                                    className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md transition"
                                                                    title="Download Resume"
                                                                >
                                                                    <Download size={16} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteApplication(application._id)}
                                                                    className="p-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition"
                                                                    title="Delete Application"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Messages Tab Content */}
                        {activeTab === 'messages' && (
                            <div className="py-6">
                                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                    <div className="border-b border-gray-200 p-4 bg-gray-50">
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Contact Messages ({messages.length})
                                        </h2>
                                    </div>
                                    <div className="p-0">
                                        {messages.length === 0 ? (
                                            <div className="p-6 text-center text-gray-500">
                                                No messages found.
                                            </div>
                                        ) : (
                                            <div className="divide-y divide-gray-200">
                                                {messages.map((message) => (
                                                    <div key={message._id} className="p-4 hover:bg-gray-50 transition">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="font-semibold text-gray-900">{message.name}</h3>
                                                                <p className="text-sm text-gray-600 mt-1">{message.email}</p>
                                                                <p className="mt-2 text-sm text-gray-600">
                                                                    {message.message}
                                                                </p>
                                                                <p className="mt-2 text-xs text-gray-400">
                                                                    {format(new Date(message.createdAt), 'MMM dd, yyyy HH:mm')}
                                                                </p>
                                                            </div>
                                                            <button
                                                                onClick={() => handleDeleteMessage(message._id)}
                                                                className="p-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition"
                                                                title="Delete Message"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
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

export default CRUDApplications;

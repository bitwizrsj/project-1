import React, { useRef, FormEvent, useState } from "react";
import { X } from "lucide-react";

interface ApplicationFormProps {
  jobTitle: string;
  onClose: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ jobTitle, onClose }) => {
  const form = useRef<HTMLFormElement>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); // ✅ Added loading state

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResume(e.target.files[0]);
    }
  };

  const sendApplication = async (e: FormEvent) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_title", jobTitle);
    formData.append("user_name", form.current!.user_name.value);
    formData.append("user_email", form.current!.user_email.value);
    formData.append("user_phone", form.current!.user_phone.value);
    formData.append("message", form.current!.message.value);

    try {
      setLoading(true); // ✅ Start loading

      const response = await fetch("http://localhost:5002/api/apply", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Application submitted successfully!");
        onClose();
      } else {
        alert("Failed to submit application: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting application. Please try again.");
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Apply for {jobTitle}</h2>
        <form ref={form} onSubmit={sendApplication} encType="multipart/form-data" className="space-y-4">
          <input type="hidden" name="job_title" value={jobTitle} />

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="user_name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={loading} // ✅ Disable input when loading
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="user_email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={loading} // ✅ Disable input when loading
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="user_phone"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={loading} // ✅ Disable input when loading
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
            <textarea
              name="message"
              rows={4}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={loading} // ✅ Disable input when loading
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Resume (PDF)</label>
            <input
              type="file"
              name="resume"
              accept=".pdf"
              required
              onChange={handleFileChange}
              className="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={loading} // ✅ Disable input when loading
            />
          </div>

          <button
            type="submit"
            className={`w-full text-white py-2 px-4 rounded-md transition-colors ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading} // ✅ Disable button when loading
          >
            {loading ? "Submitting..." : "Submit Application"} {/* ✅ Show loading text */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;

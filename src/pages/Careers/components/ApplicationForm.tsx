import React, { useRef, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { X } from 'lucide-react';

interface ApplicationFormProps {
  jobTitle: string;
  onClose: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ jobTitle, onClose }) => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          'service_a292lrb',
          'template_wvaqmj9',
          form.current,
          '1Ay1s6EjozEEWRxbk'
        )
        .then(
          (result) => {
            console.log(result.text);
            alert('Application submitted successfully!');
            onClose();
          },
          (error) => {
            console.log(error.text);
            alert('Failed to submit application. Please try again.');
          }
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Apply for {jobTitle}</h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <input type="hidden" name="job_title" value={jobTitle} />
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="user_name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="user_email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="user_phone"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
            <textarea
              name="message"
              rows={4}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div>
          <label className="block text-sm font-medium text-gray-700">Resume/CV Link</label>
  <input
    type="url"
    name="resume_link"
    placeholder="Paste the link to your Resume/CV (e.g., Google Drive, Dropbox)"
    required
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
  />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
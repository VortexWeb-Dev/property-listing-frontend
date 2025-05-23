import React, { useState } from "react";
import { X } from "lucide-react";

const CreateCourse = ({ isOpen, onClose, onSuccess }) => {
  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Get auth token from localStorage or wherever it's stored
      const authToken = localStorage.getItem('authToken'); // Adjust this based on where you store the token

      if (!authToken) {
        throw new Error("Authentication token not found. Please login again.");
      }

      const response = await fetch('https://backend.myemirateshome.com/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}` // Adjust format if needed
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const newCourse = await response.json();
        // Reset form
        setFormData({ title: "", description: "" });
        // Call success callback
        onSuccess(newCourse);
        // Close modal
        onClose();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create course');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      setError(error.message || 'An error occurred while creating the course.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal and reset form
  const handleClose = () => {
    setFormData({ title: "", description: "" });
    setError("");
    onClose();
  };

  // Don't render anything if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Create New Course</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            disabled={isSubmitting}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Title Field */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Course Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Enter course title"
            />
          </div>

          {/* Description Field */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Course Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Enter course description"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
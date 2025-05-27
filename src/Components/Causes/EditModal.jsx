// src/components/EditModal.jsx

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCause, clearCauseMessages } from "../../Redux/causeSlice";

const EditModal = ({ isOpen, onClose, causeData }) => {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.causes);
  const [isVisible, setIsVisible] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    goal: "",
    description: "",
  });

  // Initialize form data and handle animation when modal opens or causeData changes
  useEffect(() => {
    if (causeData) {
      setFormData({
        name: causeData.name || "",
        goal: causeData.goal || "",
        description: causeData.description || "",
      });
    }

    // Handle animation
    if (isOpen) {
      // Trigger animation after modal opens
      setTimeout(() => setIsVisible(true), 10);
    } else {
      // Reset animation state when modal closes
      setIsVisible(false);
    }
  }, [causeData, isOpen]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!causeData?._id) {
      console.error("No cause ID provided");
      return;
    }

    // Prepare data for API
    const updateData = {
      _id: causeData._id,
      name: formData.name,
      goal: parseFloat(formData.goal),
      description: formData.description,
    };

    try {
      const result = await dispatch(updateCause(updateData));
      
      if (updateCause.fulfilled.match(result)) {
        // Success - animate close and then close modal
        setIsVisible(false);
        setTimeout(() => {
          onClose();
          dispatch(clearCauseMessages());
        }, 1500);
      }
    } catch (error) {
      console.error("Error updating cause:", error);
    }
  };

  // Handle modal close with animation
  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before closing
    setTimeout(() => {
      dispatch(clearCauseMessages());
      onClose();
    }, 300);
  };

  // Don't render if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <div 
          className={`bg-blue-50 rounded-lg shadow-xl w-120 max-w-md mx-4 transition-all duration-300 ease-out transform ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : '-translate-y-full opacity-0'
          }`}
        >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Edit Cause</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-600 cursor-pointer text-2xl font-bold leading-none"
            type="button"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Manage Clothes For All Children"
              required
            />
          </div>

          {/* Goal Field */}
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
              Goal
            </label>
            <input
              type="number"
              id="goal"
              name="goal"
              value={formData.goal}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="40000"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Good"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium cursor-pointer py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
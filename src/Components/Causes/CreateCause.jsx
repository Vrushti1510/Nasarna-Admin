import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCause, clearCauseMessages } from "../../Redux/causeSlice";

const CreateCause = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.causes);
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    goal: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Clear messages when component mounts or unmounts
  useEffect(() => {
    if (isOpen) {
      dispatch(clearCauseMessages());
      // Trigger animation after modal opens
      setTimeout(() => setIsVisible(true), 10);
    }
    // Clear animation state when modal closes
    if (!isOpen) {
      setIsVisible(false);
    }
  }, [isOpen, dispatch]);

  // Handle successful creation
  useEffect(() => {
    if (successMessage) {
      // Reset form
      setFormData({
        name: "",
        goal: "",
        description: "",
      });
      setFormErrors({});
      
      // Close modal after a short delay to show success message
      setTimeout(() => {
        handleClose();
      }, 1500);
    }
  }, [successMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Cause name is required";
    }

    if (!formData.goal.trim()) {
      errors.goal = "Goal amount is required";
    } else if (isNaN(formData.goal) || parseFloat(formData.goal) <= 0) {
      errors.goal = "Goal must be a valid positive number";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Convert goal to number before submitting
    const submitData = {
      ...formData,
      goal: parseFloat(formData.goal)
    };

    dispatch(createCause(submitData));
  };

  // Handle close with animation
  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before closing
    setTimeout(() => {
      setFormData({
        name: "",
        goal: "",
        description: "",
      });
      setFormErrors({});
      dispatch(clearCauseMessages());
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="pointer-events-auto">
        <div 
          className={`bg-white shadow-2xl rounded-lg p-6 w-120 max-w-md mx-4 transition-all duration-300 ease-out transform ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : '-translate-y-full opacity-0'
          }`}
        >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Create Cause</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-600 text-xl cursor-pointer transition-colors duration-200"
            disabled={loading}
          >
            ×
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                formErrors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter cause name"
              disabled={loading}
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}
          </div>

          {/* Goal Field */}
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-600 mb-1">
              Goal
            </label>
            <input
              type="number"
              id="goal"
              name="goal"
              value={formData.goal}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                formErrors.goal ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter goal amount"
              min="0"
              step="0.01"
              disabled={loading}
            />
            {formErrors.goal && (
              <p className="text-red-500 text-sm mt-1">{formErrors.goal}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors duration-200 ${
                formErrors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter cause description"
              disabled={loading}
            />
            {formErrors.description && (
              <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-32 cursor-pointer py-2 px-4 rounded-md text-white font-medium transition-colors duration-200 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
          >
            {loading ? 'Creating Cause...' : 'Create Cause'}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCause;
// src/components/ViewModal.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCauses } from '../../Redux/causeSlice';
// import { getCausesAPI } from '../../Redux/api/apiCalls';

const ViewModal = ({ isOpen, onClose, causeId }) => {
  const dispatch = useDispatch();
  const { causes, loading, error } = useSelector((state) => state.causes);
  const [selectedCause, setSelectedCause] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Fetch cause details when modal opens or causeId changes
  useEffect(() => {
    if (isOpen && causeId) {
      fetchCauseDetails();
      // Trigger animation after modal opens
      setTimeout(() => setIsVisible(true), 10);
    }
    // Clear selected cause when modal closes
    if (!isOpen) {
      setSelectedCause(null);
      setIsVisible(false);
    }
  }, [isOpen, causeId]);

  const fetchCauseDetails = async () => {
    try {
      setLocalLoading(true);
      
      // First try to find cause in Redux state
      const causeFromState = causes.find(cause => cause._id === causeId);
      
      if (causeFromState) {
        setSelectedCause(causeFromState);
      } else {
        // If not found in state, fetch from API
        const causesData = await getCausesAPI();
        const cause = causesData.find(c => c._id === causeId);
        
        if (cause) {
          setSelectedCause(cause);
          // Also dispatch to update Redux state
          dispatch(fetchCauses());
        }
      }
    } catch (err) {
      console.error('Error fetching cause details:', err);
    } finally {
      setLocalLoading(false);
    }
  };

  // Handle close with animation
  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before closing
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <div 
          className={`bg-blue-50 shadow-2xl rounded-lg max-w-md w-120 mx-4 mt-8 h-fit transition-all duration-300 ease-out transform ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : '-translate-y-full opacity-0'
          }`}
        style={{
          maxHeight: 'calc(100vh - 4rem)',
          overflowY: 'auto'
        }}
        >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Cause Details</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-600 cursor-pointer text-xl font-light transition-colors duration-200"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-3">
          {localLoading || loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600 text-sm">Loading...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 text-sm">Error loading cause details</p>
              <button
                onClick={fetchCauseDetails}
                className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors duration-200"
              >
                Retry
              </button>
            </div>
          ) : !selectedCause ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-sm">Cause not found</p>
            </div>
          ) : (
            <div className="space-y-3 text-sm">
              {/* Cause ID */}
              <div>
                <span className="text-gray-600">
                  <strong>CauseId:</strong> {selectedCause._id}
                </span>
              </div>

              {/* Name */}
              <div>
                <span className="text-gray-600">
                  <strong>Name:</strong> {selectedCause.name}
                </span>
              </div>

              {/* Goal */}
              <div>
                <span className="text-gray-600">
                  <strong>Goal:</strong> {selectedCause.goal || 0}
                </span>
              </div>

              {/* Raised */}
              <div>
                <span className="text-gray-600">
                  <strong>Raised:</strong> {selectedCause.raised || 0}
                </span>
              </div>

              {/* Status */}
              <div>
                <span className="text-gray-600">
                  <strong>Status:</strong> {selectedCause.status || 'unknown'}
                </span>
              </div>

              {/* Created */}
              <div>
                <span className="text-gray-600">
                  <strong>Created:</strong> {formatDate(selectedCause.createdAt)}
                </span>
              </div>

              {/* Status (duplicate as shown in image) */}
              <div>
                <span className="text-gray-600">
                  <strong>Status:</strong> {selectedCause.status || 'unknown'}
                </span>
              </div>

              {/* Description */}
              <div>
                <span className="text-gray-600">
                  <strong>Description:</strong> {selectedCause.description || 'No description'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 cursor-pointer bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors duration-200"
          >
            Close
          </button>
        </div>
        </div>
        </div>
    </div>
  );
};

export default ViewModal;
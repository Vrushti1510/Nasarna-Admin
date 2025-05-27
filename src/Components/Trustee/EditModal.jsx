import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTrustee, fetchTrustees } from '../../Redux/trusteeSlice';

export default function EditModal({ isOpen, onClose, trustee }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.trustees);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  // Populate form with trustee data when modal opens
  useEffect(() => {
    if (isOpen && trustee) {
      setFormData({
        // Handle data whether it's directly on trustee or nested in userId
        name: trustee?.userId?.name || trustee?.name || '',
        email: trustee?.userId?.email || trustee?.email || '',
        phone: trustee?.phone || '',
        address: trustee?.address || '',
        city: trustee?.city || '',
        pincode: trustee?.pincode || ''
      });
    }
  }, [isOpen, trustee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await dispatch(updateTrustee({ id: trustee._id, updatedData: formData })).unwrap();
      await dispatch(fetchTrustees()); // refresh list after update
      onClose();
    } catch (err) {
      console.error('Failed to update trustee:', err);
    }
  };

  if (!isOpen || !trustee) return null;

  return (
    <div className="fixed inset-0 bg-blue-100 bg-opacity-0.5 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700 text-xl"
          aria-label="Close"
        >
          ×
        </button>

        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-6">Edit Trustee</h2>

          <div className="space-y-4">
            {['name', 'email', 'phone', 'address', 'city', 'pincode'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">{field}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            {error && (
              <div className="text-red-500 text-sm">
                Error: {error}
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={handleSaveChanges}
                className={`bg-green-600 hover:bg-green-700 text-white cursor-pointer font-medium px-6 py-2 rounded ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>

              <button
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 cursor-pointer px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
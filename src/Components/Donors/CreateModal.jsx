import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDonor } from '../../Redux/donorSlice'; // adjust path if needed

const CreateModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(createDonor(formData));
  //   onClose();
  // };

  const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(createDonor(formData));
  onClose(); // Closes modal
  setFormData({ name: '', email: '', gender: '', phone: '', address: '', city: '', pincode: '' });
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-100 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-screen flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl text-gray-700 font-medium">Create Donor</h2>
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            ×
          </button>
        </div>
        
        <div className="overflow-y-auto flex-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="py-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Gender</label>
                <div className="flex space-x-6">
                  {['male', 'female', 'other'].map((g) => (
                    <div key={g} className="flex items-center">
                      <input
                        type="radio"
                        id={g}
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label htmlFor={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="eg. Home number, Area, Society"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-600 mb-2">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer py-2 px-6 rounded font-medium"
                >
                  Create Donor
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;

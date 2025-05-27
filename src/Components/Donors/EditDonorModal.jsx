import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDonor } from "../../Redux/donorSlice"; // Using your correct import path

const EditDonorModal = ({ donor, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.donors);
  
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    gender: "Male",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    if (donor) {
      setFormData({
        _id: donor._id || "",
        name: donor?.userId?.name || donor?.name || '',
        email: donor?.userId?.email || donor?.email || '',
        gender: donor?.gender || "",
        phone: donor.phone || "",
        address: donor.address || "",
        city: donor.city || "",
        pincode: donor.pincode || "",
      });
    }
  }, [donor, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderChange = (e) => {
    setFormData({
      ...formData,
      gender: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(updateDonor(formData));
    if (updateDonor.fulfilled.match(resultAction)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-100 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-screen flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Donor</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Scrollable area with hidden scrollbar */}
        <div className="overflow-y-auto flex-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Gender</label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleGenderChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleGenderChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={formData.gender === "Other"}
                    onChange={handleGenderChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Other</span>
                </label>
              </div>
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* City */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Pincode */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="text-red-500 mb-4">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-34 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Donor"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDonorModal;

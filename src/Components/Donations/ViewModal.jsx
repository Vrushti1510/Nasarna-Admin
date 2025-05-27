import React from "react";

const ViewModal = ({ donor, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100 bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Donor Details</h2>

        {/* Donor Details - You can customize these fields */}
        {donor ? (
          <div className="space-y-2 text-gray-700">
            <p><strong>Name:</strong> {donor.name}</p>
            <p><strong>Email:</strong> {donor.email}</p>
            {/* <p><strong>Phone:</strong> {donor.phone}</p> */}
            <p><strong>Status:</strong> {donor.status ? "Active" : "Inactive"}</p>
            <p><strong>Donation Amount:</strong> ${donor.amount}</p>
          </div>
        ) : (
          <p className="text-gray-500">No donor data available.</p>
        )}

        {/* Close Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 cursor-pointer text-gray-700 rounded-lg shadow hover:bg-gray-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;

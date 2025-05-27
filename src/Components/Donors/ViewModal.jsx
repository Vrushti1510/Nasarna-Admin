import React from "react";

const ViewModal = ({ isOpen, onClose, donor }) => {
  if (!isOpen || !donor) return null;
  
  // Get donor data from either direct properties or from userId object
  const name = donor?.userId?.name || donor?.name || "";
  const email = donor?.userId?.email || donor?.email || "";
  const gender = donor?.userId?.gender || donor?.gender || "male";
  const phone = donor?.userId?.phone || donor?.phone || "";
  const address = donor?.userId?.address || donor?.address || "";
  const city = donor?.userId?.city || donor?.city || "";
  const pincode = donor?.userId?.pincode || donor?.pincode || "";
  const status = donor?.status || "active";
  
  return (
    <div className="fixed inset-0 bg-blue-100 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Donor Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Name:</h3>
            <p className="text-gray-800">{name}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email:</h3>
            <p className="text-gray-800">{email}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Gender:</h3>
            <p className="text-gray-800">{gender}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Phone:</h3>
            <p className="text-gray-800">{phone}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Address:</h3>
            <p className="text-gray-800">{address}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">City:</h3> 
            <p className="text-gray-800">{city}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Pincode:</h3>
            <p className="text-gray-800">{pincode}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status:</h3>
            <div className="flex items-center">
              <div className={`w-2 h-2 mr-2 rounded-full ${
                status === "active" || status === "Active" ? "bg-green-500" : "bg-red-500"
              }`} />
              <span className="text-gray-600">{status}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 ml-75">
          <button 
            onClick={onClose}
            className="w-25 px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
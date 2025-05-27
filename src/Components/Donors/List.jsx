// src/components/donors/List.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDonors, toggleDonorStatus, deleteDonor } from "../../Redux/donorSlice"; // Added deleteDonor import
import CreateModal from "./CreateModal";
import ViewModal from "./ViewModal";
import EditDonorModal from "./EditDonorModal";

const List = () => {
  const dispatch = useDispatch();
  const { donorList, loading, error, createStatus } = useSelector((state) => state.donors);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const donorsPerPage = 10;

  useEffect(() => {
    dispatch(fetchDonors());
  }, [dispatch]);

  // Display success message when createStatus changes
  useEffect(() => {
    if (createStatus) {
      setSuccessMessage(createStatus);
      setShowSuccessToast(true);
    }
  }, [createStatus]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Auto hide success toast after 3 seconds
  useEffect(() => {
    let timer;
    if (showSuccessToast) {
      timer = setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showSuccessToast]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const toggleDropdown = (e, donorId) => {
    e.stopPropagation(); // Prevent click from triggering document click handler
    setActiveDropdown(activeDropdown === donorId ? null : donorId);
  };

  const handleEdit = (e, donor) => {
    e.stopPropagation();
    setSelectedDonor(donor);
    setIsEditModalOpen(true);
    setActiveDropdown(null);
  };

  const handleDelete = (e, donorId) => {
    e.stopPropagation();
    setDeleteId(donorId);
    setShowDeleteConfirm(true);
    setActiveDropdown(null);
  };
  
  // Updated confirmDelete function to dispatch the deleteDonor action
  const confirmDelete = () => {
     dispatch(deleteDonor(deleteId))
      .unwrap()
      .then(() => {
        // Success case handled by the createStatus useEffect
        setShowDeleteConfirm(false);
      })


      .catch((error) => {
        setSuccessMessage(`Error: ${error || "Failed to delete donor"}`);
        setShowSuccessToast(true);
        setShowDeleteConfirm(false);
      });
  };

  const handleViewDetails = (e, donor) => {
    e.stopPropagation();
    setSelectedDonor(donor);
    setIsViewDetailsOpen(true);
    setActiveDropdown(null);
  };

  const handleChangeStatus = (e, donor) => {
    e.stopPropagation();
    // Directly toggle the status without showing the modal
    dispatch(toggleDonorStatus(donor._id));
    setSuccessMessage(`${donor?.userId?.name || donor?.name}'s status changed successfully`);
    setShowSuccessToast(true);
    setActiveDropdown(null);
  };

  // const handleSubmitDonor = (formData) => {
  //   console.log("New donor data:", formData);
  //   // Here you would typically dispatch an action to add the donor
  //   // dispatch(addDonor(formData));
  //   setSuccessMessage("Donor created successfully");
  //   setShowSuccessToast(true);
  // };

  const handleSubmitDonor = (formData) => {
  console.log("New donor data:", formData);
  setSuccessMessage("Donor created successfully");
  setShowSuccessToast(true);
};


  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedDonor(null);
  };

  // Remove the handleStatusChange function since it's incorporated into handleChangeStatus
  const filteredDonors = donorList
    .filter((donor) => {
      // Ensure valid name and email exist (either directly or under userId)
      const name = donor?.userId?.name || donor?.name;
      const email = donor?.userId?.email || donor?.email;
      const city = donor?.userId?.city || donor?.city;
      return name && email && city; // Only include donors with valid name and email
    })
    .filter((donor) => {
      // Apply search filter
      const name = donor?.name?.toLowerCase() || donor?.userId?.name?.toLowerCase() || "";
      const email = donor?.email?.toLowerCase() || donor?.userId?.email?.toLowerCase() || "";
      const city = donor?.city?.toLowerCase() || donor?.userId?.city?.toLowerCase() || "";
      return name.includes(searchTerm) || email.includes(searchTerm) || city.includes(searchTerm);
    });

  const indexOfLastDonor = currentPage * donorsPerPage;
  const indexOfFirstDonor = indexOfLastDonor - donorsPerPage;
  const currentDonors = filteredDonors.slice(
    indexOfFirstDonor,
    indexOfLastDonor
  );
  const totalPages = Math.ceil(filteredDonors.length / donorsPerPage);

  // Status indicator component with green dot for active
  const StatusDot = ({ status }) => (
    <div className="flex items-center">
      <div 
        className={`w-2 h-2 mr-2 rounded-full ${
          status === "active" || status === "Active" ? "bg-green-500" : "bg-red-500"
        }`}
      />
      <span className="text-gray-600">{status || "active"}</span>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Delete Confirmation Toaster */}
      {showDeleteConfirm && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-lg shadow-lg border border-gray-200 w-80">
          <div className="p-4">
            <div className="flex items-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <h3 className="font-medium text-gray-800">Confirm Delete</h3>
            </div>
            <p className="text-gray-600 mb-4">Are you sure you want to Delete Donor?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1 cursor-pointer bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 py-1 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toaster */}
      {showSuccessToast && (
        <div className="fixed top-6 right-6 z-50 bg-white rounded-lg shadow-lg border border-gray-200 w-80">
          <div className="p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">{successMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-medium text-gray-800 mb-6">Donors List</h1>
      
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by Name or Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 cursor-pointer transition"
          onClick={() => setIsModalOpen(true)}
        >
          Create Donor
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr className="border-b border-blue-600">
                  <th className="text-left p-4 text-gray-500 font-medium">DONERID</th>
                  <th className="text-left p-4 text-gray-500 font-medium">NAME</th>
                  <th className="text-left p-4 text-gray-500 font-medium">EMAIL</th>
                  <th className="text-left p-4 text-gray-500 font-medium">STATUS</th>
                  <th className="text-left p-4 text-gray-500 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {currentDonors.map((donor) => (
                  <tr key={donor._id} className="border-b border-gray-100">
                    <td className="p-4 text-gray-600">{donor._id}</td>
                    <td className="p-4 text-gray-600">{donor?.userId?.name || donor?.name}</td>
                    <td className="p-4 text-gray-600">{donor?.userId?.email || donor?.email}</td>
                    <td className="p-4">
                      <StatusDot status={donor.status} />
                    </td>
                    <td className="p-4 text-end relative">
                      <button 
                        className="text-gray-500 hover:text-gray-700 cursor-pointer" 
                        onClick={(e) => toggleDropdown(e, donor._id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </button>
                      
                      {/* Dropdown Menu */}
                      {activeDropdown === donor._id && (
                        <div className="absolute right-12 top-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <div className="py-1">
                            <button
                              onClick={(e) => handleViewDetails(e, donor)}
                              className="w-full text-left px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              View Details
                            </button>
                            <button
                              onClick={(e) => handleEdit(e, donor)}
                              className="w-full text-left px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                <path d="M12 20h9"></path>
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={(e) => handleChangeStatus(e, donor)}
                              className="w-full text-left px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"></path>
                                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                              </svg>
                              Change Status
                            </button>
                            <button
                              onClick={(e) => handleDelete(e, donor._id)}
                              className="w-full text-left px-4 py-2 cursor-pointer text-sm text-red-600 hover:bg-gray-100 flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-6 space-x-2">
            <button 
              className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" className="cursor-pointer" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${
                  currentPage === num
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}
            
            <button 
              className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </>
      )}

      {/* Modals */}
      <CreateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSubmitDonor}
      />
      
      {/* Use the imported EditDonorModal component */}
      <EditDonorModal 
        isOpen={isEditModalOpen} 
        onClose={handleCloseEditModal} 
        donor={selectedDonor} 
      />
      
      <ViewModal 
        isOpen={isViewDetailsOpen} 
        onClose={() => setIsViewDetailsOpen(false)} 
        donor={selectedDonor} 
      />
    </div>
  );
};

export default List;
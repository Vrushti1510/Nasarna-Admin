import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDonations } from "../../Redux/donationSlice";
import ViewModal from "./ViewModal";

const DonationList = () => {
  const dispatch = useDispatch();
  const { donations, loading, error } = useSelector((state) => state.donations);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const donationsPerPage = 10;

  useEffect(() => {
    dispatch(fetchDonations());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const toggleDropdown = (e, donationId) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === donationId ? null : donationId);
  };

  const openDetailsModal = (donation) => {
    setSelectedDonation(donation);
    setShowModal(true);
    setActiveDropdown(null);
  };

  const filteredDonations = donations
    .filter((donation) => {
      const name = donation?.userId?.name || "";
      const email = donation?.userId?.email || "";
      const donorId = donation?._id || "";
      return name && email && donorId;
    })
    .filter((donation) => {
      const name = (donation?.userId?.name || "").toLowerCase();
      const email = (donation?.userId?.email || "").toLowerCase();
      const donorId = (donation?._id || "").toLowerCase();
      return name.includes(searchTerm) || email.includes(searchTerm) || donorId.includes(searchTerm);
    });

  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = filteredDonations.slice(indexOfFirstDonation, indexOfLastDonation);
  const totalPages = Math.ceil(filteredDonations.length / donationsPerPage);

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-medium text-gray-800 mb-6">Donations List</h1>

      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by Donor ID, Name or Email"
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={handleSearch}
        />
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
                  <th className="text-left p-4 text-gray-500 font-medium">DONOR ID</th>
                  <th className="text-left p-4 text-gray-500 font-medium">NAME</th>
                  <th className="text-left p-4 text-gray-500 font-medium">EMAIL</th>
                  <th className="text-left p-4 text-gray-500 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {currentDonations.map((donation) => (
                  <tr key={donation._id} className="border-b border-gray-100">
                    <td className="p-4 text-gray-600">{donation._id}</td>
                    <td className="p-4 text-gray-600">{donation?.userId?.name}</td>
                    <td className="p-4 text-gray-600">{donation?.userId?.email}</td>
                    <td className="p-4 text-end relative">
                      <button
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                        onClick={(e) => toggleDropdown(e, donation._id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </button>

                      {activeDropdown === donation._id && (
                        <div className="absolute right-12 top-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <div className="py-1">
                            <button
                              className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                              onClick={() => openDetailsModal(donation)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              View Details
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

          <div className="flex justify-end mt-6 space-x-2">
            {/* Previous Page Button */}
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === num ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}

            {/* Next Page Button */}
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </>
      )}

      {/* ViewModal Integration */}
      {showModal && selectedDonation && (
        <ViewModal
          donor={{
            id: selectedDonation._id,
            name: selectedDonation.userId?.name,
            email: selectedDonation.userId?.email,
            phone: selectedDonation.userId?.phone,
            status: selectedDonation.userId?.isActive,
            amount: selectedDonation.amount,
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default DonationList;

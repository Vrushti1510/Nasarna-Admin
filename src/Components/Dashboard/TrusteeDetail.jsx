import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTrustees,
  fetchDonorCountsByTrustee,
} from '../../Redux/trusteeSlice';

const TrusteeDetail = () => {
  const dispatch = useDispatch();
  const { trustees, donorCounts, loading, error } = useSelector((state) => state.trustees);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [displayTrustees, setDisplayTrustees] = useState([]);

  // Fetch trustees and donor counts on mount
  useEffect(() => {
    const fetchData = async () => {
      const action = await dispatch(fetchTrustees());
      if (fetchTrustees.fulfilled.match(action)) {
        const trusteeIds = action.payload.map((t) => t?.userId?._id);
        if (trusteeIds.length > 0) {
          dispatch(fetchDonorCountsByTrustee(trusteeIds));
        }
      }
    };
    fetchData();
  }, [dispatch]);

  // Merge donorCounts into trustees and apply filters
  useEffect(() => {
    // If donorCounts has the structure you're using in the table, use it directly
    let dataToFilter = [];
    
    if (donorCounts.length > 0) {
      // Use donorCounts directly as it seems to have trusteeName and donorCount
      dataToFilter = donorCounts.filter((item) => {
        const name = item.trusteeName;
        return name && name.trim() !== '' && name.toLowerCase() !== 'n/a';
      });
    } else {
      // Fallback to merging trustees with donorCounts
      const merged = trustees.map((trustee) => {
        const countObj = donorCounts.find((item) => item._id === trustee._id);
        return {
          ...trustee,
          donorCount: countObj?.donorCount ?? 0,
          trusteeName: trustee.userId?.name || trustee.name,
        };
      });

      dataToFilter = merged.filter((trustee) => {
        const name = trustee.trusteeName;
        return name && name.trim() !== '' && name.toLowerCase() !== 'n/a';
      });
    }

    let filtered = dataToFilter;

    // Apply search filter
    if (searchTerm.trim() !== '') {
      filtered = dataToFilter.filter((item) =>
        item.trusteeName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply show all logic
    if (!showAll && searchTerm.trim() === '') {
      filtered = filtered.slice(0, 5);
    }

    setDisplayTrustees(filtered);
  }, [trustees, donorCounts, searchTerm, showAll]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() !== '') {
      setShowAll(true);
    }
  };

  const handleSeeAll = () => {
    setSearchTerm('');
    setShowAll(!showAll); // Toggle between true and false
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setShowAll(false); // Reset to show only first 5
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading trustees...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Trustees Details</h1>
        
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Trustee Name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          
          {/* See All / Show Less Button */}
          <button
            onClick={handleSeeAll}
            className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            {showAll ? 'Show Top 5' : 'See All'}
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {searchTerm ? (
            `Showing ${displayTrustees.length} result(s) for "${searchTerm}"`
          ) : (
            `Showing ${displayTrustees.length} ${showAll ? 'of all' : 'of first 5'} trustees`
          )}
        </p>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Trustee Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Donors
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayTrustees.length > 0 ? (
              displayTrustees.map((trustee, index) => (
                <tr key={trustee._id || index} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {trustee.trusteeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {trustee.donorCount || 0}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                  {searchTerm ? `No trustees found matching "${searchTerm}"` : 'No trustees found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrusteeDetail;
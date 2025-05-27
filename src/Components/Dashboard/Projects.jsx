// src/components/Projects.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCauses } from '../../Redux/causeSlice';

const Projects = () => {
  const dispatch = useDispatch();
  const { causes, loading, error } = useSelector((state) => state.causes);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [displayCauses, setDisplayCauses] = useState([]);

  // Fetch causes on component mount
  useEffect(() => {
    dispatch(fetchCauses());
  }, [dispatch]);

  // Filter and display causes based on search query and showAll state
  useEffect(() => {
    // First, filter out causes with valid names
    const validCauses = causes.filter((cause) => {
      return cause.name && cause.name.trim() !== '';
    });

    let filtered = validCauses;

    // Apply search filter if search query exists
    if (searchQuery.trim() !== '') {
      filtered = validCauses.filter((cause) =>
        cause.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Show only first 5 if showAll is false and no search query
    if (!showAll && searchQuery.trim() === '') {
      filtered = filtered.slice(0, 5);
    }

    setDisplayCauses(filtered);
  }, [causes, searchQuery, showAll]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // When searching, automatically show all results
    if (e.target.value.trim() !== '') {
      setShowAll(true);
    }
  };

  const handleToggleShowAll = () => {
    setSearchQuery('');
    setShowAll(!showAll); // Toggle between true and false
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowAll(false); // Reset to show only first 5
  };

  // Calculate donation percentage
  const calculatePercentage = (raised, goal) => {
    if (!goal || goal === 0) return 0;
    return ((raised / goal) * 100).toFixed(2);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount || 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading projects...</div>
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
        <h1 className="text-2xl font-semibold text-gray-800">Projects & Events</h1>
        
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by project/event..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          
          {/* Toggle Show All / Show Less Button */}
          <button
            onClick={handleToggleShowAll}
            className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            {showAll ? 'Show Less' : 'Show All'}
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {searchQuery ? (
            `Showing ${displayCauses.length} result(s) for "${searchQuery}"`
          ) : (
            `Showing ${displayCauses.length} ${showAll ? 'of all' : 'of first 5'} projects`
          )}
        </p>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                PROJECT/EVENT NAME
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                DONATION GOAL ( ₹ )
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                DONATION RAISED ( ₹ )
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                DONATION RAISED (%)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayCauses.length > 0 ? (
              displayCauses.map((cause, index) => {
                const percentage = calculatePercentage(cause.raised, cause.goal);
                return (
                  <tr key={cause._id || index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {cause.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatCurrency(cause.goal)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatCurrency(cause.raised)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center">
                        <span className="text-green-500 mr-2">↑</span>
                        <span className={`font-medium ${
                          percentage > 100 ? 'text-green-600' : 
                          percentage > 50 ? 'text-blue-600' : 'text-gray-600'
                        }`}>
                          {percentage}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  {searchQuery ? 'No projects found matching your search.' : 'No projects available.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
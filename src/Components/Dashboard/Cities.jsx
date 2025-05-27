// src/components/Cities.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDonors } from "../../Redux/donorSlice";

const Cities = () => {
  const dispatch = useDispatch();
  const { donorList, loading, error } = useSelector((state) => state.donors);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [displayCities, setDisplayCities] = useState([]);

  // Fetch donors on component mount
  useEffect(() => {
    dispatch(fetchDonors());
  }, [dispatch]);

  // Filter and display cities based on search query and showAll state
  useEffect(() => {
    if (donorList.length > 0) {
      // Group donors by city and calculate statistics
      const cityStats = donorList.reduce((acc, donor) => {
        const city = donor.city || "Unknown City";
        if (!acc[city]) {
          acc[city] = {
            city,
            donorCount: 0,
          };
        }
        acc[city].donorCount += 1;
        return acc;
      }, {});

      // Convert to array and calculate percentages
      const totalDonors = donorList.length;
      let citiesArray = Object.values(cityStats).map((cityData) => ({
        ...cityData,
        percentage: ((cityData.donorCount / totalDonors) * 100).toFixed(2),
      }));

      // Sort by donor count (descending)
      citiesArray.sort((a, b) => b.donorCount - a.donorCount);

      // Filter out cities with valid names
      const validCities = citiesArray.filter((city) => {
        return city.city && city.city.trim() !== '' && city.city !== "Unknown City";
      });

      let filtered = validCities;

      // Apply search filter if search query exists
      if (searchQuery.trim() !== '') {
        filtered = validCities.filter((city) =>
          city.city?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Show only first 5 if showAll is false and no search query
      if (!showAll && searchQuery.trim() === '') {
        filtered = filtered.slice(0, 5);
      }

      setDisplayCities(filtered);
    }
  }, [donorList, searchQuery, showAll]);

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

  // Format number with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num || 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading cities...</div>
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
        <h1 className="text-2xl font-semibold text-gray-800">Donors & Cities</h1>
        
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by city..."
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
            {showAll ? 'Show Top 5' : 'Show All'}
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {searchQuery ? (
            `Showing ${displayCities.length} result(s) for "${searchQuery}"`
          ) : (
            `Showing ${displayCities.length} ${showAll ? 'of all' : 'of first 5'} cities`
          )}
        </p>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                NO
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                CITIES
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                DONORS
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                PERCENTAGE
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayCities.length > 0 ? (
              displayCities.map((cityData, index) => (
                <tr key={cityData.city} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {cityData.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatNumber(cityData.donorCount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="text-blue-500 mr-2">●</span>
                      <span className="font-medium text-gray-600 mr-3">
                        {cityData.percentage}%
                      </span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(cityData.percentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  {searchQuery ? 'No cities found matching your search.' : 'No donor data available.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cities;
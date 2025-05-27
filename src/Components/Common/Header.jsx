import React from 'react';
import { Users, UserPlus, Target, TrendingUp } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-emerald-400 w-full px-6 py-12">
      <div className="flex flex-wrap gap-6 max-w-7xl mx-auto">
        {/* Total Donors */}
        <div className="bg-white rounded-lg p-6 flex-1 min-w-64 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-2">
                TOTAL DONORS
              </p>
              <p className="text-xl font-bold text-gray-800 mb-2">50</p>
              <p className="text-gray-400 text-sm">Till Now</p>
            </div>
            <div className="bg-red-500 rounded-full p-3">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* New Donors */}
        <div className="bg-white rounded-lg p-6 flex-1 min-w-64 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-2">
                NEW DONORS
              </p>
              <p className="text-xl font-bold text-gray-800 mb-2">14</p>
              <p className="text-gray-400 text-sm">Since last week</p>
            </div>
            <div className="bg-orange-500 rounded-full p-3">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Total Donation Goal */}
        <div className="bg-white rounded-lg p-6 flex-1 min-w-64 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-1">
                TOTAL DONATION
              </p>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-2">
                GOAL
              </p>
              <p className="text-xl font-bold text-gray-800 mb-2">4,04,000 ₹</p>
            </div>
            <div className="bg-yellow-500 rounded-full p-3">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Total Donation Raised */}
        <div className="bg-white rounded-lg p-6 flex-1 min-w-64 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-1">
                TOTAL DONATION
              </p>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-2">
                RAISED
              </p>
              <p className="text-xl font-bold text-gray-800 mb-2">3,66,421 ₹</p>
            </div>
            <div className="bg-cyan-500 rounded-full p-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
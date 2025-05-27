// // src/Components/Userprofile/Account.jsx
// import React from "react";
// import { useSelector } from "react-redux";
// import {selectCurrentUser } from "../../Redux/authSlice";


// const Account = () => {
//  const user = useSelector(selectCurrentUser);
//   console.log(user);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-6">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Left Side - Form */}
//         <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold mb-4">My account</h2>
//           <div className="space-y-4">
//             {/* User Info */}
//             <div>
//               <h3 className="text-gray-600 text-sm mb-1">Full name</h3>
//               <div className="border p-2 rounded bg-gray-100">{user.name}</div>
//             </div>
//             <div>
//               <h3 className="text-gray-600 text-sm mb-1">Email address</h3>
//               <div className="border p-2 rounded bg-gray-100">{user.email}</div>
//             </div>
//             {/* Contact Info */}
//             <div>
//               <h3 className="text-gray-600 text-sm mb-1">Address</h3>
//               <div className="border p-2 rounded bg-gray-100">{user.address}</div>
//             </div>
//             <div className="flex gap-4">
//               <div className="w-1/2">
//                 <h3 className="text-gray-600 text-sm mb-1">City</h3>
//                 <div className="border p-2 rounded bg-gray-100">{user.city}</div>
//               </div>
//               <div className="w-1/2">
//                 <h3 className="text-gray-600 text-sm mb-1">Country</h3>
//                 <div className="border p-2 rounded bg-gray-100">{user.country}</div>
//               </div>
//             </div>
//             <div>
//               <h3 className="text-gray-600 text-sm mb-1">Postal code</h3>
//               <div className="border p-2 rounded bg-gray-100">{user.postalCode}</div>
//             </div>
//             {/* About Me */}
//             <div>
//               <h3 className="text-gray-600 text-sm mb-1">About Me</h3>
//               <textarea
//                 disabled
//                 className="border p-2 rounded w-full bg-gray-100"
//                 value={user.aboutMe}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Profile Card */}
//         <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
//           <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl mb-4">
//             <span>👤</span>
//           </div>
//           <h3 className="text-xl font-semibold">{user.name}</h3>
//           <p className="text-gray-500">{user.city}, {user.country}</p>
//           <p className="font-medium mt-2">{user.role} - Nasarna Trust</p>
//           <p className="text-center text-sm text-gray-600 mt-2">
//             Nasarna Children Trust is dedicated to uplifting the lives of underprivileged and helpless children.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Account;

// src/Components/Userprofile/Account.jsx
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logout } from "../../Redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  
  // Handle outside clicks to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    // Clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);
  
  console.log(user);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    // Close the dropdown menu
    setIsDropdownOpen(false);
    
    // Show confirmation toast
    toast.info(
      <div>
        <p className="mb-3">Are you sure you want to logout?</p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => {
              toast.dismiss();
              // Dispatch logout action
              dispatch(logout());
              toast.success("Logged out successfully!", { autoClose: 1500 });
              // Add a slight delay before redirecting to ensure the success toast is visible
              setTimeout(() => {
                navigate("/login");
              }, 1800);
            }}
            className="bg-blue-600 text-white cursor-pointer px-4 py-1 rounded hover:bg-blue-700"
          >
            Yes
          </button>
          <button 
            onClick={() => toast.dismiss()} 
            className="bg-gray-300 px-4 py-1 cursor-pointer rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  return (
    <div className="bg-white">
      {/* Toast Container */}
      <ToastContainer position="top-center" />
      
      {/* Layout Container */}
      <div className="flex min-h-screen">
        {/* Sidebar - Fixed width */}
        <div className="bg-blue-900 relative">
          <div className="p-1">
            {/* <div className="flex items-center mb-8">
              <img 
                src="/nasarna-logo.svg" 
                alt="Nasarna" 
                className="h-8 mr-2" 
              />
            </div> */}
            
            {/* <nav>
              <ul className="space-y-4 text-white">
                {[
                  { icon: '📊', label: 'Dashboard' },
                  { icon: '👥', label: 'Trustees' },
                  { icon: '💰', label: 'Donors' },
                  { icon: '💸', label: 'Donations' },
                  { icon: '🌍', label: 'Causes' },
                  { icon: '👤', label: 'User Profile', active: true }
                ].map((item) => (
                  <li 
                    key={item.label} 
                    className={`flex items-center p-2 rounded ${item.active ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </li>
                ))}
              </ul>
            </nav> */}
          </div>

          {/* Footer inside Sidebar */}
          {/* <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-white text-xs">
            © 2025 Nasarna . About Us
          </div> */}
        </div>

        {/* Main Content Area - Scrollable */}
        <div className="flex-1 bg-blue-900">
          {/* Top Header */}
          <div className="flex justify-end items-center p-6">
            <div className="relative" ref={dropdownRef}>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="text-white mr-3 text-sm">{user.name}</span>
                <div className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center font-semibold">
                  AT
                </div>
              </div>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    My Profile
                  </a>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L14.586 9H7a1 1 0 110-2h7.586l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Page Content - Now properly scrollable */}
          <div className="px-6 pb-6">
            <div className="bg-white rounded-lg shadow-xl">
              <div className="p-6">
                {/* My Account Title Inside Form */}
                <h2 className="text-xl font-semibold mb-6">My account</h2>
                
                <div className="grid grid-cols-3 gap-6">
                  {/* Left Column - Account Details */}
                  <div className="col-span-2 space-y-6">
                    {/* User Information */}
                    <div>
                      <h3 className="text-xs text-gray-500 mb-2 uppercase tracking-wider">USER INFORMATION</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Full name</label>
                          <input 
                            type="text" 
                            value={user.name} 
                            disabled 
                            className="w-full p-2 rounded bg-gray-100 text-gray-500 shadow-inner" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Email address</label>
                          <input 
                            type="email" 
                            value={user.email} 
                            disabled 
                            className="w-full p-2 rounded bg-gray-100 text-gray-500 shadow-inner" 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3 className="text-xs text-gray-500 mb-2 uppercase tracking-wider">CONTACT INFORMATION</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Address</label>
                          <input 
                            type="text" 
                            value={user.address} 
                            disabled 
                            className="w-full p-2 rounded bg-gray-100 text-gray-500 shadow-inner" 
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">City</label>
                            <input 
                              type="text" 
                              value={user.city} 
                              disabled 
                              className="w-full p-2 rounded bg-gray-100 text-gray-500 shadow-inner" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Country</label>
                            <input 
                              type="text" 
                              value={user.country} 
                              disabled 
                              className="w-full p-2 rounded bg-gray-100 text-gray-500 shadow-inner" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Postal code</label>
                            <input 
                              type="text" 
                              value={user.postalCode} 
                              disabled 
                              className="w-full p-2 rounded bg-gray-100 text-gray-500 shadow-inner" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* About Me */}
                    <div>
                      <h3 className="text-xs text-gray-500 mb-2 uppercase tracking-wider">ABOUT ME</h3>
                      <textarea
                        disabled
                        className="w-full p-2 rounded bg-gray-100 text-gray-500 shadow-inner"
                        rows="4"
                        value={user.aboutMe}
                      />
                    </div>

                    {/* Add more content to demonstrate scrolling */}
                    {/* <div>
                      <h3 className="text-xs text-gray-500 mb-2 uppercase tracking-wider">ADDITIONAL INFORMATION</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
                          <input 
                            type="text" 
                            value={user.phone || "Not provided"} 
                            disabled 
                            className="w-full p-2 rounded bg-gray-100 text-gray-500 shadow-inner" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Date of Birth</label>
                          <input 
                            type="text" 
                            value={user.dateOfBirth || "Not provided"} 
                            disabled 
                            className="w-full p-2 rounded bg-gray-100 text-gray-500 shadow-inner" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Emergency Contact</label>
                          <input 
                            type="text" 
                            value={user.emergencyContact || "Not provided"} 
                            disabled 
                            className="w-full p-2 rounded bg-gray-100 text-gray-500 shadow-inner" 
                          />
                        </div>
                      </div>
                    </div> */}
                  </div>

                  {/* Right Column - Profile Card */}
                  <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center">
                    <div className="w-32 h-32 bg-blue-900 rounded-full flex items-center justify-center text-white mb-4">
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
                    <p className="text-gray-500 text-sm mb-1">{user.city} - {user.country}</p>
                    <p className="text-gray-600 text-lg text-center mt-2">
                      Nasarna Children Trust is dedicated to uplifting the lives of underprivileged and helpless children.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
// import React, { useState } from 'react';

// export default function ModalForm() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [formData, setFormData] = useState({ name: '', email: '' });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Submitted:', formData);
//     setIsOpen(false); // Close modal after submit
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       {/* Open Modal Button */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Open Modal
//       </button>

//       {/* Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
//             <h2 className="text-xl font-semibold mb-4">Contact Form</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded"
//                   required
//                 />
//               </div>

//               <div className="flex justify-end space-x-2">
//                 <button
//                   type="button"
//                   onClick={() => setIsOpen(false)}
//                   className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTrustee, fetchTrustees } from '../../Redux/trusteeSlice';

export default function ModalForm({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.trustees);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  // Reset form data when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(createTrustee(formData)).unwrap(); // triggers API call
      await dispatch(fetchTrustees()); // refresh list after creation
      onClose(); // close modal if successful
    } catch (err) {
      console.error("Failed to create trustee:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-100 bg-opacity-0.5 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-200 max-w-md relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700 text-xl"
          aria-label="Close"
        >
          ×
        </button>

        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-6">Create New Trustee</h2>

          <div className="space-y-4">
            {['name', 'email', 'phone', 'address', 'city', 'pincode'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">{field}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            {error && (
              <div className="text-red-500 text-sm">
                Error: {error}
              </div>
            )}

            <div className="flex justify-start mt-6">
              <button
                onClick={handleSubmit}
                className={`bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-medium px-6 py-2 rounded ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Trustee"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



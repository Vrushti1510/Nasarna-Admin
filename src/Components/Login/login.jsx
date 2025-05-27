// src/Components/Login/login.jsx

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 
import logo from "../../assets/logo"; 

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // NEW STATE

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser(formData));

      if (loginUser.fulfilled.match(resultAction)) {
    const { user, token } = resultAction.payload;

    // Save user and token into localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    toast.success("Login Successful!", { position: "top-right" });
    setTimeout(() => {
      navigate("/dashboard");
    }, 1600);
}else {
        toast.error("Login Failed. Please check your credentials.", { position: "top-right" });
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      toast.error("Something went wrong. Try again later.", { position: "top-right" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-teal-500 to-blue-900">
      <ToastContainer />

      {/* Header with Logo and Website Link */}
      <div className="absolute top-6 w-full flex justify-between items-center px-6">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Nasarna Logo" className="w-35 h-10 cursor-pointer" />
        </div>
        <Link to="/website" className="text-white hover:text-blue-900 flex items-center">
          <span className="mr-2">Go to Website</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </div>

      {/* Welcome Text */}
      <div className="text-center text-white mb-10">
        <h1 className="text-4xl font-bold mb-2">Welcome!</h1>
        <p className="text-2xl">To Nasarna Children Trust</p>
      </div>

      {/* Login Form */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-gray-500 text-center mb-6">Sign in with credentials</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-100 border rounded-md px-10 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"} // Change here
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-100 border rounded-md px-10 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="focus:outline-none"
              >
                {showPassword ? (
                  // Eye Open Icon (visible)
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  // Eye Closed Icon (hidden)
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.957 9.957 0 012.517-4.104m3.768-2.258A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.953 9.953 0 01-4.043 5.197M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold cursor-pointer py-3 rounded-md transition duration-300"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 w-full flex justify-between items-center px-6">
        <div className="text-gray-300 text-sm">
          © 2025 <span className="text-blue-300">Nasarna</span>
        </div>
        <div className="text-gray-300 text-sm flex ml-310">
          <Link to="/about" className="hover:text-white">Nasarna</Link>
        </div>
        <div className="text-gray-300 text-sm flex">
          <Link to="/about" className="hover:text-white">About Us</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

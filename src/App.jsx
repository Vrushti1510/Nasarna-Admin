// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./Pages/Login";
// import Dashboard from "./Pages/Dashboard";

// // Dummy Pages
// // const Dashboard = () => <h1 className="text-3xl">Dashboard Page (Protected)</h1>;

// const App = () => {
//   // You can add authentication logic here later
//   const isAuthenticated = localStorage.getItem("token") ? true : false;

//   return (
//     <Router>
//       <Routes>
//         {/* Redirect root path to login or dashboard based on authentication */}
//         {/* <Route 
//           path="/" 
//           element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
//         /> */}
        
//         {/* Login route */}
//         <Route path="/login" element={<LoginPage />} />
        
//         {/* Protected route */}
//         <Route 
//           path="/dashboard" 
//           element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
//         />
        
//         {/* Catch all route - redirect to login or dashboard */}
//         <Route 
//           path="*" 
//           element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Dashboard/Layout";
import LoginPage from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Trustees from "./Pages/Trustees";
import Donors from "./Pages/Donors";
import Donations from "./Pages/Donations";
import Causes from "./Pages/Causes";
import Userprofile from "./Pages/Userprofile";


// Placeholder components for routes
// const Trustees = () => <div>Trustees Page</div>;
// const Donors = () => <div>Donors Page</div>;
// const Donations = () => <div>Donations Page</div>;
// const Causes = () => <div>Causes Page</div>;
// const Userprofile = () => <div>User profile page</div>;

const App = () => {
  const isAuthenticated = localStorage.getItem("token") ? true : false;

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
        />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected routes - wrapped in Layout component */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Layout><Dashboard /></Layout> : <Navigate to="/login" />}
        />
        <Route
          path="/trustees"
          element={isAuthenticated ? <Layout><Trustees /></Layout> : <Navigate to="/login" />}
        />
        <Route
          path="/donors"
          element={isAuthenticated ? <Layout><Donors /></Layout> : <Navigate to="/login" />}
        />
        <Route
          path="/donations"
          element={isAuthenticated ? <Layout><Donations /></Layout> : <Navigate to="/login" />}
        />
        <Route
          path="/causes"
          element={isAuthenticated ? <Layout><Causes /></Layout> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Layout><Userprofile /></Layout> : <Navigate to="/login" />}
        />
        
        {/* Catch all route */}
        <Route 
          path="*" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
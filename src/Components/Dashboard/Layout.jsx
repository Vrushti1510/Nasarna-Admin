import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 ml-64">
        <div className="px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
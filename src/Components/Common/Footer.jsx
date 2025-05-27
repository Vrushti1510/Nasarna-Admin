import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-4 px-6">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left side - Copyright */}
        <div className="text-gray-500 text-md">
          © 2025 
          <a 
            href="/" 
            className="ml-1 text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
          >
            Nasarna
          </a>
        </div>
        
        {/* Right side - Navigation Links */}
        <div className="flex space-x-8">
          <a 
            href="/nasarna" 
            className="text-gray-500 hover:text-gray-600 transition-colors duration-200 hover:underline text-md"
          >
            Nasarna
          </a>
          <a 
            href="/about" 
            className="text-gray-500 hover:text-gray-600 transition-colors duration-200 hover:underline text-md"
          >
            About Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
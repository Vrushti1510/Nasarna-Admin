import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  HeartHandshake, 
  DollarSign, 
  Bookmark, 
  UserCircle 
} from 'lucide-react';
import dashLogo from '../../assets/dashlogo.png';

const Navbar = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  // Navigation items with icons and paths
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Trustees', icon: <Users size={20} />, path: '/trustees' },
    { name: 'Donors', icon: <HeartHandshake size={20} />, path: '/donors' },
    { name: 'Donations', icon: <DollarSign size={20} />, path: '/donations' },
    { name: 'Causes', icon: <Bookmark size={20} />, path: '/causes' },
    { name: 'User Profile', icon: <UserCircle size={20} />, path: '/profile' },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm z-50">
      <div className="p-6 border-b border-gray-100">
        <img src={dashLogo} alt="Nasarna Logo" className="h-10" />
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${
                  activePath === item.path 
                    ? 'text-black font-medium' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className={`${activePath === item.path ? 'text-emerald-500' : 'text-gray-400'}`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
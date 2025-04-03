
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, LogOut, Menu, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import logo1 from "@/components/data/logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const navItems = [
    { path: '/dashboard', label: 'Home' },
    { path: '/secondary-market', label: 'Secondary Market' },
    { path: '/transactions', label: 'Transactions' },
    { path: '/underlying', label: 'Underlying' },
    // { path: '/profile', label: 'My Profile' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 shadow-sm">
      <div className="max-w-[2000px] mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/dashboard" className="flex items-center">
                <div className="h-8 w-8 rounded-md flex items-center justify-center mr-2">
                  <img src={logo1} alt="Logo" className="h-8 w-8 rounded-md" />
                </div>
                <span onClick={()=>navigate('/')} className="font-bold text-xl text-quant-navy ">2CENTS CAPITAL</span>
              </Link>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:ml-6 md:flex md:space-x-2">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 mt-2 py-2 rounded-md text-sm font-medium items-center ${
                    location.pathname === item.path
                      ? 'bg-quant-cream text-quant-navy'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Right side menu items */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="text-gray-600">
                <User size={20} />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="text-gray-600" onClick={handleLogout}>
              <LogOut size={20} />
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'bg-quant-cream text-quant-navy'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-quant-yellow flex items-center justify-center">
                    <User size={20} className="text-quant-navy" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.name || 'User'}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email || 'user@example.com'}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

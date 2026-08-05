import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineLink, HiOutlineLogout } from 'react-icons/hi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 glass-card rounded-none border-t-0 border-x-0 border-b border-dark-700/50 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <HiOutlineLink className="text-3xl text-primary-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            LinkLens
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-dark-300 font-medium hidden sm:block">
            Welcome, {user?.name}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-dark-300 hover:text-primary-400 transition-colors duration-300"
          >
            <HiOutlineLogout className="text-xl" />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

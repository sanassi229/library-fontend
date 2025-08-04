import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import RegisterDropdown from './RegisterDropdown';


import { Search, BookUser, ShoppingBag, User, ChevronDown, Menu } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin, isLibrarian } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
  };

  const closeMenus = () => {
    setIsOpen(false);
    setShowUserMenu(false);
  };

  const isActive = (path) => location.pathname === path;

  const getRoleText = (role) => {
    switch (role) {
      case "admin":
        return "👑 Admin";
      case "librarian":
        return "📖 Thủ thư";
      default:
        return "👤 Thành viên";
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b-2 border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        
        {!isAuthenticated && (
          <div className="flex justify-center items-center py-4 relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
<img src="/ic_logo.svg" alt="Logo" className="w-16 h-16" />
            </div>
            <img src="/img_title.svg" alt="Title" className="h-16" />
          </div>
        )}

        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center space-x-8">
            {isAuthenticated && (
              <img src="/ic_logo.svg" alt="Logo" className="w-16 h-16" />
            )}
            <div className="hidden md:flex md:space-x-8">
              <Link to="/" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  isActive("/") ? "border-primary-500 text-primary-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`} onClick={closeMenus}>Home</Link>
              <Link to="/browse" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  isActive("/browse") ? "border-primary-500 text-primary-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`} onClick={closeMenus}>Browse</Link>
              <Link to="/contact-us" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  isActive("/contact-us") ? "border-primary-500 text-primary-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`} onClick={closeMenus}>Contact Us</Link>
              {(isAdmin || isLibrarian) && (
                <Link to="/admin" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      location.pathname.startsWith("/admin") ? "border-primary-500 text-primary-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`} onClick={closeMenus}>⚙️ Quản trị</Link>
              )}
              <Link to="/collections" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${isActive("/collections") ? "border-primary-500 text-primary-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}`} onClick={closeMenus}>Collection</Link>
            </div>
          </div>
          
        

          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to="/bookshelf" className="text-gray-400 hover:text-gray-600 p-2 relative">
                  <BookUser className="h-6 w-6" />
                </Link>
                <Link to="/cart" className="text-gray-400 hover:text-gray-600 p-2 relative">
                  <ShoppingBag className="h-6 w-6" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                </Link>
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none"
                  >
                    <User className="h-6 w-6" />
                    <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <div className="px-4 py-2">
                          <div className="text-base font-medium text-gray-800">{user?.name}</div>
                          <div className="text-sm text-gray-500">{user?.email}</div>
                        </div>
                        <div className="mt-1 space-y-1">
                          <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50" onClick={closeMenus}>Hồ sơ cá nhân</Link>
                        
                          <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Đăng xuất</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-primary-600 font-medium hover:underline">Đăng nhập</Link>
                <RegisterDropdown />
              </div>
            )}
          </div>
          
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50" onClick={closeMenus}>Home</Link>
          <Link to="/browse" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50" onClick={closeMenus}>Browse</Link>
          <Link to="/contact-us" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50" onClick={closeMenus}>Contact Us</Link>
          {(isAdmin || isLibrarian) && (
            <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50" onClick={closeMenus}>⚙️ Quản trị</Link>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {isAuthenticated ? (
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <User className="h-10 w-10 text-gray-400" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.name}</div>
                <div className="text-sm text-gray-500">{user?.email}</div>
              </div>
            </div>
          ) : (
            <div className="space-y-1 px-3">
              <Link to="/login" className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50" onClick={closeMenus}>🔐 Đăng nhập</Link>
              <Link to="/register" className="block w-full text-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700" onClick={closeMenus}>📝 Đăng ký</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

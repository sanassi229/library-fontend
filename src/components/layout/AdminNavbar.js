import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, Search, User, ChevronDown, Menu } from 'lucide-react';

const AdminNavbar = () => {
  const { user, logout, isAuthenticated, isAdmin, isLibrarian } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/login");
  };

  const closeMenus = () => {
    setShowUserMenu(false);
  };

  const isActive = (path) => location.pathname === path;

  const baseClasses =
    "text-sm font-medium px-4 py-2 rounded transition-colors duration-200";
  const activeClasses = "text-white bg-green-600";
  const inactiveClasses = "text-gray-600 hover:text-black";

  return (
    <nav className="bg-white border-b shadow px-8 py-4 flex items-center justify-between">
      {/* Bên trái: Logo + Links */}
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <Link to="/">
          <img
            src="/ic_logo.svg"
            alt="Admin Logo"
            className="h-14 w-auto object-contain cursor-pointer"
          />
        </Link>
        {/* Các link menu - Chỉ hiển thị cho admin hoặc thủ thư */}
        {(isAdmin || isLibrarian) && (
          <>
            <Link
              to="/admin/authors"
              className={`${baseClasses} ${
                isActive("/admin/authors") ? activeClasses : inactiveClasses
              }`}
            >
              Authors
            </Link>
            <Link
              to="/admin/books"
              className={`${baseClasses} ${
                isActive("/admin/books") ? activeClasses : inactiveClasses
              }`}
            >
              Books
            </Link>
            <Link
              to="/admin/collections"
              className={`${baseClasses} ${
                isActive("/admin/collections") ? activeClasses : inactiveClasses
              }`}
            >
              Collection
            </Link>
            <Link
              to="/admin/tags"
              className={`${baseClasses} ${
                isActive("/admin/tags") ? activeClasses : inactiveClasses
              }`}
            >
              Tags
            </Link>
          </>
        )}
      </div>

      {/* Bên phải: Search + User info + Bell */}
      <div className="flex items-center space-x-6">
        {/* Tìm kiếm */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search className="w-4 h-4" />
          </span>
        </div>

        {isAuthenticated && (isAdmin || isLibrarian) ? (
          <>
            {/* Nút chuông */}
            <button className="p-2 bg-gray-100 rounded-full relative hover:bg-gray-200">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </button>
            
            {/* Thông tin người dùng (Dropdown) */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none"
              >
                <div className="flex items-center space-x-2">
                  <User className="h-6 w-6" />
                  <span className="text-sm font-medium">{user?.name || "Admin"}</span>
                  <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                </div>
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <div className="px-4 py-2">
                      <div className="text-base font-medium text-gray-800">{user?.name}</div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                    <div className="mt-1 space-y-1">
                      <Link to="/admin/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50" onClick={closeMenus}>Hồ sơ cá nhân</Link>
                      <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Đăng xuất</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/login" className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
            Đăng nhập
          </Link>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
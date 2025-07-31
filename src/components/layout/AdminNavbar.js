import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, UserCircle } from 'lucide-react'; // Dùng icon từ lucide-react

const AdminNavbar = () => {
  const location = useLocation();

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
        <img
          src="/ic_logo.svg"
          alt="Admin Logo"
          className="h-14 w-auto object-contain"
        />

        {/* Các link menu */}
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
            <img
              src="/magnify_search.svg"
              alt="Search Icon"
              className="w-4 h-4"
            />
          </span>
        </div>

        {/* Thông tin người dùng */}
        <Link
        to="/admin/profile"
        className="flex items-center space-x-2 hover:bg-gray-100 p-1 rounded-md transition duration-150">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gray-100 rounded-full">
            <UserCircle className="h-6 w-6 text-gray-600" />
          </div>
          <div className="flex flex-col leading-tight text-sm">
            <span className="font-medium">Tên Admin</span>
            <span className="text-xs text-gray-500">Admin</span>
          </div>
        </div>
        </Link>
        
        {/* Nút chuông */}
        <button className="p-2 bg-gray-100 rounded-full relative hover:bg-gray-200">
          <Bell className="h-6 w-6 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;

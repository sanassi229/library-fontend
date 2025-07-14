import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import RegisterDropdown from './RegisterDropdown';

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

  return (
<nav className="bg-white shadow-lg border-b border-black w-full relative z-50">
      {}
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row items-center relative">
          <img src="ic_logo.svg" className="z-10" />
          <img
            src="img_title.svg"
            className="absolute left-1/2 transform -translate-x-1/2"
          />
        </div>

        <div className="flex justify-between h-16 px-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center"></div>

            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
                onClick={closeMenus}
              >
                Home
              </Link>

              <Link
                to="/browse"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  isActive("/browse")
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
                onClick={closeMenus}
              >
                Browse
              </Link>

              <Link
                to="/collections"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  isActive("/collections")
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
                onClick={closeMenus}
              >
                Contact Us
              </Link>

              {(isAdmin || isLibrarian) && (
                <Link
                  to="/admin"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    location.pathname.startsWith("/admin")
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                  onClick={closeMenus}
                >
                  ⚙️ Quản trị
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <div className="flex items-center space-x-4">
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <span className="text-xl">🔔</span>
                  </button>

                  <div className="flex items-center space-x-3">
                    <div className="text-right hidden lg:block">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.role === "admin"
                          ? "👑 Admin"
                          : user?.role === "librarian"
                          ? "📖 Thủ thư"
                          : "👤 Thành viên"}
                      </p>
                    </div>

                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 focus:outline-none"
                    >
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium">
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <span className="text-gray-400">▼</span>
                    </button>
                  </div>
                </div>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeMenus}
                    >
                      👤 Hồ sơ cá nhân
                    </Link>

                    {user?.cardId && (
                      <Link
                        to="/borrow-history"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeMenus}
                      >
                        📋 Lịch sử mượn
                      </Link>
                    )}

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      🚪 Đăng xuất
                    </button>
                  </div>
                )}
              </div>
         ) : (
  <div className="flex items-center space-x-4">
    <Link
      to="/login"
      className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
      onClick={closeMenus}
    >
      Đăng nhập
    </Link>
    <RegisterDropdown /> 
  </div>
)}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/")
                  ? "bg-primary-50 border-primary-500 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={closeMenus}
            >
              🏠 Trang chủ
            </Link>

            <Link
              to="/browse"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/browse")
                  ? "bg-primary-50 border-primary-500 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={closeMenus}
            >
              📚 Duyệt sách
            </Link>

            <Link
              to="/collections"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/collections")
                  ? "bg-primary-50 border-primary-500 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={closeMenus}
            >
              📁 Bộ sưu tập
            </Link>

            {(isAdmin || isLibrarian) && (
              <Link
                to="/admin"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname.startsWith("/admin")
                    ? "bg-primary-50 border-primary-500 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={closeMenus}
              >
                ⚙️ Quản trị
              </Link>
            )}
          </div>

          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="space-y-1">
                <div className="flex items-center px-5">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user?.name}
                    </div>
                    <div className="text-sm text-gray-500">{user?.email}</div>
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    onClick={closeMenus}
                  >
                    👤 Hồ sơ cá nhân
                  </Link>

                  {user?.cardId && (
                    <Link
                      to="/borrow-history"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      onClick={closeMenus}
                    >
                      📋 Lịch sử mượn
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-900 hover:bg-red-50"
                  >
                    🚪 Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-1 px-3">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                  onClick={closeMenus}
                >
                  🔐 Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md font-medium"
                  onClick={closeMenus}
                >
                  📝 Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

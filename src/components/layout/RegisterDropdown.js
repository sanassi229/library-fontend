import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

    const handleRegisterClick = () => {
    navigate("/register");
    setIsOpen(false);
  };

  const handleCardRegisterClick = () => {
    navigate("/card-register");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          isOpen
            ? "bg-[#FBAF97] text-black"
            : "bg-[#FE7F57] hover:bg-[#e76b45] text-white"
        }`}
      >
        <span>Đăng ký</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
          <div className="py-2">
            <button
              onClick={() => {
                handleCardRegisterClick()
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-xs text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center space-x-2"
            >
              <span>Thẻ thư viện</span>
            </button>
            <button
              onClick={() => {
                handleRegisterClick()
                console.log("Navigate to account registration");
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-xs text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center space-x-2"
            >
              <span>Tài khoản</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterDropdown;
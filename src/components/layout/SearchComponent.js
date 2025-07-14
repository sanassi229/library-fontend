import React, { useState } from "react";

const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="relative">
        <div className="flex items-center bg-white border-2 border-black rounded-2xl px-4 py-3 shadow-sm">
          <div className="flex-shrink-0 mr-3">
            <svg 
              className="w-6 h-6 text-black" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 text-lg font-medium focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
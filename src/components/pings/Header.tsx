"use client";

import React, { useState, useEffect } from "react";
import { Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Date from '../date/date'

interface HeaderProps {
  propValue: string;
}
export default function Header({propValue}: HeaderProps) {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  return (
    <header className="mx-4 my-2 rounded-lg bg-white shadow-sm">
      <div className="h-20 px-4 flex items-center justify-between">
        {/* Left side - Dashboard text */}
        <div>
          <a href="#" className="text-[#5D56BD] text-medium">
            {propValue}
          </a>
        </div>

        <Date/>
        {/* Right side with search, datetime and profile */}
        {/* <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search"
            className="w-81 h-9 px-8 py-1 text-sm bg-gray-100 rounded-full"
          />
          <span className="text-sm text-gray-600">{currentTime}</span>
          
  
          <div className="relative">
            <div className="flex items-center bg-[#F4F3FF] rounded-full pr-2 cursor-pointer" onClick={toggleDropdown}>
    
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="https://www.creativefabrica.com/wp-content/uploads/2023/02/09/Flat-People-Icon-Graphics-60534092-1.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180 text-[#5D56BD]' : 'text-gray-600'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

      
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                <button 
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={() => console.log('Settings clicked')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Setting
                </button>
                <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </button>
              </div>
            )}
          </div>
        </div> */}
      </div>
    </header>
  );
}
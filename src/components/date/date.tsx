'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { Settings, LogOut } from "lucide-react";
import { useRouter } from 'next/navigation';
import logout from '../../../public/assets/Logout Icon.png'
import { Search } from 'lucide-react';
import Image from 'next/image';
function date() {
  const [currentTime, setCurrentTime] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter()
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        day: "numeric",
        month: "short",
      };

      const datePart = new Intl.DateTimeFormat("en-GB", options)
        .format(now)
        .replace(",", "");

      const timePart = now.toLocaleTimeString("en-GB", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });

      setCurrentTime(`${datePart}, ${timePart}`); // Adds a comma before time
    }, 1000);

    return () => clearInterval(interval);
  }, []);




  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  const handleLogout = () => {
    // Clear token or any authentication data
    localStorage.removeItem("token");

    // Redirect to login page
    router.push("/auth/login");
  };

  const handleClick = () => {
    router.push('/main/settings')
  }
  return (
    <div className="h-8  flex items-center justify-between">
      {/* Right side with search, datetime and profile */}
      <div className="flex items-center gap-4">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-[#808080]" />
          <input
            type="text"
            placeholder="Search"
            className="w-50 pl-9 pr-3 py-1 text-sm bg-gray-100 rounded-full focus:outline-none w-[270px]"
          />
        </div>

        <span className="text-sm text-gray-600">{currentTime}</span>

        {/* Profile dropdown container */}
        <div className="relative">
          <div className="flex items-center bg-[#F4F3FF] rounded-3xl cursor-pointer" onClick={toggleDropdown}>
            {/* Profile image container */}
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src="https://www.creativefabrica.com/wp-content/uploads/2023/02/09/Flat-People-Icon-Graphics-60534092-1.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Dropdown arrow */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4  transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#5D56BD]' : 'text-gray-600'
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Dropdown menu */}
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-300 py-1 z-[100]">

              <button
                className="w-full px-4 py-2 text-sm hover:bg-gray-100 flex items-center text-[#4D4D4D]"
                onClick={handleClick}
              >
                <Settings className="w-4 h-4 mr-2 text-[#999999]" />
                Setting
              </button>

              {/* Proper Horizontal Line */}
              <hr className="w-full border-gray-300 my-1" />

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center text-sm text-[#4D4D4D]"
              >
                <Image src={logout} alt="logout" width={20} height={20} className="w-4 h-4 mr-4" />
                Logout
              </button>
            </div>

          )}
        </div>
      </div>
    </div>
  )
}

export default date
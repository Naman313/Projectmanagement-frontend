'use client'

import React, { useState, useEffect } from 'react';
import MyProjectdashboard from './MyProjectdashboard/MyProjectdashboard';
import Archive from './Archive/Archive';
import Trash from './Trash/Trash';
import Date from '../../../components/date/date';

export default function Page() {
  // Use null as initial state to indicate it hasn't been initialized yet
  const [isActiveProjects, setActiveProjects] = useState(true);
  const [isActiveArchive, setArchive] = useState(false);
  const [isActiveTrash, setTrash] = useState(false);
  // Track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);
  
  // Initialize state from localStorage only after component is mounted
  useEffect(() => {
    setIsMounted(true);
    
    // Try to load state from localStorage
    try {
      const savedTab = localStorage.getItem('activeProjectTab');
      if (savedTab) {
        if (savedTab === 'AllProjects') {
          setActiveProjects(true);
          setArchive(false);
          setTrash(false);
        } else if (savedTab === 'Archive') {
          setActiveProjects(false);
          setArchive(true);
          setTrash(false);
        } else if (savedTab === 'Trash') {
          setActiveProjects(false);
          setArchive(false);
          setTrash(true);
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;
    
    // Save to localStorage
    try {
      localStorage.setItem('activeProjectTab', id);
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
    
    if (id === "Trash") {
      setActiveProjects(false);
      setArchive(false);
      setTrash(true);
    } else if (id === "AllProjects") {
      setActiveProjects(true);
      setArchive(false);
      setTrash(false);
    } else if (id === "Archive") {
      setActiveProjects(false);
      setArchive(true);
      setTrash(false);
    }
  }

  // If not mounted yet, you can render a loading state or minimal UI
  // to prevent hydration errors
  if (!isMounted) {
    return (
      <div className='pt-4 font-sans pl-2'>
        <header className="mx-5 px-6 rounded-lg bg-white shadow-sm h-[108px]">
          <div className="h-16 flex items-center justify-between">
            <div>
              <h1 className="text-[#5D56BD] text-md font-medium">
                My Projects
              </h1>
            </div>
            <Date />
          </div>
          <div className="flex pt-[14px] text-xs gap-1">
            <div className="text-gray-500 hover:cursor-pointer">
              <div className='mx-1 px-1 py-[7px] text-[13.5px]'>
                All Projects
              </div>
            </div>
            <div className="text-gray-500 hover:cursor-pointer">
              <div className='mx-1 px-1 py-[5px] text-[13.5px]'>
                Archive
              </div>
            </div>
            <div className="text-gray-500 hover:cursor-pointer">
              <div className='mx-1 px-1 py-[5px] text-[13.5px]'>
                Trash
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }

  return (
    <>
      <div className='pt-4 font-sans pl-2'>
        <header className="mx-5 px-6 rounded-lg bg-white shadow-sm h-[108px]">
          <div className="h-16 flex items-center justify-between">
            {/* Left side - My Projects text */}
            <div>
              <h1 className="text-[#5D56BD] text-md font-medium">
                My Projects
              </h1>
            </div>

            <Date />
          </div>

          {/* Bottom section with tabs */}
          <div className="flex pt-[14px] text-xs gap-1">
            <div 
              className={`${isActiveProjects ? "text-[#5D56BD] border-b-2 bg-[#5D56bd] bg-opacity-5 border-[#5d56bd]" : "text-gray-500 hover:text-gray-700 rounded-lg"} hover:cursor-pointer`}
              id="AllProjects"
              onClick={handleClick}
            >
              <div className='mx-1 px-1 py-[7px] text-[13.5px]'>
                All Projects
              </div>
            </div>
            <div
              className={`${isActiveArchive ? "text-[#5D56BD] border-b-2 bg-[#5D56bd] bg-opacity-5 border-[#5d56bd]" : "text-gray-500 hover:text-gray-700"} hover:cursor-pointer`}
              onClick={handleClick}
              id="Archive"
            >
              <div className='mx-1 px-1 py-[5px] text-[13.5px]'>
                Archive
              </div>
            </div>
            <div 
              className={`${isActiveTrash ? "text-[#5D56BD] border-b-2 bg-[#5D56bd] bg-opacity-5 border-[#5d56bd]" : "text-gray-500 hover:text-gray-700"} hover:cursor-pointer`} 
              onClick={handleClick} 
              id="Trash"
            >
              <div className='mx-1 px-1 py-[5px] text-[13.5px]'>
                Trash
              </div>
            </div>
          </div>
        </header>
      </div>
      {isActiveProjects && <MyProjectdashboard />}
      {isActiveArchive && <Archive />}
      {isActiveTrash && <Trash />}
    </>
  );
}
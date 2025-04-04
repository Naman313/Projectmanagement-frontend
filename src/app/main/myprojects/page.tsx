'use client'

import React, { useState } from 'react';
import MyProjectdashboard from './MyProjectdashboard/MyProjectdashboard';
import Archive from './Archive/Archive';
import Trash from './Trash/Trash';
import Date from '../../../components/date/date'
export default function page() {
  
  const [isActiveProjects, setActiveProjects]= useState(true);
  const [isActiveArchive, setArchive]= useState(false);
  const [isActiveTrash, setTrash]= useState(false);

  const handleClick= (e: React.MouseEvent<HTMLInputElement>)=>{
    if(e.currentTarget.id==="Trash"){
      setActiveProjects(false);
      setArchive(false);
      setTrash(true);
    }if(e.currentTarget.id==="AllProjects"){
      setActiveProjects(true);
      setArchive(false);
      setTrash(false);
    }if(e.currentTarget.id==="Archive"){
      setActiveProjects(false);
      setArchive(true);
      setTrash(false);
    }
  }
  return (
    <>
    <div className='pt-4 font-sans pl-2'>
    <header className="mx-5 px-6 rounded-lg bg-white shadow-sm h-[108px]">
      {/* <div className="px-4">
        {/* Top section with search and profile */}
        <div className="h-16 flex items-center justify-between">
          {/* Left side - My Projects text */}
          <div>
            <h1 className="text-[#5D56BD] text-md font-medium">
              My Projects
            </h1>
          </div>

          <Date/>
        </div>

        {/* Bottom section with tabs */}
        <div className="flex pt-[14px] text-xs gap-1">
          <div 
            className={`${isActiveProjects? "text-[#5D56BD] border-b-2 bg-[#5D56bd] bg-opacity-5 border-[#5d56bd]":"text-gray-500 hover:text-gray-700 rounded-lg" } hover:cursor-pointer`}
            id="AllProjects"
            onClick={handleClick}
          >
            <div className='mx-1 px-1 py-[7px] text-[13.5px]'>
            All Projects
            </div>
          </div>
          <div
            className= {`${isActiveArchive? "text-[#5D56BD] border-b-2 bg-[#5D56bd] bg-opacity-5 border-[#5d56bd]":"text-gray-500 hover:text-gray-700" } hover:cursor-pointer`}
            onClick={handleClick}
            id="Archive"
          ><div className='mx-1 px-1 py-[5px] text-[13.5px]'>
          Archive
          </div>
          </div>
          <div 
            className={`${isActiveTrash? "text-[#5D56BD] border-b-2 bg-[#5D56bd] bg-opacity-5 border-[#5d56bd]":"text-gray-500 hover:text-gray-700" } hover:cursor-pointer `} onClick={handleClick} id="Trash">
            <div className='mx-1 px-1 py-[5px] text-[13.5px]'>
            Trash
            </div>
          </div>
        </div>
      
    </header>
    </div>
    {isActiveProjects && <MyProjectdashboard/>}
    {isActiveArchive && <Archive/>}
    {isActiveTrash && <Trash/>}
    </>
  );
}
'use client'

import A_Z from '@/components/myProjects/A-Z';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Pinned from '@/components/myProjects/Pinned';
import Admin_Access from '@/components/myProjects/Admin Access';
import WithClients from '@/components/myProjects/WithClients';
import Private from '@/components/myProjects/Private';
import search from'lucide-react'
import { Search, ChevronRight } from 'lucide-react';
export default function MyProjectdashboard() {
  const [showAZ, setShowAZ] = useState(true); 
  const [showpinned, setShowpinned] = useState(false); 
  const [showwithClients, setwithClients] = useState(false); 
  const [showadminAccess, setadminAccess] = useState(false); 
  const [showPrivate, setPrivate] = useState(false); 
  
  const [query, setQuery]= useState<string>("")
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.id === 'A_Z') {
      setShowAZ(true);
      setShowpinned(false);
      setadminAccess(false);
      setPrivate(false);
      setwithClients(false);
      console.log('A-Z button clicked!');
    }
    if(e.currentTarget.id==='Pinned'){
      setShowAZ(false);
      setShowpinned(true);
      setadminAccess(false);
      setPrivate(false);
      setwithClients(false);
    }
    if(e.currentTarget.id==='WithClients'){
      setShowAZ(false);
      setShowpinned(false);
      setadminAccess(false);
      setPrivate(false);
      setwithClients(true);
    }
    if(e.currentTarget.id==="AdminAccess"){
      setShowAZ(false);
      setShowpinned(false);
      setadminAccess(true);
      setPrivate(false);
      setwithClients(false);
    }
    if(e.currentTarget.id==="Private"){
      setShowAZ(false);
      setShowpinned(false);
      setadminAccess(false);
      setPrivate(true);
      setwithClients(false);
    }

  };
  return (
    <>
    {/* {console.log("dashboard rendered")} */}
    <div className="min-h-screen bg-[#F8F7FA] font-sans pb-7 rounded-md pl-2" >
        
      <div className=" pt-3 px-6">
        {/* Breadcrumb navigation */}
        <nav className="flex items-center space-x-[0.5px] mb-6 text-[#808080] text-[13.5px]">
          <Link href="/main/dashboard">
            <span className="cursor-pointer">Dashboard</span>
          </Link>
          <span className="text-[#808080]"><ChevronRight width={20} height={20} strokeWidth={1.5}/></span>
          <Link href="/projects">
            <span className="cursor-pointer">My Projects</span>
          </Link>
          <span className="text-[#808080]"><ChevronRight width={20} height={20} strokeWidth={1.5}/></span>
          <span className="text-[#4D4D4D] font-medium text-[14px]">All Projects</span> {/*No link for current page*/}
        </nav>

        {/* Search and filters container */}
        <div className="flex items-center justify-between mb-4 pt-2">
          {/* Search input */}
          <div className="relative w-[370px] mt-2">
              <Search className="absolute left-[10px] top-1/2 transform -translate-y-1/2 text-[#999999]
               w-[18px] h-[16px]" />
              <input
                type="text"
                value={query}
                placeholder="Find your project..."
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-[38px] py-[9px] text-[13.5px] bg-white border placeholder-[#B3B3B3] border-gray-200 rounded-lg focus:outline-none"
              />
            </div>

          {/* Filter buttons */}
          <div className="flex space-x-[13px] mt-2">
            <button
              className={`px-4 py-[7px] ${showAZ? 'bg-[#5D56BD] text-white': 'bg-[#EEEDFA] text-[#5D56BD] hover:bg-purple-100'} rounded-lg text-xs`}
              onClick={handleClick}
              id="A_Z"
            >
              A-Z
            </button>
            <button className={`px-4 py-[11px] ${showpinned? 'bg-[#5D56BD] text-white': 'bg-[#EEEDFA] text-[#5D56BD] hover:bg-purple-100'} rounded-lg text-xs`} onClick={handleClick} id="Pinned">
              Pinned
            </button>
            <button onClick={handleClick} className={`px-4 py-[11px] ${showwithClients? 'bg-[#5D56BD] text-white': 'bg-[#EEEDFA] text-[#5D56BD] hover:bg-purple-100'} text-xs rounded-lg`} id="WithClients">
              With Clients
            </button>
            <button onClick={handleClick} className={`px-4 py-[11px] ${showadminAccess? 'bg-[#5D56BD] text-white': 'bg-[#EEEDFA] text-[#5D56BD] hover:bg-purple-100'} text-xs rounded-lg`} id= "AdminAccess">
              Admin Access
            </button>
            <button onClick={handleClick} className={`px-4 py-[11px] ${showPrivate? 'bg-[#5D56BD] text-white': 'bg-[#EEEDFA] text-[#5D56BD] hover:bg-purple-100'} text-xs rounded-lg`} id= "Private">
              Private
            </button>
          </div>
        </div>

        {/* Conditionally render A_Z component */}
        {showAZ && <div className='w-full'><A_Z  query={query}/></div>}
        {showpinned && <div className='w-full'><Pinned query={query}/></div>}
        {showadminAccess && <div className='w-full'><Admin_Access query={query}/></div>}
        {showwithClients && <div className='w-full'><WithClients query={query}/></div>}
        {showPrivate && <div className='w-full'><Private query={query}/></div>}
      </div>
    </div>
    </>
  );
}
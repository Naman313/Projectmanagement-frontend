'use client'

import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import TrashComponent from '../../../../components/myProjects/TrashComponent'
import ArchiveFalse from "../../../public/assets/Archive Icon.png";
import { Search, ChevronRight } from 'lucide-react';
export default function Trash() {
  const [query, setQuery] = useState<string>("")
  return (
    <>

      <div className="min-h-screen bg-[#F8F7FA] font-sans pl-2">

        <div className="pb-6 pt-3 px-6">
          {/* Breadcrumb navigation */}
          <nav className="flex items-center space-x-[0.5px] mb-6 text-[#808080] text-[13.5px]">
            <Link href="/main/dashboard">
              <span className="cursor-pointer">Dashboard</span>
            </Link>
            <span className="text-[#808080]"><ChevronRight width={20} height={20} strokeWidth={1.5} /></span>
            <Link href="/projects">
              <span className="cursor-pointer">My Projects</span>
            </Link>
            <span className="text-[#808080]"><ChevronRight width={20} height={20} strokeWidth={1.5} /></span>
            <span className="text-[#4D4D4D] font-medium text-[14px]">Trash</span> {/*No link for current page*/}
          </nav>

          {/* Search and filters container */}
          <div className="flex items-center justify-between mb-4">
            {/* Search input */}
            <div className="relative w-[370px] mt-2">
              <Search className="absolute left-[10px] top-1/2 transform -translate-y-1/2 text-[#999999] w-[18px] h-[18px]" />
              <input
                type="text"
                value={query}
                placeholder="Find your project..."
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-[38px] py-[9px] text-[13.5px] bg-white border placeholder-[#B3B3B3] border-gray-200 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <TrashComponent query={query} />
        </div>
      </div>
    </>
  );
}
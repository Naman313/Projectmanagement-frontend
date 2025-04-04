"use client";

import React, { useState, useEffect } from "react";
import { Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Date from '../date/date'
export default function Header() {

  return (
    <header className="mx-6 my-2 mt-4 rounded-lg bg-white w-[1015px] font-medium">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <a href="#" className="text-[#565DBD] text-sm font-sans font-medium">
            Dashboard
          </a>
        </div>
        <Date/>
      </div>
    </header>
  );
}
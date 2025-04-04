"use client";
import React from "react";
import Date from "../date/date";

export default function Header({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const tabClasses = (tabName: string) =>
    `pb-2 transition-all duration-100 ${
      activeTab === tabName ? "text-[#5D56BD] border-b-2 border-[#5D56BD]" : "text-gray-500 hover:text-gray-600"
    }`;

  return (
    <header className="mx-4 my-0 rounded-lg bg-white shadow-sm relative">
      <div className="h-20 px-4 flex items-center justify-between">
        <div className="relative">
          <a href="#" className="text-[#5D56BD] text-md font-medium">My Stuff</a>
        </div>
        <Date />
      </div>
      <div className="w-full px-4 py-2">
        <div className="flex space-x-6 text-sm">
          <button onClick={() => setActiveTab("My Assignment")} className={tabClasses("My Assignment")}>
            My Assignment
          </button>
          <button onClick={() => setActiveTab("Bookmarked")} className={tabClasses("Bookmarked")}>
            Bookmarked
          </button>
          <button onClick={() => setActiveTab("Schedule")} className={tabClasses("Schedule")}>
            Schedule
          </button>
          <button onClick={() => setActiveTab("My Drafts")} className={tabClasses("My Drafts")}>
            My Drafts
          </button>
        </div>
      </div>
    </header>
  );
}

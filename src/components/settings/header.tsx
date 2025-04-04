"use client";
import React from "react";
import Date from '../date/date';

interface HeaderProps {
  isPersonalProfile: boolean;
  setIsPersonalProfile: (value: boolean) => void;
  isNotification: boolean;
  setIsNotification: (value: boolean) => void;
  isSecurity: boolean;
  setIsSecurity: (value: boolean) => void;
  propValue: string;
}

export default function Header({
  propValue, 
  isPersonalProfile, setIsPersonalProfile, 
  isNotification, setIsNotification, 
  isSecurity, setIsSecurity
}: HeaderProps) {
  
  return (
    <header className="mx-4 my-2 rounded-lg bg-white shadow-sm relative">
      <div className="h-20 px-4 flex items-center justify-between">
        <div className="relative">
          <a href="#" className="text-[#5D56BD] text-medium">
            {propValue}
          </a>
        </div>
        <Date />
      </div>
      
      {/* Navigation Tabs */}
      <div className="w-full px-4 py-2">
        <div className="flex space-x-6 text-sm text-[#5D56BD]">
          <div 
            className={`${isPersonalProfile ? 'border-b-2 border-[#5D56BD]' : ''}`} 
            onClick={() => {
              setIsPersonalProfile(true);
              setIsNotification(false);
              setIsSecurity(false);
            }}>
            Personal Profile
          </div>

          <div 
            className={`${isNotification ? 'border-b-2 border-[#5D56BD]' : ''}`} 
            onClick={() => {
              setIsPersonalProfile(false);
              setIsNotification(true);
              setIsSecurity(false);
            }}>
            Notification
          </div>

          <div 
            className={`${isSecurity ? 'border-b-2 border-[#5D56BD]' : ''}`} 
            onClick={() => {
              setIsPersonalProfile(false);
              setIsNotification(false);
              setIsSecurity(true);
            }}>
            Security
          </div>
        </div>
      </div>
    </header>
  );
}

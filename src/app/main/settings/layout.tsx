"use client"
import React, { useState } from 'react';
import Header from '@/components/settings/header';
import Page from '../settings/page'; // Import `page.tsx`

export default function HeyLayout() {
  const [isPersonalProfile, setIsPersonalProfile] = useState(true);
  const [isNotification, setIsNotification] = useState(false);
  const [isSecurity, setIsSecurity] = useState(false);

  return (
    <div>
      <div className="mx-6 my-2 mt-4 rounded-lg bg-white w-[1015px]">
        <Header 
          propValue="Settings" 
          isPersonalProfile={isPersonalProfile} 
          setIsPersonalProfile={setIsPersonalProfile} 
          isNotification={isNotification} 
          setIsNotification={setIsNotification} 
          isSecurity={isSecurity} 
          setIsSecurity={setIsSecurity}
        />
        
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex items-center text-gray-600 mb-4"></div>
        </div>

        {/* Render `page.tsx` and pass props */}
        <Page 
          isPersonalProfile={isPersonalProfile} 
          setIsPersonalProfile={setIsPersonalProfile} 
          isNotification={isNotification} 
          setIsNotification={setIsNotification} 
          isSecurity={isSecurity} 
          setIsSecurity={setIsSecurity}
        />
      </div>
    </div>
  );
}

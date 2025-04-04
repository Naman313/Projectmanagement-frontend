"use client"
import React from 'react';
import MyAssignment from '@/components/mystuff/myassignment';
import PersonalProfile from "@/components/settings/personalProfile/personalProfile";
import Notification from "@/components/settings/notification/notification";
import Security from "@/components/settings/security/Security";

interface PageProps {
  isPersonalProfile: boolean;
  setIsPersonalProfile: (value: boolean) => void;
  isNotification: boolean;
  setIsNotification: (value: boolean) => void;
  isSecurity: boolean;
  setIsSecurity: (value: boolean) => void;
}

function Page({ isPersonalProfile, isNotification, isSecurity }: PageProps) {
  return (
    <div className="mx-6 my-2 mt-4 rounded-lg bg-white w-[1015px] font-medium">
      <div className='px-6 py-4 flex items-center justify-between'>
        {isPersonalProfile && <PersonalProfile />}
      {isNotification && <Notification />}
      {isSecurity && <Security />}
      </div>
    </div>
  );
}

export default Page;

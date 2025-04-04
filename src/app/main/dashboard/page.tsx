'use client';

import { useState, useEffect } from 'react';
import PinnedProjects from '@/components/dashboard/PinnedProjects';
import RecentTodos from '@/components/dashboard/RecentTodos';
import StuffDueSoon from '@/components/dashboard/StuffDueSoon';
import RecentChats from '@/components/dashboard/RecentChats';
import Schedule from '@/components/dashboard/Schedule';
import CreateNewProject from "@/components/dashboard/Create_Project_modal";
import InviteTeam from '@/components/dashboard/InviteTeam';
import Header from '../../../components/layout/Header'
import useSWR from 'swr';
import axios from 'axios';
import Toast, { toast } from '@/components/auth/Toast';
import { ChevronLeft, ChevronRight, X,Plus} from "lucide-react";
interface DashboardPageProps {
  userName: string;
}

export default function DashboardPage({ userName = "Esther Howard" }: DashboardPageProps) {
  const [isToast, setToast] = useState(false);

  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isInvite, setisInvite] = useState(false);
  const [userNamee, setUserNamee] = useState("");
  const { mutate } = useSWR([`${process.env.NEXT_PUBLIC_API_URL}/projects/my-projects`, localStorage.getItem("token")]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const handleProjectCreated = async () => {
    await mutate();
  }
  const openNewProject = () => {
    setIsNewProjectOpen(true);
  };

  const closeNewProject = () => {
    setIsNewProjectOpen(false);
  };

  const handleInvite = () => {
    setisInvite(true);
  };
  const closeInvite = () => {
    setisInvite(false);
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";

  };
  useEffect(() => {
    fetchUserId();
  }, []);
  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response.data.fullName,"jkhiojhuio")
      setUserNamee(response.data.fullName);
    } catch (err) {
      console.error("Error fetching user ID:", err);

    }
  };

  return (
    <>
      <Toast />
      <div className="flex font-sans">
        <div className="flex-1 flex flex-col bg-[#F8F7FA]">
          {/* <div className="mt-0.25 px-3 rounded-lg"> */}
          <Header />
          {/* </div> */}

          <div className="flex-1 px-6 ">
            <div className="w-[980px] flex mb-8 mt-4 ml-2">
              <h1 className="font-medium text-[#333333] font-sans text-[22px]" >
                 <span>{getGreeting()}, {userNamee}</span>
              </h1>
              <div className="flex font-sans ml-auto -translate-y-[3px] gap-[36px] translate-x-[24px]">
                <button
                  className="flex flex-row justify-center items-center text-[13px] font-normal bg-[#5D56BD] text-white rounded-lg hover:bg-[#4A4495] w-[142px] h-[37px] translate-x-[13px] pr-3 pl-2"
                  onClick={openNewProject}
                >
                  <Plus className='font-normal  w-[18px] h-[18px] -translate-x-[5px] mr-1 ml-2' strokeWidth= {2}/>
                  <div className='-translate-x-[2px]'>New project</div>
                </button>
                <button className="flex text-[13px] justify-center items-center w-[144px] h-[36px] font-medium text-[#5D56BD] bg-[#E7E6F5] rounded-lg hover:bg-[#EFEFFB] transition-colors py-[9px]"
                  onClick={handleInvite}>
                  Invite Team
                </button>
              </div>
            </div>


            <div className="col-span-1 w-full pr-[10px]  mb-3 font-sans pl-2">
              <div className="bg-white rounded-lg px-[13px]  w-[1000px] h-[210px] flex flex-col justify-between">

                <div className="flex justify-between items-center mb-3 mt-[16px]">
                  <h2 className="text-[#333333] text-[18.5px] font-medium">Pinned Projects</h2>
                  <div className="flex flex-row items-center">
                    <button className="flex items-center gap-1 text-[#5D56BD] font-medium text-xs hover:text-[#4A4495]">
                      Show all
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>
                <PinnedProjects />
              </div>
            </div>



            <div className=' mt-[30px] font-sans mb-[30px] pl-2'>
              {/* Recent To-dos Section */}
              <div className='flex gap-[20px] mt-4'>
              <div className="bg-white w-[360px] h-[310px] rounded-lg p-6 py-3 px-[8px]  col-span-5 mr-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-[#333333] text-[18px] font-medium px-1 py-[1px]">Recent To-Do's</h2>

                </div>
                <RecentTodos />
              </div>

              {/* Stuff Due Soon Section */}
              <div className="bg-white w-[610px] rounded-lg py-3 px-3">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-[#333333] text-[18px] font-medium px-1">Stuff Due Soon</h2>
                </div>
                <StuffDueSoon />
              </div>
              </div>
              {/* Recent Chats Section */}
              <div className='flex mt-[10px] ml-[7px] gap-[20px]'>
              <div className="bg-white rounded-lg py-3 px-3 mt-5  w-[655px] h-[350px]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-[#333333] text-lg font-medium px-[2px]">Recent Chats</h2>
                  <button className="flex items-center gap-1 text-[#5D56BD] opacity-60 font-medium text-[13px] hover:text-[#4A4495] -translate-x-[5px]">
                    Show all
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="overflow-y-auto">
                  <RecentChats />
                </div>
              </div>
              {/* My Schedule Section */}
              <div className="bg-white rounded-lg py-3 px-2  mt-6 w-[320px] h-[365px] mr-[50px]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-[#333333] text-lg font-medium px-[px]">My Schedule</h2>
                  <button className="flex font-medium gap-1 text-[#5D56BD] text-xs hover:text-[#4A4495]">
                    Show all
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <Schedule />
              </div>
              </div>
            </div>
          </div>
        </div>


        {/* Create New Project Modal */}
        {isNewProjectOpen && <CreateNewProject onClose={closeNewProject} onProjectCreated={handleProjectCreated} />}
        {isInvite && <InviteTeam onClose={closeInvite} />}
      </div>
    </>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import Date from "../../../../components/date/date";
import Overview from "@/components/overview/Overview";
import ToDo from "@/components/overview/ToDo";
import NoticeBoard from "@/components/overview/NoticeBoard";
import DocsFiles from "@/components/overview/DocsFiles";
import Campfire from "@/components/overview/Campfire";
import Schedule from "@/components/overview/Schedule";
import About from "@/components/overview/About";
import { useParams } from "next/navigation";
import axios from "axios";

export default function page() {
  interface Project {
    _id: string;
    name: string;
    category: string;
  }

  const [projectData, setProjectData] = useState<Project | null>(null);

  const params = useParams();
  const { id } = params;
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/project/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const project = response.data;
        // console.log(project,"hlo");
        setProjectData(project);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProject();
  }, [id]);

  const [isOverview, setOverview] = useState(true);
  const [isToDo, setToDo] = useState(false);
  const [isNoticeBoard, setNoticeBoard] = useState(false);
  const [isDocsFiles, setDocsFiles] = useState(false);
  const [isCampfire, setCampfire] = useState(false);
  const [isSchedule, setSchedule] = useState(false);
  const [isTracker, setTracker] = useState(false);
  const [isAbout, setAbout] = useState(false);
  const [ID, setId] = useState("");
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    setId(id);
    setOverview(id === "Overview");
    setToDo(id === "ToDo");
    setNoticeBoard(id === "NoticeBoard");
    setDocsFiles(id === "DocsFiles");
    setCampfire(id === "Campfire");
    setSchedule(id === "Schedule");
    setAbout(id === "About");
  };

  const colors = [
    "bg-teal-100 text-teal-600",
    "bg-rose-100 text-rose-600",
    "bg-gray-100 text-gray-600",
    "bg-orange-100 text-orange-600",
    "bg-blue-100 text-blue-600",
    "bg-blue-100 text-blue-600",
    "bg-orange-100 text-orange-600",
  ];

  return (
    <>
      <header className="pt-4 ml-[10px] font-sans">
        <div className="mx-4 px-4 rounded-lg bg-white shadow-sm h-[110px] pl-6">
          <div className="h-16 flex items-center justify-between">
            {projectData && (
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 ${colors[parseInt(projectData._id) % colors.length]} rounded-full flex items-center justify-center font-medium text-[15px]`}
                >
                  {projectData.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-[2px]">
                  <h3 className="text-[16px] font-medium text-[#5D56BD]">
                    {projectData.name}
                  </h3>
                  <p className="text-[12px] font-regular text-[#666666]">{projectData.category}</p>
                </div>
              </div>
            )}
            <Date />
          </div>

          <div className="flex gap-[14px] text-sm mt-[14px]">
            <div
              className={`${
                isOverview
                  ? "text-[#5D56BD] border-b-2 border-[#5d56bd] bg-[#5D56bd] bg-opacity-5 px-2 text-[13.5px]"
                  : "text-[#666666] hover:text-gray-700"
              } py-1 px-1 hover:cursor-pointer`}
              id="Overview"
              onClick={handleClick}
            >
              Overview
            </div>
            <div
              className={`${
                isToDo
                  ? "text-[#5D56BD] border-b-2 border-[#5d56bd] bg-[#5D56bd] bg-opacity-5 px-2 text-[13.5px]"
                  : "text-gray-500 hover:text-gray-700"
              } p-1 hover:cursor-pointer`}
              id="ToDo"
              onClick={handleClick}
            >
              To-Do's
            </div>
            <div
              className={`${
                isNoticeBoard
                  ? "text-[#5D56BD] border-b-2 border-[#5d56bd] bg-[#5D56bd] bg-opacity-5 px-2 text-[13.5px]"
                  : "text-gray-500 hover:text-gray-700"
              } hover:cursor-pointer p-1`}
              onClick={handleClick}
              id="NoticeBoard"
            >
              Notice Board
            </div>
            <div
              className={`${
                isDocsFiles
                  ? "text-[#5D56BD] border-b-2 border-[#5d56bd] bg-[#5D56bd] bg-opacity-5 px-2 text-[13.5px]"
                  : "text-gray-500 hover:text-gray-700"
              } hover:cursor-pointer p-1`}
              onClick={handleClick}
              id="DocsFiles"
            >
              Docs & Files
            </div>
            <div
              className={`${
                isCampfire
                  ? "text-[#5D56BD] border-b-2 border-[#5d56bd] bg-[#5D56bd] bg-opacity-5 px-2 text-[13.5px]"
                  : "text-gray-500 hover:text-gray-700"
              } hover:cursor-pointer p-1`}
              onClick={handleClick}
              id="Campfire"
            >
              Campfire
            </div>
            <div
              className={`${
                isSchedule
                  ? "text-[#5D56BD] border-b-2 border-[#5d56bd] bg-[#5D56bd] bg-opacity-5 px-2 text-[13.5px]"
                  : "text-gray-500 hover:text-gray-700"
              } hover:cursor-pointer p-1`}
              onClick={handleClick}
              id="Schedule"
            >
              Schedule
            </div>
            {/* <div
              className={`${
                isTracker
                  ? "text-[#5D56BD] border-b-2 border-[#5d56bd] bg-[#5D56bd] bg-opacity-5 px-2 text-[13.5px]"
                  : "text-gray-500 hover:text-gray-700"
              } hover:cursor-pointer p-1`}
              onClick={handleClick}
              id="Schedule"
            >
              Tracker
            </div> */}
            <div
              className={`${
                isAbout
                  ? "text-[#5D56BD] border-b-2 border-[#5d56bd] bg-[#5D56bd] bg-opacity-5 px-2 text-[13.5px]"
                  : "text-gray-500 hover:text-gray-700"
              } hover:cursor-pointer p-1`}
              onClick={handleClick}
              id="About"
            >
              About
            </div>
          </div>
        </div>
      </header>
      {isOverview && <Overview unMount={()=> setOverview(false)} Mount={()=> setNoticeBoard(true)} mountCampfire={()=> setCampfire(true)}/>}
      {isToDo && <ToDo />}
      {isNoticeBoard && <NoticeBoard />}
      {isDocsFiles && <DocsFiles />}
      {isCampfire && <Campfire />}
      {isSchedule && <Schedule />}
      {isTracker && <Schedule />}
      {isAbout && <About />}
    </>
  );
}


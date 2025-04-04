'use client'
import React, { useState, useEffect } from "react";
// import { Download } from "lucide-react";
import Image from "next/image";
import archive from "../../../public/assets/Empty Trash.png"
import axios from "axios";
import {Undo2} from 'lucide-react'

interface Project {
  id: number;
  letter: string;
  name: string;
  category: string;
  iconBg: string;
  pinned: boolean;
}
interface Props{
  query: string;
}
export default function TrashComponent({query}: Props) {
  // const [projects, setProjects] = useState<Project[]>([]);
  const [projectData, setProjectData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token"); // Replace with the actual token
  const colors = [
    "bg-teal-100 text-teal-600",
    "bg-rose-100 text-rose-600",
    "bg-orange-100 text-orange-600",
    "bg-blue-100 text-blue-600",
    "bg-blue-100 text-blue-600",
    "bg-orange-100 text-orange-600",
  ];

  // Fetch project data from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      // console.log(token);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/trashed`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let projects = response.data.projects;
        // console.log(response)
        setProjectData(projects.filter((proj: any) => proj.trashed === true));
        // setProjectData(projects);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch projects");
        } else {
          setError("Failed to fetch projects");
        }
      }
    };

    fetchProjects();
  }, []);

  const handleTrashToggle = async (project: any) => {
    try {
      const updatedTrash = !project.trashed;
      let projectId = project._id;
      console.log(projectId);
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/trashed`,
        { trashed: updatedTrash },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { projectId: projectId },
        }
      );

      // setProjectData((prev) => prev.map((proj) => proj.trashed = updatedTrash));
      if (updatedTrash === false) {
        setProjectData((prev) => prev.filter((proj) => proj._id !== projectId));
      }
    } catch (err) {
      setError(
        (err as any).response?.data?.message || "Failed to update Trashed status"
      );
    }
  };


  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-[555px] bg-white rounded-lg">
      <div className="flex flex-col items-center justify-center mb-12 translate-y-7 translate-x-1">
        <div className="">
          <Image
            src={archive}
            alt="No Project Found"
            width={205}
            height={205}
          />
        </div>
        <h3 className="text-[#4D4D4D] text-[18px] font-sm mt-4">Trash is Empty</h3>
      </div>
    </div>
  );

  if (!projectData.length) {
    return <EmptyState />;
  }

  return (
    <div className="w-full h-[500px] mx-auto bg-white">
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded">
          <p>{error}</p>
        </div>
      )}
      <div className="space-y-4 px-2 py-4">
        {projectData.filter(project=> project.name.toLowerCase().includes(query.trim().toLowerCase())).map((project) => (
          <div
            key={project._id}
            className="flex items-start justify-between p-2 bg-[#999999]/5 hover:bg-blue-50 rounded-lg max-w-10xl"
          >
            <div className="flex items-center px-2 py-[2px] ">
              <div
                className={`w-8 h-8 ${
                  colors[Math.floor(Math.random()*10) % colors.length]
                } rounded-full flex items-center justify-center font-medium `}
              >
                {project.name.charAt(0).toUpperCase()}
              </div>
              <div className="pl-2">
                <h3 className="text-sm font-medium text-[#333333]">
                  {project.name}
                </h3>
                <p className="text-[10px] font-light text-[#333333]">{project.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                className="flex items-center py-1 px-3 bg-white  border border-gray-200 rounded-md"
                onClick={() => handleTrashToggle(project)}
              >
                <Undo2 width={18} height={18} className="text-[#13BC1A]"/>
                <span className="font-regular text-[#4d4d4d]  px-[7px] text-[13px] py-[2px]">Retrieve</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client'

import React, { MouseEventHandler } from "react";
import { Download } from "lucide-react";
import Image from "next/image";
import PinFalse from "../../../public/assets/myProjects/PinnedFalse Icon.png";
import Pin from "../../../public/assets/Pin.png";
import Trash from "../../../public/assets/myProjects/Trash Icon.png";
import axios from "axios";
import { useEffect, useState } from "react";
import Archive from '../../../public/assets/Archive Button.png';
import ArchiveFalse from '../../../public/assets/Archive Icon.png'
import NoticeBoard from '../../../public/assets/Notice Board Illustration.png'
interface PropValue{
  query: string;
}

const Admin_Access = ({query}:PropValue) => {

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

  useEffect(() => {
    const fetchProjects = async () => {
      // console.log(token);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/admin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let projects = response.data.projects;
        // console.log(response)
        setProjectData(projects.filter((proj: any) => proj.trashed !== true));
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

  const handleArchiveToggle = async (project: any) => {
    try {
      const updatedArchived = !project.archived;
      let projectId = project._id;
      // console.log(projectId);
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/archive`,
        { archived: updatedArchived },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { projectId: projectId },
        }
      );
      
      if (updatedArchived === false) {
        setProjectData((prev) => prev.filter((proj) => proj._id !== projectId));
      }
    } catch (err) {
      setError(
        (err as any).response?.data?.message || "Failed to update pin status"
      );
    }
  };

  const handleTrashToggle = async (project: any) => {
    try {
      const updatedTrash = !project.trashed;
      let projectId = project._id;
      console.log(projectId);
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/trash`,
        { trashed: updatedTrash },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { projectId: projectId },
        }
      );

      setProjectData((prev) => prev.filter((proj) => proj._id !== projectId));
    } catch (err) {
      setError(
        (err as any).response?.data?.message || "Failed to update pin status"
      );
    }
  };

  const handlePinToggle = async (project: any) => {
    try {
      const updatedPinned = !project.pinned;
      let projectId = project._id;
      console.log(projectId);
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/pin`,
        { pinned: updatedPinned },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { projectId: projectId },
        }
      );

      setProjectData((prev) =>
        prev.map((proj) =>
          proj._id === projectId ? { ...proj, pinned: updatedPinned } : proj
        )
      );
    } catch (err) {
      setError(
        (err as any).response?.data?.message || "Failed to update pin status"
      );
    }
    // Router.reload();
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-[555px] bg-white rounded-lg translate-x-1 ">
    <div className="flex flex-col items-center justify-center mb-12">
      <div className="translate-y-6">
        <Image
          src={NoticeBoard}
          alt="No Project Found"
          width={165}
          height={380}
        />
      </div>
      <h3 className="text-[#4D4D4D] text-lg mb-4 mt-2 translate-y-6">No Project With Admin Access</h3>
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
      <div className="space-y-2 px-2 py-4">
        {projectData.filter((project)=> project.name.toLowerCase().includes(query.trim())).map((project) => (
          <div
            key={project._id}
            className="flex items-start bg-[#fafafa] justify-between p-4 hover:bg-blue-50 rounded-lg max-w-10xl"
          >
            <div className="flex items-center">
              <div
                className={`w-8 h-8 ${colors[Math.floor(Math.random()*10)%colors.length]}  flex rounded-full items-center justify-center font-medium`}
              >
                {project.name.charAt(0).toUpperCase()}
              </div>
              <div className="pl-2">
                <h3 className="text-sm font-medium text-[#4D4D4D]">
                  {project.name}
                </h3>
                <p className="text-xs font-light text-[#4D4D4D]">{project.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="border-[1.5px] rounded-[4px]">
                <button
                  className="p-2 text-gray-400 hover:text-gray-600"
                  onClick={() => handlePinToggle(project)}
                >
                  <Image
                    src={project.pinned ? Pin : PinFalse}
                    alt="pin"
                    width={17}
                    height={17}
                  />
                </button>
              </div>
              <div className='border-[1.5px]'>
              <button className="p-2 text-gray-400 hover:text-gray-600">
              <Image
                  src={project.archived ? Archive : ArchiveFalse}
                  alt="pin"
                  width={17}
                  height={17}
                  // onClick= {(project.id)=> handleClick}
                />
              </button>
              </div>
              <div className="border-[1.5px]">
                <button
                  className="p-2 text-gray-400 hover:text-red-600"
                  onClick={() => handleTrashToggle(project)}
                >
                  <Image src={Trash} alt="Trash" width={17} height={17} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin_Access;

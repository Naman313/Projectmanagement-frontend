'use client'
import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import Image from "next/image";
import PinFalse from "../../../public/assets/myProjects/PinnedFalse Icon.png";
import Pin from "../../../public/assets/Pin.png";
import Trash from "../../../public/assets/myProjects/Trash Icon.png";
import axios from "axios";
import useSWR from "swr";
// import Router from "next/router";
import CreateNewProject from "../dashboard/Create_Project_modal";
import Archive from "../../../public/assets/Archive Button.png";
import ArchiveFalse from "../../../public/assets/Archive Icon.png";
import NoticeBoard from '../../../public/assets/Notice Board Illustration.png';
interface PropValue{
  query: string;
}
const ProjectList = ({query}:PropValue) => {

  const [projectData, setProjectData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const token = localStorage.getItem("token"); 
  // Replace with the actual token
  // const [pinned, setPinned] = useState<boolean>(false);
  const { mutate } = useSWR([`${process.env.NEXT_PUBLIC_API_URL}/projects/my-projects`, localStorage.getItem("token")]);
  const handleProjectCreated = async () => {
    await mutate();
  }
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
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/my-projects`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let projects = response.data;
        setProjectData(projects.filter((proj: any) => proj.trashed !== true));
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

  // Handle Pin Toggle
  const handlePinToggle = async (project: any) => {
    try {
      const updatedPinned = !project.pinned;
      let projectId = project._id;
      // console.log(projectId);
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/pinned`,
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

  // Handle Archive Toggle
  const handleArchiveToggle = async (project: any) => {
    try {
      const updatedArchived = !project.archived;
      let projectId = project._id;
      // console.log(projectId);
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/archived`,
        { archived: updatedArchived },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { projectId: projectId },
        }
      );

      setProjectData((prev) =>
        prev.map((proj) =>
          proj._id === projectId ? { ...proj, archived: updatedArchived } : proj
        )
      );
    } catch (err) {
      setError(
        (err as any).response?.data?.message || "Failed to update pin status"
      );
    }
  };

  // Handle Trash Toggle
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

      setProjectData((prev) => prev.filter((proj) => proj._id !== projectId));

    } catch (err) {
      setError(
        (err as any).response?.data?.message || "Failed to update pin status"
      );
    }
  };
  const projectSorted= projectData.sort((a,b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
  // console.log("sorted projects are ", projectSorted)
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-[555px] bg-white rounded-lg translate-x-1">
      <div className="flex flex-col items-center justify-center -translate-y-[10px]">
        <div className="">
          <Image
            src={NoticeBoard}
            alt="No Project Found"
            width={165}
            height={380}
          />
        </div>
        <h3 className="text-[#4D4D4D] text-lg mb-4 mt-5">No Project Found</h3>
      <button onClick={()=> {setIsNewProjectOpen(true);}}  className="px-[16px] py-2 bg-[#5D56BD]
       text-white rounded-lg hover:bg-[#4A4499] text-[12.5px] mt-[5px]">
        Create your first project
      </button>
      </div>
      
    {isNewProjectOpen && <CreateNewProject onClose={()=> setIsNewProjectOpen(false)} onProjectCreated={handleProjectCreated} />}
    </div>
  );

  if (!projectData.length) {
    return <EmptyState />;
  }

  return (
    <>

    <div className="w-full h-[500px] mx-auto bg-white translate-y-[2px] rounded-md">
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded">
          <p>{error}</p>
        </div>
      )}
      <div className="space-y-2 font-sans">
        {projectData.filter((project)=> project.name.toLowerCase().includes(query.trim())).map((project) => (
          <div
            key={project._id}
            className="flex items-start bg-[#fafafa] justify-between p-4 hover:bg-blue-50 rounded-lg max-w-10xl"
          >
            <div className="flex items-center">
              <div
                className={`w-8 h-8 ${
                  colors[Math.floor(Math.random()*10)% colors.length]
                } rounded-full flex items-center justify-center font-medium`}
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
              <div className="border-2">
                <button
                  className="p-2 text-gray-400 hover:text-gray-600"
                  onClick={() => handlePinToggle(project)}
                >
                  <Image
                    src={project.pinned ? Pin : PinFalse}
                    alt="pin"
                    width={14}
                    height={14}
                  />
                </button>
              </div>
              <div className="border-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Image
                    src={project.archived ? Archive : ArchiveFalse}
                    alt="pin"
                    width={14}
                    height={14}
                    onClick= {() => handleArchiveToggle(project)}
                  />
                </button>
              </div>
              <div className="border-2">
                <button
                  className="p-2 text-gray-400 hover:text-red-600"
                  onClick={() => handleTrashToggle(project)}
                >
                  <Image src={Trash} alt="Trash" width={16} height={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    </>
  );
};

export default ProjectList;

import axios from 'axios';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import EditProjectModal from "./EditProjectModal";
import edit from '../../../public/assets/Edit Icon.png';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from "lucide-react";

function About() {
  const { id } = useParams(); 
  const [projectData, setProjectData] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isEdit, setisEdit] = useState(false);
  

  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

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
        setProjectData(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    fetchProject();
  }, [id, token, isEdit]);

  const handleClick = () => {
    setisEdit(true);
  };

  return (
    <>
    <div className="min-h-screen bg-[#F8F7FA] flex flex-col font-sans">
    <div className="pl-6 pr-6 pb-0">
    <div className="pl-2 pr-6 pb-0">
            <nav className="flex items-center justify-between mb-6 mt-[2px] text-[#808080] text-[13.5px]">
              {/* Left aligned: Breadcrumb navigation */}
              <div className="flex items-center space-x-[1px]">
                <Link href="/main/dashboard" className="hover:text-gray-900">
                  Dashboard
                </Link>
                <span className="text-[#808080]"><ChevronRight width={20} height={20} strokeWidth={1.5}/></span>
                <Link href="/projects" className="hover:text-gray-900">
                  {projectData?.name}
                </Link>
                <span className="text-[#808080]"><ChevronRight width={20} height={20} strokeWidth={1.5}/></span>
                <span className="text-[#4D4D4D] font-medium text-[15px]">About</span>{" "}
                {/* Display project name */}
              </div>

              {/* Right aligned: Buttons */}
              <div className="flex items-center space-x-2 translate-y-3 translate-x-8">
                <button
                  className="flex gap-1.5 px-4 py-2.5 text-[12px] bg-[#5D56BD]
                   text-white rounded-lg border-[1.5px]"
                  onClick={handleClick}
                >
                  <Image src={edit} width={18} height={18} alt="pencil"/>
                  <span className='translate-x-1'>Edit project</span>
                  
                </button>
              </div>
            </nav>
          </div>

<div className='mt-[44px]'>
      <div className='flex flex-col items-left justify-left px-5 py-3  w-50 gap-5 bg-white rounded-md font-poppins'>
        <h2 className='text-[18px] text-[#333333]'>About Project</h2>
        {projectData ? (
          <p className='text-[#333333] font-light text-[13.5px]'>{projectData.description}</p>
        ) : (
          <p className="text-gray-500">Loading project data...</p>
        )}
      </div>

      <div className='flex flex-col items-left justify-left px-5 py-3 mt-5 w-50 gap-5 bg-white rounded-md font-poppins'>
        <h2 className='text-[18px] text-[#333333]'>How we collaborate?</h2>
        {projectData ? (
          <p className='text-[#333333] font-light text-[13.5px]'>{projectData.collaboration}</p>
        ) : (
          <p className='text-[#333333] font-light'>Loading project data...</p>
        )}
      </div>
      </div>
    </div>
    {isEdit && (
        <EditProjectModal isOpen={isEdit} onClose={() => setisEdit(false)} />
      )}
      </div>
    </>
  );
}

export default About;

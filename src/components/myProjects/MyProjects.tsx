'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { Download, Pin, Trash2 } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import CreateNewProject from "../dashboard/Create_Project_modal";
import useSWR from "swr";
import { toast } from "react-toastify";
import Image from "next/image";
// import NoticeBoard from "../overview/NoticeBoard";
import myProjects from '../../../public/assets/Illustration my projects.png'
const MyProjects = () => {

  // const [projectData, setProjectData] = useState<any[]>([]);
  const [token, setToken]= useState<string | null>(null);
  const [modal, setModal]= useState<boolean>(false);
  const [isToast, setToast]= useState(false);
  if(isToast){
    toast.success("Project Created Successfully");
    setToast(false);
  }
  const router = useRouter();
  useEffect(()=>{
    const storedtoken = localStorage.getItem("token"); 
    setToken(storedtoken);

  },[])
  
  const fetcher = async ([url, token]: [string, string | null]) => {
    if (!token) return [];
    try {
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  };
  const { data: projects, error, mutate } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_API_URL}/projects/my-projects`, token] : null,
    fetcher,
    { revalidateOnFocus: false,
      dedupingInterval: 2000 
     } 
  );
  const handleProjectCreated = async () => {
    // toast.success("Project successfully created")
    await mutate(); 
    // toast.success("Project successfully created")
    setToast(true)
  };
   
  const colors = [
    "bg-teal-200 text-teal-600",
    "bg-rose-200 text-rose-600",
    "bg-orange-200 text-orange-600",
    "bg-blue-200 text-blue-600",
    "bg-blue-200 text-blue-600",
    "bg-orange-200 text-orange-600",
  ];
  

  
  // console.log("Token at MyProjects.tsx:73", token);

  if (error) {
    console.error("Fetching error:", error.response ? error.response.data : error.message);
    return <p className="text-red-500">Error fetching projects</p>;
  }
  if (!projects) return <p className="text-gray-400">Loading projects...</p>;
  const handleClick = (project: any) => {
    // console.log(project._id)
    router.push(`/main/${project._id}/overview`); 
  };
  
  const createFirst=()=>{
    setModal(true)
  }
  const modalFalse= ()=>{
    setModal(false)
  }
  return (
    <div className="w-full font-sans">
      {projects.length <= 0 ? (
        <div className="text-center py-4 -translate-x-1">
          <div className="mx-auto rounded-full flex items-center justify-center">
          <Image src={myProjects} alt="No projects" width={110} height={110} className="mt-[3px]"/>
          </div>
          <p className="text-[13px] text-[#4D4D4D] mt-[12px]">No Project Found</p>
          <button className="mx-[5px] mt-[23px] px-[16px] py-[7px]  bg-[#5D56BD] text-white text-[12px] rounded-lg hover:bg-[#5D56BD] transition-colors" onClick={createFirst}>
            Create your first project
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-y-1.5 pt-4">
          
          {projects.map((project:any, index:any) => (
            <div
              key={project._id}
              className="flex items-start bg-white justify-between px-1 py-1 hover:bg-blue-50 rounded-lg pl-6"
              onClick={() => handleClick(project)}
            >
              <div className="flex items-center hover:cursor-pointer">
                <div
                  className={`w-6 h-6 p-4 flex-shrink-0 font-xs ${
                    colors[Math.floor((Math.random()*10))% colors.length]
                  } rounded-full flex items-center justify-center`}
                >
                  {project.name.charAt(0).toUpperCase()+project.name.charAt(1).toUpperCase()}
                </div>
                <div className="pl-[7px]">
                  <h3 className="text-xs font-medium text-[#333333]">
                    {project.name}
                  </h3>
                  <p className="text-[10px] font-light text-[4D4D4D]">{project.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
              </div>
            </div>
          ))}
        </div>
      )} 
      {
        modal && <CreateNewProject onClose={modalFalse} onProjectCreated={handleProjectCreated}/>
      }
    </div>
  );
};

export default MyProjects;



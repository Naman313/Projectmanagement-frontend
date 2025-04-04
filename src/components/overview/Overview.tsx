"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Divide, Milestone, Plus } from "lucide-react";
import EditProjectModal from "./EditProjectModal";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import AddMilestone from "../dashboard/AddMilestone";
import EditmileStoneModal from "./EditmileStoneModal";
import plusIcon from "../../../public/assets/Plus Icon Manage Team.png";
import AddTeamMembers from "../dashboard/AddTeamMembers";
import Pin from "../../../public/assets/Pin.png";
import PinFalse from "../../../public/assets/myProjects/PinnedFalse Icon.png";
import Archive from "../../../public/assets/Archive Button.png";
import ArchiveFalse from "../../../public/assets/Archive Icon.png";
import avtar from "../../../public/assets/avtar.jpg";
import useSWR from "swr";
import Toast from "../auth/Toast";
import edit from '../../../public/assets/Edit Icon.png';
import { ChevronLeft, ChevronRight } from "lucide-react";
import substraction from '../../../public/assets/Subtraction 1.png'
import NoticeBoardModal from "./NoticeBoard/NoticeBoardModal";
import EmptyMilestone from '../../../public/assets/Empty milestone.png'
import MilestoneOverview from "./milestoneOverview/MilestoneOverview";
interface milestoneInterface {
  id: string;
  title: string;
  dueDate: string;
  assignedTo: string;
  completeDate: string;
  status: {
    type: string;
    enum: ["pending", "completed"];
    default: "pending";
  };
}
interface NewTeamMembers {
  id: string;
  name: string;
  role: string;
}
interface TeamMember {
  _id: string;
  fullName: string;
  role: string;
  position: string;
  avatar: string;
}
interface newMilestoneInterface {
  _id: number;
  description: string;
  assignedTo: string;
  dueDate: string;
}
interface ApiMember {
  id?: string;
  name?: string;
  role?: string;
}

interface ApiResponse {
  members: ApiMember[];
}

interface TransformedMember {
  _id: string;
  fullName: string;
  position: string;
  role: string;
  avatar: string; // Assuming 'avtar' is of type string
}
interface mileStoneThatIsFetchedFromBackend {
  _id: string;
  title: string;
  assignedTo: {
    _id: string;
    fullName: string;
  }[];
  dueDate: string;
  completedOn: string;
  status: string;
}
interface Parent {
  unMount: () => void;
  Mount: () => void;
  mountCampfire: () => void;
}
interface Notice {
  _id: string;
  title: string;
  project: string;
  postedOn: string;
  postedBy: {
    id: string;
    fullName: string;
  };
  notifyWhenPosted: [];
  description: string;
  comments: string;
  category: string;
}
interface noticeBoard {
  _id: string;
  title: string;
  project: string;
  postedOn: string;
  postedBy: {
    id: string;
    fullName: string;
  };
  notifyWhenPosted: [];
  description: string;
  comments: string;
  category: string;
}
interface Project {
  _id: string;
  name: string;
  pinned: boolean;
  archived: boolean;
}
export default function ProjectDashboard({
  unMount,
  Mount,
  mountCampfire,
}: Parent) {
  const searchParams = useSearchParams();
  const [milestoneFromBackend, setmilestoneFromBackend] = useState<mileStoneThatIsFetchedFromBackend[]>([]);
  const [pendingMilestone, setPendingMilestone]= useState<mileStoneThatIsFetchedFromBackend[]>([])
  const [completedMilestone, setCompletedMilestone]= useState<mileStoneThatIsFetchedFromBackend[]>([]);
  const [todaysMilestone, setTodayMilestone]= useState<mileStoneThatIsFetchedFromBackend[]>([]);
  const [projectName, setProjectName] = useState<string | null>(null);
  const [project, setProject] = useState<Project>({
    _id: "",
    name: "",
    pinned: false,
    archived: false,
  });
  const [milestones, setMilestones] = useState<milestoneInterface[]>([]);
  const [isEdit, setisEdit] = useState(false);
  const [token, setToken]= useState<string | null>(null)
  // const [error, setError] = useState<string | null>(null);
  const [newMilestone, setNewMilestone]= useState<newMilestoneInterface[]>([])
  const [isAddTeamMemberModalOpen, setisAddTeamMemberModal]= useState<boolean>(false)
  const [isAddMilestone, setisAddMilestone]= useState<boolean>(false);
  const [NewTeamMembers, setNewTeamMembers]= useState<NewTeamMembers[]>([])
  
  const [isEditmilestoneModal, setisEditmilestoneModal]= useState<boolean>(false);
  const [milestoneValue, setmileStoneValue]= useState<string>("");
  const [mileStoneId, setmileStoneId]= useState<string>("");
  const [tempMembers, setTempMembers] = useState<TeamMember[]>([]);
  const [isNoticeModal, setisNoticeModal] = useState(false);
  const [NoticeBoardData, setNoticeBoardData] = useState<noticeBoard[]>([]);
  const [isMilestoneOverview, setIsMilestoneOverview]= useState<boolean>(false);
  const fromOverview= true;
  const handleEditMilestone=(id: string, title: string)=>{
    setmileStoneValue(title)
    setmileStoneId(id);
    setisEditmilestoneModal(true);
  };
  const [messageOptions, setMessageOptions] = useState<string[]>([]);
  useEffect(() => {
    const temp = localStorage.getItem("token");
    setToken(temp);
  }, [token]);

  
  const [teamMembers, setTeamMembers] = useState<TransformedMember[]>([]);
  const params = useParams();
  const { id } = params;
  const projectId = id;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/project/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    fetchProject();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        
        // console.log(response);
        // setNoticeBoardData([...response.data]);
        setMessageOptions(response.data.categories)
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);  
  const handleAddMember = async (newMember: TeamMember) => {
    if (newMember.role === "Select Role") {
      toast.error("Please select a valid role");
      return;
    }

    if (isUpdating.current) return;
    isUpdating.current = true;

    try {
      const payload = {
        name: newMember.fullName,
        projectId,
        memberId: newMember._id,
        newRole: newMember.role,
      };

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/projects/members/change-role`,
        payload,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200) {
        setTempMembers((prevMembers) => {
          const memberExists = prevMembers.some(
            (member) => member._id === newMember._id
          );
          if (memberExists) {
            return prevMembers.map((member) =>
              member._id === newMember._id
                ? { ...member, role: newMember.role }
                : member
            );
          }
          return [...prevMembers, newMember];
        })

        // setTeamMembers(updateMemberState);
      
        mutateMembers();
      }
    } catch (error) {
      console.error("Failed to update member:", error);
      toast.error("Failed to update team member");
    } finally {
      isUpdating.current = false;
    }
  };
  

  const isUpdating = useRef(false)
useEffect(() => {
  // console.log(NewTeamMembers, "gggg")
  if (NewTeamMembers && NewTeamMembers.length > 0) {
    
      const formattedTeamMembers = NewTeamMembers.map(member => {
          return {
              _id: member.id,
              fullName: member.name,
              position: member.role,
              role: member.role,
              avatar: "/api/placeholder"
          };
      });
      setTeamMembers(formattedTeamMembers);
    }
  }, [NewTeamMembers]);

const fetcherMembers= async([url, token]:[string, string | null])=>{
  if(!token) return [];
  try{
    const response= await axios.get(url, {headers:{Authorization: `Bearer ${token}`}});
    const transformedMembers = response.data.members.map((member:any) => ({
      _id: member.id || "",
      fullName: member.name || "",
      position: member.role || "",
      role: member.role || "",
      avatar: avtar
    }));
    setNewTeamMembers(response.data.members);
 
    setTeamMembers(transformedMembers);
      return transformedMembers;
  }catch(error){
    console.log("Error in Members function", error);
    throw error;
  }
}
const today = new Date().toISOString().split("T")[0];
const {data: datas, error:error1, mutate: mutateMembers}= useSWR(
  token ? [`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/members`, token]: null,
  fetcherMembers,{
    revalidateOnFocus: false,
    dedupingInterval: 2000 
  }
);
const fetcher = async ([url, token]: [string, string | null]) => {
  if (!token) return [];
  try {
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    setmilestoneFromBackend(response.data.milestones)
    setPendingMilestone(response.data.milestones.filter((milestone:any)=> milestone.status==='pending'))
        setCompletedMilestone(response.data.milestones.filter((milestone: mileStoneThatIsFetchedFromBackend)=> milestone.status=== 'completed'));
    setTodayMilestone(response.data.milestones.filter((milestone:mileStoneThatIsFetchedFromBackend) => milestone.dueDate.substring(0, 10) == today))
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
};

const { data: projects, error, mutate } = useSWR(
  token ? [`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/milestones`, token] : null,
  fetcher,
  { revalidateOnFocus: false,
    dedupingInterval: 2000 
   } 
);
const handleMileStoneFetch=()=>{
 
  mutate();
}

const handleClose=()=>{
  mutateMembers()
  setisAddTeamMemberModal(false)
}
// const [NoticeBoardData, setNoticeBoard]= useState<Notice[]>([]);
useEffect(() => {
  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/noticeboard/latest`,
        {
          params: {
            projectId: id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data, "noticeBoardData");
      setNoticeBoardData([...response.data])
    } catch (error) {
      console.error(error);
    }
  };

    fetchNotes();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/noticeboard/latest`,
          {
            params: {
              projectId: id,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        
        // console.log(response.data);
        setNoticeBoardData([...response.data]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);
  //UseEffect for fetching the upcoming milestones for the side bar
  useEffect(() => {
    const projectId = id;
    const getMilestone = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/milestones`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = response.data;
        setmilestoneFromBackend(data.milestones);
        setPendingMilestone(data.milestones.filter((milestone:any)=> milestone.status==='pending'))
        setCompletedMilestone(data.milestones.filter((milestone: mileStoneThatIsFetchedFromBackend)=> milestone.status=== 'completed'));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getMilestone();
  }, []);

  const handlePinToggle = async (project: any) => {
    try {
      const updatedPinned = !project.pinned;
      let projectId = project._id;
      console.log(projectId);
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
      setProject((prev) => ({ ...prev, pinned: updatedPinned }));
    } catch (err) {
      console.log("Error in piiend projects", err);
    }
  };

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
      setProject((prev) => ({ ...prev, archived: updatedArchived }));
    } catch (err) {
      console.log("Error in archived projects", error)
    }
  };

  const milestonesData: milestoneInterface[] = []

  useEffect(() => {
    setMilestones(milestonesData);
  }, []);
  // }
  const handleClick = () => {
    setisEdit(true);
  };
  
  const handleClickNotice = () => {
    setisNoticeModal(true);
  };
  
  const handleSwitch = () => {
    unMount();
    Mount();
  };
  const switchCampfire = () => {
    unMount();
    mountCampfire();
  };
  const [milestoneId, setMilestoneId]= useState<string>("")
  const handleMilestoneClick= (milestone: any)=>{
    setMilestoneId(milestone._id)
    setIsMilestoneOverview(true)
  }
  return (
    <>
    {isMilestoneOverview ? <div>
      <MilestoneOverview milestoneId={milestoneId}
          projectId={typeof id === "string" ? id : null}
          isOpenDetail={isMilestoneOverview}
          onClose={() => setIsMilestoneOverview(false)} 
          reload= {mutate}/>
        
    </div> : 
    <div className="min-h-screen bg-[#F8F7FA] flex flex-col font-sans">
    <Toast/>
      <div className="flex-1 h-full flex flex-col">
        <div className="h-full">
          {/* Header Section */}

          <div className="pl-7 pr-6 pb-0">
            <nav className="flex items-center justify-between mb-6 mt-[2px] text-[#808080] text-[13.5px]">
              {/* Left aligned: Breadcrumb navigation */}
              <div className="flex items-center space-x-[1px]">
                <Link href="/main/dashboard" className="hover:text-gray-900">
                  Dashboard
                </Link>
                <span className="text-[#808080]"><ChevronRight width={20} height={20} strokeWidth={1.5}/></span>
                <Link href="/projects" className="hover:text-gray-900">
                  {project?.name}
                </Link>
                <span className="text-[#808080]"><ChevronRight width={20} height={20} strokeWidth={1.5}/></span>
                <span className="text-[#4D4D4D] font-medium text-[15px]">Overview</span>{" "}
                {/* Display project name */}
              </div>

              {/* Right aligned: Buttons */}
              <div className="flex items-center space-x-2 mt-2 translate-x-1">
                <button
                  onClick={() => handlePinToggle(project)}
                  className="p-2 hover:bg-gray-100 rounded-lg border-[1.5px] bg-white"
                >
                  <Image
                    src={project.pinned ? Pin : PinFalse}
                    alt="Pin"
                    width={20}
                    height={20}
                  />
                </button>
                <button
                  onClick={() => handleArchiveToggle(project)}
                  className="p-2 hover:bg-gray-100 rounded-lg border-[1.5px] bg-white"
                >
                  <Image
                    src={project.archived ? Archive : ArchiveFalse}
                    alt="Archive"
                    width={20}
                    height={20}
                  />
                </button>
                <button
                  className="flex gap-1.5 px-4 py-2.5 text-[12px] bg-[#5D56BD]
                   text-white rounded-lg border-[1.5px]"
                  onClick={handleClick}
                >
                  <Image src={edit} width={18} height={18} alt="pencil"/>
                  Edit project
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content Grid */}
          <div className="h-full gap-6 px-6 pl-7 py-[18px]">
            
            <div className="flex gap-5">
           <div className="flex flex-col gap-7 w-[725px]">
            {/* Campfire Section */}
            <div className=" bg-white rounded-xl px-4 py-3">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[19px] text-[#333333] font-medium">Campfire</h2>
                <button className="flex items-center  gap-1 font-light text-[#5D56BD] text-xs hover:text-[#4A4495]">
                      Show all
                      <ChevronRight className="w-3 h-3" />
                    </button>
              </div>
              <div className="flex flex-col items-center justify-center py-4">
                <Image
                  src="/assets/Campfire Illustration.png"
                  alt="No Messages"
                  width={180}
                  height={180}
                />
                <p className="text-gray-500 mt-4 text-[15px]">No Messages</p>
              </div>
            </div>
             {/* Notice Board Section */}
             <div className=" bg-white rounded-xl px-4 py-4 h-[310px]">
              <div className="flex justify-between items-center">
                <h2 className="text-[19px] text-[#333333] font-medium">Notice Board</h2>
                <button onClick={handleSwitch} className="flex items-center  gap-1 font-light text-[#5D56BD] text-xs hover:text-[#4A4495]">
                      Show all
                      <ChevronRight className="w-3 h-3" />
                    </button>
              </div>
              
            {NoticeBoardData.length > 0 ? (
              <div className="space-y-4 bg-[#fafafa] mt-6">
                {NoticeBoardData.map((notice) => (
                  <div
                    key={notice._id}
                    className=" rounded-lg px-4 py-2"
                  >
                    <h3 className="font-medium text-[#333333]">{notice.title}</h3>
                    <p className="text-[#4D4D4D] text-[13.5px] mb-3 mt-3">
                      {notice.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Image
                        src="/assets/avtar.jpg"
                        alt="avatar"
                        width={20}
                        height={20}
                        className=" bg-gray-200 rounded-full"
                      />
                      {/* {notice.postedBy.fullName} */}
                      <span className="ml-2 text-[12.5px]">Test user 1</span>
                      <span className="ml-10 text-[12.5px]">Published on:&nbsp;</span>
                      <span className="text-[12px]">
                        {new Date(notice.postedOn).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="mx-2"></span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-2">
                <Image
                  src="/assets/Notice Board Illustration.png"
                  alt="Empty Notice Board"
                  width={135}
                  height={135}
                />
                <p className="text-[#4D4D4D] mt-3 text-[14.5px]">Empty Notice Board</p>
                <button
                        onClick={handleClickNotice}
                        className="flex flex-row justify-center font-regular items-center px-6 mt-4 py-2.5 bg-[#5D56BD] text-white rounded-lg text-[13px]" 
                      >
                        Post your first notice
                      </button>
              </div>
            )}
            </div>
            {/* Team Members Section */}
            <div className=" bg-white rounded-xl px-[19px] py-4 font-sans">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-[#333333] font-medium text-[19px]">
                  Team Members <span className="text-[#808080] font-light text-[16px] font-sans">({teamMembers.length})</span>
                </h2>
              </div>
              <div className="grid grid-cols-5 gap-3 mt-10">
                {/* Team Members Section - Take 4 out of the 5 columns */}
                <div className="grid grid-cols-1 gap-4 col-span-4">
                  <div className="grid grid-cols-3 gap-4">
                    {" "}
                    {/* Changed grid-cols-4 to grid-cols-3 */}
                    {NewTeamMembers.slice(0, 5).map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 px-1 bg-[#FAFAFA]"
                      >
                        <Image
                          src="/assets/avtar.jpg"
                          alt="avtar"
                          width={36}
                          height={36}
                          className=" bg-gray-200 rounded-full"
                        />
                        <div className="text-[13.5px] text-[#333333]">
                          <p className="font-regular">{member.name}</p>
                          <p className="text-[#4D4D4D] text-[10px]">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center space-x-4 p-3 bg-[#FAFAFA] justify-center text-[#333333]">
                      <div className="text-[15px]">
                        +
                        {teamMembers.length >= 5 ? +teamMembers.length - 5 : +0}
                      </div>
                    </div>
                  </div>
                </div>

              {/* Button Section - Take the remaining 1 column and take full height and width */}
              <div className="flex items-center justify-center col-span-1 h-[115px]">
                <button className="flex flex-col justify-center items-center px-4 text-[10px] pb-6 pt-3 bg-[#5D56BD] text-white rounded-lg w-full h-full font-regular" onClick={()=> setisAddTeamMemberModal(true)}>
                  <div className="mt-2 mb-2">
                  <Image src={plusIcon} alt="+" width={36} height={36} className="pt-1.5"/>
                  </div>
                  <div className="text-[11.5px] font-light">
                  Manage Team
                  </div>
                </button>
              </div>
            </div>
          </div>
          {/*Milestone section*/}
          <div className="bg-white rounded-xl px-4 py-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[19px] font-medium text-[#333333]">
                Milestones <span className="font-light text-[#808080] text-[14px]">({milestoneFromBackend.length})</span>
              </h2>
              <button className="px-[15px] py-[5px] bg-[#5D56BD] text-white text-[12px] font-light rounded-[5px] flex items-center" onClick={()=> setisAddMilestone(true)}>
                <Plus className="w-6 h-6 mr-1 font-light text-white" strokeWidth={1}/>
                Add Milestone
              </button>
            </div>
            {milestoneFromBackend.length > 0 ? (
              <div className="space-y-1">
                {pendingMilestone.length> 0 ? <div><span className="text-[#808080] text-[13px]"> Pending <span>({pendingMilestone.length})</span></span>
                {pendingMilestone.map((milestone, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#FAFAFA] p-4 rounded-lg"
                 
                >
                  <div className="w-full"  onClick={()=>handleMilestoneClick(milestone)}>
                    <div className="flex items-center  w-full">
                      <div>
                        <h3 className="font-normal text-[#333333] text-[12px]">
                          {milestone.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex text-[#4D4D4D] text-[12px] font-light mt-2">
                    Due date:{" "}
                      <div className="font-normal"> {new Date(milestone.dueDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}</div>
                        
                    </div>
                  </div>
                  <div className="flex items-center justify-between ml-auto">
                        <button className=" rounded-lg">
                        <Image
                          src="/assets/Edit Button.png"
                          alt="Edit"
                          width={20}
                          height={20}
                          onClick={()=>handleEditMilestone(milestone._id, milestone.title)}
                        />
                      </button>     
                    </div>
                </div>
              ))}</div> : <div></div>}
                
              <hr className="w-full py-2"/>
              {completedMilestone.length> 0 ? <div><span className="text-[#808080] text-[13px]"> Completed <span>({completedMilestone.length})</span></span>
              {completedMilestone.map((milestone, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#FAFAFA] p-4 rounded-lg"
                >
                  <div className="w-full"
                   onClick={()=>handleMilestoneClick(milestone)}>
                    <div className="flex items-center w-full">
                      <div>
                        <h3 className="font-normal text-[#333333] text-[12px]">
                          {milestone.title}
                        </h3>
                        
                      </div>
                    </div>
                    <div className="flex">
                    <div className="flex text-[#4D4D4D] text-[12px] font-light mt-2">
                    Due date:{" "}
                      <div className="font-normal"> {new Date(milestone.dueDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}</div>
                        
                    </div>
                    
                    </div>
                  </div>
                  <div className="flex items-center justify-between ml-auto">
                        <button className=" rounded-lg">
                        <Image
                          src="/assets/Edit Button.png"
                          alt="Edit"
                          width={20}
                          height={20}
                          onClick={()=>handleEditMilestone(milestone._id, milestone.title)}
                        />
                      </button>     
                    </div>
                </div>
              ))}</div> : <div></div>}
            </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Image
                  src="/assets/Milestone Illustration.png"
                  alt="No Milestone"
                  width={115}
                  height={115}
                />
                <p className="text-[#4D4D4D] mt-2 text-[14.5px]">No Milestone</p>
              </div>
            )}
          </div>
            </div>
          {/* Project Status Section */}
          <div className="w-[310px] bg-[#252743] text-white rounded-xl py-4 px-4 translate-x-3 font-sans h-fit">
            <h2 className="text-[19px]  mb-4">Project Status</h2>
            <div className="flex justify-between items-center mb-6">
              <span className="text-[14.5px]">On Track</span>
              <div className="px-3 py-1 rounded-lg text-[13px] font-medium text-[#13BC1A] translate-x-2">
                Updated Status
              </div>
            </div>

            {/* Existing Milestones Section */}
            <div className="mb-6">
              {(completedMilestone.length) > 0 ? (
                milestoneFromBackend.filter((milestone)=> milestone.status!=="pending").map((milestone) => (
                  <div
                    key={milestone._id}
                    className="bg-white text-[#4D4D4D] pl-2 pt-2 pb-1 mb-3 rounded-lg"
                  >
                    <div className="flex flec-row items-center">
                      <Image
                        src="/assets/avtar.jpg"
                        alt="avatar"
                        width={16}
                        height={16}
                        className=" bg-gray-200 rounded-full"
                      />
                      <h3 className=" ml-2 text-[#4D4D4D] text-[12px]">
                        {milestone.assignedTo[0].fullName}
                      </h3>
                    </div>
                    <div className="text-wrap overflow-y-auto text-[12px] text-[#333333]">{milestone.title}</div>
                    <div className="text-[11px] text-[$4D4D4D] pt-2">
                     <span className="font-light"> Due date: </span>   {new Date(milestone.dueDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                    </div>
                    <div className=" text-[11px] text-[$4D4D4D] py-1">
                      <span className="font-light">Completed on:</span> {
                        new Date(milestone.completedOn).toLocaleDateString(
                          "en-GB",{
                            day: "2-digit",
                            month: "short",
                            year:"numeric",
                          }
                        )
                      }
                    </div>
                  </div>
                ))
              ) : (
                <>
                <div className="flex flex-col items-center justify-center pt-12">
                  <Image
                    src="/assets/Empty Project Illustration.png"
                    alt="Empty Status"
                    width={110}
                    height={250}
                    className=""
                  /> 
                </div>
                 <p className="text-white mt-3 ml-14 font-light text-[15px]">Empty Projects Status</p>
                 </>
              )}
            </div>

              {/* New Timeline Section */}
              <div className="mt-4">
                <div className="relative">
                 {todaysMilestone.length>0 ? <div>
                  <div className="flex flex-col mb-4">
                  <div className="flex items-center mt-10">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className=" text-[13.5px]">Due Date  <div>
                    <span className=" text-[11.5px] font-light text-[#FFFFFF]">
                      {new Date().toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}(Today)
                    </span>
                  </div>
                  </div> 
                  </div>  
                </div>
                  {todaysMilestone
                    .map((task, index) => (
                      <div key={index} className="mb-6 pl-8">
                        <div className="left-3 top-0 h-full w-px bg-gray-600" />
                    {/* Timeline number indicator */}
                    <div className="absolute left-0 w-6 h-6 rounded-full bg-[#FFB13B] flex items-center justify-center text-sm translate-y-7">
                      {index + 1}
                    </div>
                    {/* Task content */}
                    <div className="pl-2 py-2 bg-[#2E3251] rounded-lg">
                      <div className="flex items-center mb-2">
                        <Image
                          src="/assets/avtar.jpg"
                          alt="hlo"
                          width={16}
                          height={16}
                          className="rounded-full"
                        />
                        <span className="ml-2 text-[11px] font-light">{task.assignedTo[0]?.fullName}</span>
                      </div>
                      <p className="text-[12px] font-light">{task.title}</p>
                    </div>
                  </div>
                ))}
                 </div> : 
                 <div className="mt-20">
                 <div className="flex items-center mt-10">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className=" text-[13.5px]">Due Date  <div>
                    <span className=" text-[11.5px] font-light text-[#FFFFFF]">
                      {new Date().toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}(Today)
                    </span>
                  </div>
                  </div> 
                  </div>
                  
                  <div className="absolute left-0 w-6 h-6 rounded-full bg-[#FFB13B] flex items-center justify-center text-sm mt-10">
                      {0}
                    </div>
                    <div className="pl-2 py-2 pt-3 bg-[#2E3251] rounded-lg ml-7 mt-4">
                      <div className="flex flex-col items-center mt-2 mb-4 ml-1">
                        <Image src={EmptyMilestone} alt="No Milestone" width={120} height={120} className="z-50"/>
                        <div className="font-light text-xs">0 Due Date Found</div>
                      </div>
                    </div>
                  </div>}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      {isEdit && (
        <EditProjectModal isOpen={isEdit} onClose={() => setisEdit(false)} />
      )}
      {isEditmilestoneModal && (
         
        <EditmileStoneModal 
        mutate= {mutate}
        milestoneFromBackend={milestoneFromBackend}
        mileStoneId={mileStoneId} 
        milestoneValue={milestoneValue} 
        onClose={() => setisEditmilestoneModal(false)} />
      )}
       {isAddMilestone && (
          <AddMilestone
          handleMileStoneFetch= {handleMileStoneFetch}
            onClose={() => setisAddMilestone(false)}
            teamMembers={teamMembers}
            setmileStone={setNewMilestone}
            fromOverview={fromOverview}
          />
        )}
        {isAddTeamMemberModalOpen && (
          <AddTeamMembers
            mutate={mutateMembers}
            fromOverview={fromOverview}
            onClose={handleClose}
            onAddMember={handleAddMember}
            teamMembers={teamMembers}
          />
        )}{isNoticeModal && (
          <NoticeBoardModal
            isOpen={isNoticeModal}
            onClose={() => setisNoticeModal(false)}
            messageOptions={messageOptions}
            setMessagesOptions={setMessageOptions}
            NoticeBoardData={NoticeBoardData}
            setNoticeBoardData={setNoticeBoardData}
          />
        )}
      </div>
      </div>}
    
    </>
  );
}

import React, { useState } from "react";
import { X, Search } from "lucide-react";
import { toast } from 'react-toastify'
import Toast from "../auth/Toast";
import axios from "axios";
import { title } from "process";
import Image from "next/image";
import avtar from '../../../public/assets/avtar.jpg'
import { useParams } from "next/navigation";
import DateIcon from '../../../public/assets/Date Icon.png'
interface AddMilestoneProps {
  handleMileStoneFetch: ()=> void
  onClose: () => void;
  teamMembers: Array<{
    _id: string;
    fullName: string;
    role: string;
    avatar: string;
  }>;
  setmileStone: React.Dispatch<React.SetStateAction<Milestone[]>>;
  fromOverview: boolean;
}

interface Milestone {
  _id: number;
  description: string;
  assignedTo: string;
  dueDate: string;
}


const AddMilestone: React.FC<AddMilestoneProps> = ({
  handleMileStoneFetch,
  onClose,
  teamMembers,
  setmileStone,
  fromOverview,
}) => {
  const [milestoneDescription, setMilestoneDescription] = useState("");
  const [selectedMember, setSelectedMember] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Filter team members based on the search query

  const filteredMembers = 
    teamMembers.filter(member => member?.fullName?.toLowerCase().includes(searchQuery?.toLowerCase() || ""));


  const params = useParams();
    const { id } = params;
    // console.log(id,milestoneDescription, dueDate )
  const AddMilestoneFromOverview = async () => {
  // Remove the setTimeout for validation toast
  if (!milestoneDescription || selectedMember?.length === 0 || !dueDate) {
    toast.error("Please fill in all fields.");
    return;
  }

  const projectData = {
    projectId: id,
    title: milestoneDescription,
    assignedTo: teamMembers
      .filter((member) => selectedMember.includes(member.fullName))
      .map((member) => member._id) || [], 
    dueDate: dueDate,
    status: "pending"
  };

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/project/add-milestone`,
      projectData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (response.status === 200) {

      handleMileStoneFetch()      
      onClose();
    }
  } catch (error) {
    console.error("Failed to create project:", error);
    toast.error("Failed to add milestone"); // Add error toast
  }
};
  const handleAddMilestone = () => {
    if(fromOverview){
      AddMilestoneFromOverview()
      return ;
    }
    else{
    if (!milestoneDescription || selectedMember?.length === 0 || !dueDate) {
      toast.error("Please fill in all fields.");
      return;
    }
  }

    const newMilestone: Milestone = {
      _id: Date.now(), // Unique ID for the milestone
      description: milestoneDescription,
      assignedTo: selectedMember.join(' '),
      dueDate: dueDate,
    };

    setmileStone((prevMilestones) => [...prevMilestones, newMilestone]); // Add to the milestone array
    onClose(); // Close the modal
  };
  const handleSelect = (memberName: string) => {
    if (selectedMember) {
      setSelectedMember((prev) =>
        prev?.includes(memberName)
          ? prev.filter((member) => member !== memberName)  // Remove if already selected
          : [...(prev || []), memberName] // Add if not selected
      );
    }


  }
  return (
    <>
    {/* {console.log(teamMembers)} */}
      <Toast />
      <div className="fixed inset-0 no-scrollbar flex items-center overflow-y-auto justify-center bg-black/35 z-50">
        <div className="bg-white rounded-[10px] shadow-lg w-[570px] h-[560px] ml-[10px] mt-[250px] pl-2">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[19px] font-medium text-[#333333]">Add Milestone</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mt-[10px]">
              <div>
                <label className="block text-[13.5px] text-[#333333] ">
                  Project Milestone
                </label>
                <textarea
                  
                  placeholder="Enter project milestone..."
                  className="w-full h-[65px] px-3 pb-6 pt-2 placeholder-[#B3B3B3] bg-white  rounded-md text-sm text-wrap border border-[#CCCCCC] "
                  value={milestoneDescription}
                  onChange={(e) => setMilestoneDescription(e.target.value)}
                />
              </div>

              <div >
                <label className="block text-sm text-[#333333] mb-1.5">
                  Assigned to
                </label>
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none ">
                    <Search className="w-4 h-4 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search team member"
                    className="w-full pl-10 pr-3 py-2 bg-white border border-[#CCCCCC]  rounded-md text-sm placeholder-[#B3B3B3] "
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
                  />
                </div>
                <div className="w-full h-[160px] border rounded-md border-[#CCCCCC]">
                <div className="flex flex-wrap gap-1 py-2 px-2">
                  {filteredMembers.slice(0, 5).map((member) => (
                    <div
                      key={member._id}
                      onClick={() => handleSelect(member.fullName)}
                      className={"relative flex items-center bg-[#FAFAFA] text-[#333333] gap-1.5 px-4 py-2 hover:cursor-pointer"}
                    >
                      {selectedMember.includes(member.fullName) && (
                        <div className="absolute top-[10px] right-0 bg-[#6BBD56] text-[#FAFAFA] text-xs 
                         w-4 h-4 flex items-center justify-center">
                          
                          <span className="text-white">✓</span>
                        </div>
                      )}

                      <Image
                        src={avtar}
                        alt={member.fullName}
                        width={36}
                        height={36}
                        className="rounded-full"
                      />
                      <div className="text-[12px]">
                        <p className=" text-[#333333]">{member.fullName}</p>
                        <p className="text-[10px] text-[#4D4D4D]">({member.role})</p>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
              </div>

              <div className="w-[160px]">
                <label className="block text-sm  text-[#333333] mb-1.5">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full px-1 py-2 bg-white border-[1.5px]   rounded-lg text-sm  placeholder-[#B3B3B3]"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={handleAddMilestone}
                className="px-10 py-2 bg-[#5D56BD] text-white rounded-lg text-[13px]  hover:bg-[#4A44A7]"
              >
                Add 
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMilestone;

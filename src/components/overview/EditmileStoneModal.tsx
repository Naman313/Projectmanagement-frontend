import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { X, Search } from "lucide-react";
import { toast } from 'react-toastify';
import Toast from "../auth/Toast";
import axios from "axios";
import Image from "next/image";
import avtar from '../../../public/assets/avtar.jpg'


interface MilestoneInterface {
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
interface EditmilestoneInterface {
  mutate: () => void;
  milestoneFromBackend: MilestoneInterface[];
  mileStoneId: string;
  milestoneValue: string;
  onClose: () => void;
}

interface TeamMembers {
  id: string;
  name: string;
  role: string;
  extraId?: string;
}

function EditmileStoneModal({ mutate, mileStoneId, milestoneValue, onClose, milestoneFromBackend }: EditmilestoneInterface) {
  const { id: projectId } = useParams();
  const token = localStorage.getItem("token");
  const [selectedMember, setSelectedMember] = useState<string[]>([]);
  const [members, setMembers] = useState<TeamMembers[]>([]);
  const [dueDate, setDueDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mileStoneData, setmileStoneData] = useState(milestoneValue || "");


  // Fetch users effect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching members for project:', projectId);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/members`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Fetched members:', response.data.members);
        setMembers(response.data.members);
      } catch (error) {
        console.error("Detailed error fetching users:", error);
        toast.error(`Failed to fetch team members: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };
    fetchUsers();
  }, [projectId, token]);


  const filteredMembers = React.useMemo(() =>
    members.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [members, searchQuery]
  );

  const handleSelect = (memberId: string) => {
    setSelectedMember((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };
  useEffect(() => {
    const getMilestone = async () => {
      const members: MilestoneInterface[] = milestoneFromBackend.filter((prev) => prev._id === mileStoneId);

      if (members.length > 0) {
        const assignedMemberIds = members[0].assignedTo.map((member) => member._id);
        const date = members[0].dueDate;
        const formattedDate = date.split("T")[0];
        setDueDate(formattedDate);
        // console.log("Assigned Member IDs:", date)
        setSelectedMember((prev) => [...prev, ...assignedMemberIds]);
      }
    };
    getMilestone();
  }, [])


    const remove= (memberId: string)  =>{
      console.log("You are in remove")
      filteredMembers.filter((member)=> member.id!== memberId)
    }

  const handleSave = async () => {
    if (!dueDate) {
      toast.error("Please select a due date");
      return;
    }
    if (!mileStoneData.trim()) {
      toast.error("Please enter a milestone title");
      return;
    }

    const savemilestone = async () => {
      const updatedMembers = Array.from(new Set([...selectedMember]));
      setSelectedMember(updatedMembers);

      try {
        // console.log('Saving milestone with details:', {
        //   projectId,
        //   mileStoneId,
        //   title: mileStoneData,
        //   assignedTo: updatedMembers, // Use updated state
        //   dueDate
        // });

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/milestones/${mileStoneId}`,
          {
            title: mileStoneData,
            assignedTo: updatedMembers,
            dueDate,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          }
        );

        toast.success("Milestone updated successfully");

        await mutate();
        onClose();
      } catch (error) {
        console.error("Detailed error updating milestone:", error);

        if (axios.isAxiosError(error)) {
          const errorMsg = error.response?.data?.message || error.message;
          toast.error(`Failed to update milestone: ${errorMsg}`);
        } else {
          toast.error("An unexpected error occurred while updating milestone");
        }
      }
    };

    const handleSave = () => {
      if (selectedMember.length <= 0) {
        toast.error("Please select at least one team member");
        return;
      }
      if (!dueDate) {
        toast.error("Please select a due date");
        return;
      }
      if (!mileStoneData.trim()) {
        toast.error("Please enter a milestone title");
        return;
      }

      savemilestone();
    };

    savemilestone();
  };

  const handleDelete = async () => {
    const milestoneId = mileStoneId;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/projects/project/${projectId}/milestones/${milestoneId}`), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
      await mutate();
      onClose()
    } catch (error) {
      console.log("Error in deleting milestone", error);
    }
  }
  return (
    <>
      {/* {console.log(selectedMember,"selectedMember")} */}
      <Toast />
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 font-sans">
        <div className="bg-white rounded-xl  w-[570px] h-[480px] ml-[10px]  ">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-medium text-[#333333] ml-2">Edit Milestone</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 ml-2 pt-[6px]">
              <div>
                <label className="block text-[13.5px] text-[#333333] mb-1.5">
                  Project Milestone
                </label>
                <textarea
                  // type="text"
                  rows={2}
                  value={mileStoneData}
                  onChange={(e) => setmileStoneData(e.target.value)}
                  placeholder="Enter project milestone..."
                  className="w-full px-3 py-2 bg-white border border-[#CCCCCC] rounded-lg text-sm"
                />

              </div>

              <div>
                <label className="block text-[13.5px] text-[#333333] mb-1.5">
                  When done, notify
                </label>
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search team member"
                    className="w-full pl-10 pr-3 py-2 bg-white border border-[#CCCCCC] rounded-lg text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
                  />
                </div>
                {/* {selectedMember.includes(member.id) && (
                        <div className="absolute -top-0.75 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          ✔
                        </div>
                      )} */}
                <div className="flex flex-wrap gap-1 rounded-md overflow-y-auto border border-[#CCCCCC] h-[80px] text-white pl-2">
                  {filteredMembers.slice(0, 5).map((member) => (
                    <div className="pt-1 pb-1 px-1 ">
                      <div
                        key={member.id}
                        onClick={() => handleSelect(member.id)}
                        className={`flex items-center gap-1 bg-[#5D56BD] text-white p-1  
                          rounded-full font-regular text-[12px]`}
                      >
                        <Image
                          src={avtar}
                          width={20}
                          height={20}
                          alt={member.name}
                          className="rounded-full"
                        />
                        <div className="text-xs">
                          <p className="font-light">{member.name}</p>
                        </div>
                        <button
                        onClick={() => remove(member.id)}
                        className=" bg-[#5D56BD] rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      </div>
                      
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-[13.5px] text-[#333333] mb-1.5">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-[155px] px-2 py-[9px] bg-white border border-[#CCCCCC] rounded-lg text-sm"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-2 flex justify-end gap-[13px] mr-[6px] font-sans">
              <button
                onClick={handleSave}
                className="px-[39px] py-[9px] bg-[#5D56BD] text-[#ffffff] rounded-md text-[12.5px] font-light "
              >
                Save
              </button>
              <button
                onClick={handleDelete}
                className="px-[35px] py-[9px] bg-[#FF4C51] text-[#ffffff] rounded-md text-[12.5px] font-light "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditmileStoneModal;

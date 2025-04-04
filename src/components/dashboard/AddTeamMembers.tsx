import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, X } from "lucide-react";
import avtar from "../../../public/assets/avtar.jpg";
import Image from "next/image";
import axios from "axios";
import { useParams } from "next/navigation";

interface memberInterface {
  _id: string;
  fullName: string;
  role: string;
  position: string;
  avatar: string;
}

interface AddTeamMembersProps {
  mutate: () => void;
  fromOverview: boolean;
  onClose: () => void;
  onAddMember: (newMember: memberInterface) => void;
  teamMembers: memberInterface[];
}

const AddTeamMembers: React.FC<AddTeamMembersProps> = ({
  mutate,
  fromOverview,
  onClose,
  onAddMember,
  teamMembers,
}) => {
  const [filteredMembers, setFilteredMembers] = useState<memberInterface[]>([]);
  const [search, setSearch] = useState("");
  const [membersToBeAdded, setMembersToBeAdded] = useState<memberInterface[]>([]);
  const [showUserList, setShowUserList] = useState<boolean>(false);
  const [members, setMembers] = useState<memberInterface[]>([]);
  const { id } = useParams();

  const handleSelectMember = (member: memberInterface) => {
    setMembers(prev => {
      const isExisting = prev.some(m => m._id === member._id);
      if (!isExisting) {
        return [...prev, { ...member, role: "" }];
      }
      return prev;
    });
    setShowUserList(false);
    setSearch("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowUserList(true);
    setSearch(e.target.value);
  };

  const handleRemove = async (memberId: string) => {
    const projectId = id;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/project/${projectId}/members/${memberId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      // Update local state after successful deletion
      setMembersToBeAdded(prev => prev.filter(m => m._id !== memberId));
      setMembers(prev => prev.filter(m => m._id !== memberId));
      
      // Call mutate after state updates
      mutate();
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };

  const handleRoleSelect = async (memberId: string, role: string) => {
    if (fromOverview && role === "remove") {
      await handleRemove(memberId);
      return;
    }

    if (role === "remove") {
      setMembers(prev => prev.filter(member => member._id !== memberId));
      setMembersToBeAdded(prev =>
        prev.filter(member => member._id !== memberId && member.role !== "remove")
      );
      return;
    }

    setMembersToBeAdded(prev =>
      prev.map(member => {
        if (member._id === memberId && member.role !== role) {
          const updatedMember = { ...member, role };
          setTimeout(() => onAddMember(updatedMember), 0);
          return updatedMember;
        }
        mutate()
        return member;
      })
    );
    // if(fromOverview){
    //  mutate();
    // }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (!search.trim()) {
        setFilteredMembers([]);
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/search?name=${search}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const filteredResults = response.data.filter(
          (member: memberInterface) =>
            !membersToBeAdded.some(added => added._id === member._id) &&
            !teamMembers.some(added => added._id === member._id)
        );

        setFilteredMembers(filteredResults);
        setShowUserList(true);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const delayDebounceFn = setTimeout(fetchUsers, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, membersToBeAdded, teamMembers]);

  useEffect(() => {
    // Initialize membersToBeAdded with teamMembers when component mounts
    setMembersToBeAdded(teamMembers);
  }, []); // Empty dependency array means this only runs once when component mounts

  useEffect(() => {
    // Update membersToBeAdded when members or teamMembers change
    const allMembers = [...teamMembers, ...members];
    
    const uniqueMembers = allMembers.reduce((acc: memberInterface[], current) => {
      const existingMember = acc.find(m => m._id === current._id);
      if (!existingMember) {
        return [...acc, current];
      }
      return acc;
    }, []);

    setMembersToBeAdded(uniqueMembers);
  }, [members, teamMembers]);

  return (
    <div className="fixed inset-0 flex items-center justify-center h-auto bg-black/30 overflow-y-auto no-scrollbar">
      <div className="bg-white rounded-xl h-[600px] shadow-lg w-[550px] mt-[200px] p-5 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[19px] font-medium text-[#333333]">Add Team Members</h2>
          <button onClick={onClose} className="text-[#333333] hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Area */}
        <div className="flex gap-2">
        <div className="flex relative w-[440px]">
          <div className="flex items-center w-full gap-2">
            <div className="flex flex-grow p-0.5 overflow-y-auto border-[1.5px] rounded-lg min-h-[40px] max-h-auto ">
              {members.map((member) => (
                <div key={member._id} className="flex items-center mt-0.5 gap-2 bg-[#5D56BD] rounded-full px-2">
                  <img className="w-5 h-5 rounded-full" />
                  <div className="text-xs">
                    <p className="font-medium text-[#FFFFFF] leading-none">
                      {member.fullName}
                    </p>
                  </div>
                  <button
                    onClick={() => setMembers(prev => prev.filter(m => m._id !== member._id))}
                    className="text-[#FFFFFF]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <span className="flex flex-end">
              <input
                type="text"
                placeholder="Add others by name"
                className="flex-grow px-3 py-1.5 min-w-[120px] text-sm border-none outline-none placeholder-[#B3B3B3]"
                onChange={handleInputChange}
                value={search}
              />
              </span>
            </div>
            
          </div>
        </div>
        <div><button className="bg-[#565DBD] text-[#FFFFFF] px-4 py-2.5 rounded-[8px] text-[13px]"> Add</button></div>
        </div>

        {/* Search Results */}
        <div className="relative">
          {showUserList && filteredMembers.length > 0 && (
            <div className="mt-1 absolute border-[1.5px] rounded-lg text-sm 
            w-[440px] 
            z-50 shadow-sm bg-white">
              {filteredMembers.slice(0, 5).map((member) => (
                <div key={member._id} className="flex text-[#333333] px-1">
                  <Image  src={avtar} alt={member.fullName} className="w-8 h-8 rounded-full m-2" />
                  <div
                    onClick={() => handleSelectMember(member)}
                    className="cursor-pointer px-2 py-2 hover:bg-[#F7F7FC] w-full mt-2"
                  >
                    {member.fullName}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Team Members List */}
        <div className="absolute mt-4 w-[480px] z-0">
          <div className="flex text-sm justify-between text-gray-500 mb-4 z-0">
            <span>Team members ({membersToBeAdded.length})</span>
            <span className="">Roles</span>
          </div>

          <div className="">
            {membersToBeAdded.map((member) => (
              <div key={member._id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image src={avtar} alt={member.fullName} width={36} height={36} className=" rounded-full p-0.5" />
                  <div>
                    <p className="text-[13.5px] text-[#333333]">{member.fullName}</p>
                    {/* <p className="text-xs text-gray-500">{member.position}</p> */}
                  </div>
                </div>
                <select
                  className=" py-4 text-sm rounded-lg  text-[#333333] translate-x-12"
                  value={member.role || ""}
                  onChange={(e) => handleRoleSelect(member._id, e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="client">Client</option>
                  {fromOverview && <option value="remove">Remove</option>}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeamMembers;
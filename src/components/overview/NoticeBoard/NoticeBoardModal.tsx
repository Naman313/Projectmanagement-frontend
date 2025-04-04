import React, {
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
  useEffect,

} from "react";
import Image from "next/image";
import avatar from '../../../../public/assets/avtar.jpg'
import {
  X,
  Search,
  ChevronDown,
  Check
} from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import Toast from "@/components/auth/Toast";
import TextareaBox from '../Textarea/TextareaBox';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface AddToDoModalProps {
  isOpen: boolean;
  onClose: () => void;
  messageOptions: string[];
  setMessagesOptions: Dispatch<SetStateAction<string[]>>;
  NoticeBoardData: any;   // warning for naman
  setNoticeBoardData: Dispatch<SetStateAction<any>>;
}

// const teamMembers: TeamMember[] = [
//   {
//     id: "1",
//     name: "Naman",
//     role: "Senior Project Manager",
//     avatar: "/api/placeholder/32/32",
//   },
//   {
//     id: "2",
//     name: "Taarush",
//     role: "UI/UX Designer",
//     avatar: "/api/placeholder/32/32",
//   },
//   {
//     id: "3",
//     name: "Sansdesh",
//     role: "Frontend Developer",
//     avatar: "/api/placeholder/32/32",
//   },
//   {
//     id: "4",
//     name: "Prashant",
//     role: "Frontend Developer",
//     avatar: "/api/placeholder/32/32",
//   },
//   {
//     id: "5",
//     name: "Mr. anonymous",
//     role: "UI/UX Designer",
//     avatar: "/api/placeholder/32/32",
//   },
// ];

const NoticeBoardModal = ({
  isOpen,
  onClose,
  messageOptions,
  setMessagesOptions,
  NoticeBoardData,
  setNoticeBoardData
}: AddToDoModalProps) => {
  const [selectedAssignee, setSelectedAssignee] = useState<TeamMember | null>(
    null
  );
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [notifyMembers, setNotifyMembers] = useState<TeamMember[]>(teamMembers);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [select, setSelect] = useState("");
  const [drop, setDrop] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const projectId = useParams().id;

  useEffect(() => {
    try {
      const fetchMembers = async () => {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/members`,
          {
            // params: { projectId },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // console.log(response.data.members);
        // setNotifyMembers(response.data.members);
        setTeamMembers(response.data.members);
        setNotifyMembers(response.data.members);
      };

      fetchMembers();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const filteredMembers = useMemo(() => {
    console.log(teamMembers);
    return teamMembers.filter((member) =>
      member?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleMemberClick = (member: TeamMember) => {
    setSelectedAssignee(member);
    if (!notifyMembers.some((m) => m.id === member.id)) {
      setNotifyMembers([...notifyMembers, member]);
    }
    setSearchTerm("");
  };

  const removeNotifyMember = (memberId: string) => {
    setNotifyMembers(notifyMembers.filter((member) => member.id !== memberId));
  };

  const handleMessageOptionClick = (option: string) => {
    setSelect(option);
    setDrop(false);
  };

  const handleAddCategory = async (category: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,  // Replace with actual API URL
        { category },  // Request body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,  // Include token in Authorization header
          },
        }
      );
  
      console.log("Category added successfully:", response.data);
      return response.data; // Return response for further use
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error adding category:", error.response?.data || error.message);
      } else {
        console.error("Error adding category:", error);
      }
      throw error;
    }
  }

  const handleSubmit = async () => {
    console.log("Title:", title);
    console.log(
      "Assigned To:",
      selectedAssignee ? selectedAssignee.name : "No assignee selected"
    );
    console.log(
      "Notify Members:",
      notifyMembers.map((member) => member.name)
    );
    console.log("Category:", select);
    console.log("Notes:", notes);
    
    const formData = {
      title,
      description: notes, // Assuming `notes` is the description
      category: select,
      // notifyWhenPosted: selectedAssignee ? selectedAssignee.id : null,
      notifyWhenPosted: notifyMembers.map((member) => member.id),
    
      // postedBy: userId, // Make sure to replace `userId` with the actual user ID
      comments: [], // You can initialize comments if needed, or leave empty
      project: projectId, // Replace with the actual project ID if needed
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/noticeboard`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 201) {
        toast.success("Noticeboard created successfully");
        console.log("Noticeboard created successfully:", response);
        setNoticeBoardData([...NoticeBoardData, response.data.noticeboard]);
        setTimeout(() => {
          onClose(); // Close the modal after successful creation
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };
  const [selectOption, setselectOption] = useState("null");

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  if (!isOpen) return null;

  return (
    // console.log(messageOptions),
    (
      <div className="fixed inset-0 bg-black overflow-y-auto no-scrollbar bg-opacity-25 flex items-center justify-center p-4 z-50 font-sans">
        <Toast/>
        <div className="bg-white rounded-[10px] w-[1125px] ml-2  h-[580px] mt-[238px]  pl-[10px] ">
          {/* Header */}
          <div className="flex justify-between items-center py-2 px-3">
            <h2 className="text-[19px] font-medium text-[#333333] mt-2">Add Notice Board Message</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 py-2 px-4">
            {/* Left Column */}
            <div className="space-y-1">
              {/* To-Do Description */}
              <div className="space-y-[1px] mb-4">
                <label className="text-[13.5px] font-regular text-[#333333]">
                  Message Title
                </label>
             
                <input
                  placeholder="Write title...."
                  className="w-full h-[60px] pl-2 pb-6 text-regular border border-[#CCCCCC]  text-[#333333] placeholder-[#B3B3B3] text-[13.5px] rounded-md" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
               
              </div>
              {/* Category Select */}
              <div className="relative pt-2">
                <label className="text-[13.5px] font-regular text-[#333333]">
                  Pick a category <span className="text-[#808080]">(Optional)</span>
                </label>
                <div className="absolute w-full z-50 bg-white">
                  <div className="flex flex-row w-full">
                    <button
                      className="flex flex-row w-full px-2 py-2 text-sm border border-[#CCCCCC]  rounded-md
                       bg-white text-[#333333]"
                      onClick={() => setDrop((prev) => !prev)}
                    >
                      {select || "None"}
                      <ChevronDown className="w-4 h-4 ml-auto text-[#808080]" />
                    </button>
                  </div>
                  {drop && (
                    <div>
                      {messageOptions.map((option) => (
                        <div key={option}>
                          <div
                            className="px-4 py-2 text-sm hover:bg-[#565DBD] hover:text-[white] cursor-pointer"
                            onClick={() => handleMessageOptionClick(option)}
                          >
                            {option}
                          </div>
                        </div>
                      ))}
                      <div>
                        {/* Add categories button */}
                        {!isAddingCategory && (
                          <button
                            className="px-4 text-[#5D56BD] cursor-pointer"
                            onClick={() => setIsAddingCategory(true)}
                          >
                            Add categories
                          </button>
                        )}

                        {/* Input for adding a new category */}
                        {isAddingCategory && (
                          <div className="flex items-center  border text-white p-[2px] rounded-sm">
                            <input
                              type="text"
                              className="px-4 py-2 border-gray-200 rounded-lg focus:outline-none text-[#333333]"
                              value={newCategory}
                              onChange={(e) => setNewCategory(e.target.value)}
                              placeholder="Enter new category"
                            />
                            <button
                              onClick={() => {
                                if (newCategory.trim()) {
                                  handleAddCategory(newCategory);
                                  setMessagesOptions([
                                    ...messageOptions,
                                    newCategory,
                                  ]);
                                  setNewCategory(""); // Reset input field
                                  setIsAddingCategory(false); // Close input field
                                }
                              }}
                              className="bg-[#6BBD56] text-white px-1 py-1 rounded-sm
                               hover:bg-green-600 ml-auto"
                            >
                              <Check />
                            </button>
                            <button
                              onClick={() => {
                                setNewCategory(""); // Reset input field
                                setIsAddingCategory(false); // Close input field
                              }}
                              className="bg-[#FF4c51] ml-2 px-1 py-1 text-white hover:bg-red-700"
                            >
                              <X/>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Notify Members */}
              <div className="relative space-y-1">
                <div>
                <label className="mt-[60px] block text-[13.5px] font-regular text-[#333333]">
                  When post, notify
                </label>
                <div className="mt-2">
                  <div className="absolute w-auto left-0 pl-3 flex mb-1 items-center pointer-events-none ">
                    <Search className="mt-2.5 w-4 h-4 text-[#B3B3B3] " />
                  </div>
                  <input
                    type="text"
                    placeholder="Search team member"
                    className="w-full py-2 pl-10 border rounded-md text-[13.5px] placeholder-[#B3B3B3] border-[#CCCCCC]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2 border border-[#CCCCCC] rounded-md h-[80px] translate-y-1">
                  {notifyMembers.map((member) =>(
                    <div className="pt-1 pb-1 px-1">
                    <div
                      key={member.id}
                      className="flex items-center gap-1 bg-[#5D56BD] text-white px-1 ml-1  rounded-full font-regular text-[12px] py-[2px]"
                    >
                      <Image
                        src={avatar}
                        alt="avatar"
                        width= {20}
                        height= {20}
                        className="rounded-full" />
                      <span className=" font-light text-[11px]">{member.name}</span>
                      <button
                        onClick={() => removeNotifyMember(member.id)}
                        className=" bg-[#5D56BD] rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          {/* Right Column */}
          <div className="space-y-2 mr-2">
            {/* Notes */}
            <div className="space-y-2">
              <label className="block text-[13.5px]  text-[#333333]">Message</label>
              {/* <div className="h-[800px]"> */}
              <div className="">
              <TextareaBox notes={notes} setNotes={setNotes} fromTodo={false}/>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-3 mt-3 pr-6">
            <button
              onClick={handleSubmit}
              className="px-5 py-2.5 text-white bg-[#5D56BD] rounded-lg text-[13.5px] font-light"
            >
              Post this message
            </button>
            <button
              onClick={onClose}
              className="px-7 py-1 border-[#6BBD56] border-[1.5px] text-[#6BBD56] rounded-lg font-medium text-[13.5px]"
            >
              Save as draft
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default NoticeBoardModal;

import React, { useState, useEffect } from 'react';
import { X, Link, RotateCcw, Paperclip } from 'lucide-react';
import axios from 'axios';
import { useParams } from "next/navigation";
import avtar from '../../../../public/assets/avtar.jpg'
import TextareaBox from '../Textarea/TextareaBox';
import Image from 'next/image';
import { toast } from 'react-toastify';
import Toast from '@/components/auth/Toast';
import { Search } from "lucide-react";
interface TeamMember {
  id: string;
  name: string;
  role: string;
  avtar: string;
}
interface EditTodoData{
  task: string;
  dueDate: Date;
  assignedTo: {
    _id: string;
    fullName: string;
  }
  notifyUsers:{
    _id: string;
    fullName: string;
  }
  notes: string;
}
interface AddToDoModalProps {
  isOpen: boolean;
  onClose: () => void;
  listId: string;
  todoId: string;
}
interface Assignee {
    _id?: string;
    id?: string;
    [key: string]: any; // for any other properties
  }
  const EditTodos = ({ isOpen, onClose, listId, todoId }: AddToDoModalProps) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedAssignee, setSelectedAssignee] = useState<TeamMember | null>(null);
  const { id } = useParams();
  const [notifyMembers, setNotifyMembers] = useState<TeamMember[]>([]);
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedMember, setSelectedMember] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [queryNotify, setQueryNotify] = useState("")
  const [previousData, setPreviousData]= useState<EditTodoData>();
  const handleMemberClick = (member: TeamMember) => {
    setSelectedAssignee(member);
    if (!notifyMembers.some(m => m.id === member.id)) {
      setNotifyMembers([...notifyMembers, member]);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const projectId = id;
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/members`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
        );
        setTeamMembers([...response.data.members])
        setNotifyMembers([...response.data.members])
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [id]);
  const removeNotifyMember = (memberId: string) => {
    setNotifyMembers(notifyMembers.filter(member => member.id !== memberId));
  };


  useEffect(()=>{
    const fetchTodoData=async()=>{
        // console.log( {todoId},"TodoId")
        // console.log({listId},"List Id")
        try{
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/todos/${todoId}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              )

            // console.log(response.data, "These are your Todos")
            setPreviousData(response.data);
            setDescription(response.data.task);
            if (response.data.dueDate) {
                if (typeof response.data.dueDate === 'string') {
                  setDueDate(response.data.dueDate.split('T')[0]);
                } else if (response.data.dueDate.isoString) {
                  setDueDate(response.data.dueDate.isoString.split('T')[0]);
                } else if (response.data.dueDate instanceof Date) {
                  setDueDate(response.data.dueDate.toISOString().split('T')[0]);
                }
              }
              if (response.data.assignedTo) {
                if (typeof response.data.assignedTo === 'object' && response.data.assignedTo._id) {
                  // Single assignee with _id
                  setSelectedMember([response.data.assignedTo._id]);
                  
                  // Also update selectedAssignee for display
                  const assignee = teamMembers.find(m => m.id === response.data.assignedTo._id);
                  if (assignee) setSelectedAssignee(assignee);
                } else if (Array.isArray(response.data.assignedTo)) {
                  // Array of assignees
                  setSelectedMember(response.data.assignedTo.map((a: Assignee)=> a._id || a));
                }
              }
            setSelectedAssignee(response.data.assignedTo)
            setNotes(response.data.notes)
        }
        
        
        catch(error){
            console.log("Error in fetching Todos at edit modal", error);
        }
    }
    fetchTodoData()
  },[])
  // 1. Modify your handleSubmit function:
const handleSubmit = async () => {
  if (!description) {
    toast.error("Please fill description");
    return;
  }
  
  // Create data object without nesting
  const formData = {
    todoListId: listId,
    task: description,
    projectId: id,
    dueDate,
    assignedTo: selectedMember, // This should be right if it's array of IDs
    // Convert TeamMember objects to just IDs
    notifyUsers: notifyMembers.map(member => member.id),
    notes,
  };
// console.log(formData,"This is formData")
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/editTodo/${todoId}`, 
      formData, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    onClose();
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};
  if (!isOpen) return null;

  const handleSelect = (memberId: string, memberName: string) => {
    setSelectedMember((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };
  return (
    <>
      {console.log(previousData, "Previous Data")}
      <Toast />

      <div className="z-10 fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center overflow-y-auto no-scrollbar">
        <div className="bg-white rounded-[10px] w-[1120px] h-[580px] mt-[360px] ml-4 pl-3 shadow-sm mb-32">
          {/* Header */}
          <div className="flex justify-between items-center px-2 py-3">
            <h2 className="text-[18px] text-[#333333] font-medium">Edit To-Do</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 px-2 py-3">
            {/* Left Column */}
            <div className="space-y-[20px] w-[530px] ">
              {/* To-Do Description */}
              <div className="space-y-2">
                <label className="block text-[13.5px] font-normal text-[#333333]">To-Do</label>
                <input
                  type="text"
                  placeholder="Describe..."
                  className="w-[530px] h-[62px] border rounded-lg placeholder-[#B3B3B3] text-[13.5px] px-[7px] pb-5 border-[#CCCCCC] placeholder-[12px] -translate-y-2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <label className="block text-[13.5px] text-[#333333]">Due Date</label>
                <input
                  type="date"
                  className="w-[180px] p-2 border rounded-lg border-[#CCCCCC] placeholder-[#B3B3B3] text-[13.5px] px-2   placeholder-[12px] "
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              {/* Assigned To */}
              <div className="space-y-1">
                <label className="block text-[13.5px] text-[#333333]">Assigned to</label>
                <div className="">
                  <div className="relative w-auto left-0 flex mb-1 items-center border-[#CCCCCC] border rounded-md">

                    <Search className="absolute ml-2 w-4 h-4 text-[#B3B3B3]" />
                    <input
                      type="text"
                      placeholder="Search team member"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full py-1 pl-9 h-[35px] border rounded-md text-[13.5px] placeholder-[#B3B3B3]"
                    />
                  </div>

                  <div className="w-full h-[160px] border rounded-md border-[#CCCCCC] mt-2">
                    <div className="flex flex-wrap gap-1 py-2 px-2">
                      {teamMembers.map((member, index) => (
                        <>
                          <div
                            key={member.id}
                            onClick={() => handleSelect(member.id, member.name)}
                            className={"relative flex items-center bg-[#FAFAFA] text-[#333333] gap-1.5 px-4 py-2 hover:cursor-pointer"}
                          >
                            {selectedMember.includes(member.id) && (
                              <div className="absolute top-[10px] right-0 bg-[#6BBD56] text-[#FAFAFA] text-xs rounded- w-4 h-4 flex items-center justify-center z-50">
                                <span className="text-white">✓</span>
                              </div>
                            )}
                            <Image
                              src={avtar}
                              alt={member.name}
                              width={36}
                              height={36}
                              className="rounded-full"
                            />
                            <div className="text-[12px]">
                              <p className=" text-[#333333]">{member.name}</p>
                              <p className="text-[10px] text-[#4D4D4D]">
                              ({`${member.role[0].toUpperCase()}${member.role.slice(1)}`})
                              </p>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-2 pr-4 -translate-x-1">
              {/* When done, notify */}
              <div className="space-y-2">
                <label className="text-[13.5px] text-[#333333]">When done, notify</label>
                <div className='-translate-y-2'>
                <div className="relative w-auto left-0 flex mb-1 items-center border-[#CCCCCC] border rounded-md">
                  <Search className="absolute ml-2 w-4 h-4 text-[#B3B3B3] " />
                  <input
                    type="text"
                    placeholder="Search team member"
                    value={queryNotify}
                    onChange={(e) => setQueryNotify(e.target.value)}
                    className="w-full py-1 pl-9 h-[35px] border rounded-md text-[13.5px] placeholder-[#B3B3B3]"
                  />
                </div>
                <div className="flex -space-x-2 gap-4 mt-2 border border-[#CCCCCC] rounded-md h-[80px]">
                  {notifyMembers.map((member) => (
                    <div className="p-1 py-2">
                      <div
                        key={member.id}
                        className="flex items-center gap-1 bg-[#5D56BD] text-white px-1 ml-1 rounded-full font-regular text-[13.5px] py-[1.5px]">
                        <Image
                          src={avtar}
                          alt=""
                          className="w-5 h-5 rounded-full"
                        />
                        <span className=" font-light text-[11px]">{member.name}</span>
                        <button
                          onClick={() => removeNotifyMember(member.id)}
                          className=" bg-[#5D56BD] rounded-full p-1"
                        >
                          <X className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="block text-[13.5px] text-[#333333]">Notes <span className='text-[#808080]'>(Optional)</span></label>
                <TextareaBox notes={notes} setNotes={setNotes} fromTodo={true} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-5 pr-[28px] mt-2">
            <button
              onClick={handleSubmit}
              className="px-10 py-3 font-light bg-[#5D56BD] text-white rounded-lg
               hover:bg-[#4b479c] text-[13.5px]">
              Save 
            </button>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#999999] text-white hover:bg-gray-600  rounded-lg text-[13.5px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodos;
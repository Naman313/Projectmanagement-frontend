import React, { use, useEffect, useState } from 'react';
import { Divide, MoreVertical } from 'lucide-react';
import axios from 'axios';
import Link from "next/link";
import EditIcon from "../../../../public/assets/Edit Button 03.png";
import TrashIcon from "../../../../public/assets/Trash Icon 02.png";
import { jwtDecode } from 'jwt-decode';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Check
} from "lucide-react";
import avatar from '../../../../public/assets/avtar.jpg';
import Image from 'next/image';
import Comment from "../Textarea/Comment";
import useSWR, { mutate } from 'swr';
// import { headers } from 'next/headers';
interface ToDoProps {
  isOpen: boolean;
  onClose: (state: boolean) => void;
  projectId: string | null;
  TodoId: string;
  revalidateTodos: () => void;
}

interface TodoFromBackend {
  _id: string;
  task: string;
  createdBy: {
    fullName: string;
  }
  dueDate: Date,

  assignedTo: {
    fullName: string;
  }[],
  notifyUsers: {
    fullName: string;
  }[],
  notes: string;
  comments: {
    _id: string;
    comment: string;
    commentedBy: {
      _id: string;
      fullName: string;
      role: string;
    }
    commentedOn: Date;
    createdAt: Date;
  }[],
  createdAt: Date;
  updatedAt: Date;
  status: string;
}
const ToDos: React.FC<ToDoProps> = ({ isOpen, onClose, projectId, TodoId, revalidateTodos }) => {
  // const [todoId, setTodoId] = useState<string>("")
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [isDropdownComment, setIsDropdownComment] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string>("");
  const [editCommentText, setEditCommentText] = useState<string>("");
  interface decodedToken {
    id: string;
  }
  const decoded: decodedToken = jwtDecode(`${localStorage.getItem("token")}`);
  const handleEditComment = (commentId: string, commentText: string) => {
    setEditingCommentId(commentId);
    setEditCommentText(commentText);
    setIsDropdownComment("");
  }
  const handleCancelEdit = () => {
    setEditCommentText("")
    setEditingCommentId("")
  }
  const handleEditCommentText = async (commentId: string) => {
    const todoId = TodoId;
    console.log(editCommentText, "New text")
    try {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${todoId}/${commentId}`,
        {
          newComment: editCommentText
        }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })

      mutate(apiUrl);
      revalidateTodos()
      setIsDropdownComment(null)
      setEditingCommentId("")
    } catch (error) {
      console.log("Error in editing Todos Comment ")
    }

  }
  const [todo, setTodo] = useState<TodoFromBackend>({
    _id: "",
    task: "",
    createdBy: {
      fullName: "",
    },
    dueDate: new Date(),
    assignedTo: [],
    notifyUsers: [],
    notes: "",
    comments: [],
    updatedAt: new Date(),
    status: "",
    createdAt: new Date
  });

  interface Project {
    _id: string;
    name: string;
    pinned: boolean;
    archived: boolean;
  }
  const [project, setProject] = useState<Project>({
    _id: "",
    name: "",
    pinned: false,
    archived: false,
  });
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
  }, [projectId]);
  const fetcher = async (url: string) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // setMilestoneData(response.data.milestone)
    // console.log(response.data, "These are your Todos")
    setTodo(response.data)
    return response.data;
  };

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/todos/${TodoId}`;
  const { data, error: swrError, isLoading } = useSWR(apiUrl, fetcher);
  const handleClick = () => {
    onClose(false);
    console.log(isOpen)
  }
  const handleTodoToggle = async (todoId: string | undefined, todoStatus: string | undefined) => {
    let newStatus;
    if (todoStatus === "Pending") {
      newStatus = "Completed";
    } else {
      newStatus = "Pending"
    }

    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/todos/toogleTodo/${todoId}`,
        { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
      )
      revalidateTodos()
      mutate(apiUrl)

    } catch (error) {
      console.log("Error in ToDos overview page", error)
    }
  }
  const handleDeleteTodo = async () => {
    const todoId = TodoId
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/todos/${TodoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      mutate(apiUrl);
      revalidateTodos()
      handleClick()
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  const handleDeleteTodoComment = async (commentId: string) => {
    const todoId = TodoId
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/todos/${todoId}/${commentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      mutate(apiUrl);
      revalidateTodos()
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  const handlePostComment = async () => {
    if (!comment.trim()) return;
    setLoading(true);
    const todoId = TodoId
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/todos/${TodoId}/comment`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      mutate(apiUrl);
      setComment("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error posting comment:", error.response?.data || error.message);
      } else {
        console.error("Error posting comment:", error);
      }
    } finally {
      setLoading(false);
    }

    const handleDeleteTodo = async (todoId: string, listId: string) => {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/todos/${todoId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        mutate(apiUrl)
        revalidateTodos()
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    };
  };
  if (!isOpen) return null;
  return (

    <>
      <div className="bg-[#F8F7FA] min-h-screen">
        <div className="pb-6">
          <div className="pl-2 pr-6 pb-0 mt-3 font-sans ml-[22px] ">
            <nav className="flex items-center justify-between mb-6 mt-[2px] text-[#808080] text-[13.5px]">
              <div className="flex items-center space-x-[1px]">
                <Link href="/main/dashboard" className="hover:text-gray-900">
                  Dashboard
                </Link>
                <span className="text-[#808080]"><ChevronRight width={20} height={20} strokeWidth={1.5} /></span>
                <Link href="/projects" className="hover:text-gray-900">
                  {project?.name}
                </Link>
                <span className="text-[#808080]"><ChevronRight width={20} height={20} strokeWidth={1.5} /></span>
                <span className="text-[#4D4D4D] font-medium text-[15px]">ToDos</span>
              </div>
            </nav>
          </div>
          <button
            className="flex font-sans flex-row justify-center items-center px-[13px] py-2 bg-[#5D56BD] text-white rounded-lg mx-4  ml-[28px] -translate-y-3 font-light"
            onClick={handleClick}
          >
            <ArrowLeft className="text-[13px] h-5 w-5" strokeWidth={1.5} />
            <span className="text-[13px] ml-2">Go back</span>
          </button>
          <div className="mx-4 my-2 p-4 bg-white rounded-lg  mt-7 ml-7 font-sans">
            {/* Header */}
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div className="flex-1 mt-[2px]">
                  <div className='flex p-2 gap-5  border-b border-[#000000]/20'>

                    <div onClick={() => handleTodoToggle(todo?._id, todo?.status)}>
                      {todo?.status === "Pending" ?
                        <div className='py-7 px-[30px] flex items-center justify-center bg-[#CCCBCB] text-white w-12 h-14 text-[10px] rounded-xl hover:bg-[#B5DEAB]'>Mark this Complete</div> :
                        <div className='flex items-center justify-center text-white w-[60px] h-[60px] text-[10px] rounded-xl bg-[#6BBD56]'><Check className="stroke-white text-white w-10 h-10" /></div>
                      }
                    </div>
                    <h1 className="text-[22px]  text-[#4D4D4D]">{todo.task}</h1>
                    <div className='border h-[29px] ml-auto -translate-y-2 p-[3px] '>
                      <MoreVertical className='text-[#666666] p-[2px] ' onClick={() => setIsDropdown(prev => !prev)} />
                      <div>
                        {isDropdown ? <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-300 py-1 z-[100]">

                          <button
                            className="w-full px-4 py-2 text-[15px] hover:bg-gray-100 flex items-center text-[#4D4D4D]"
                          // onClick={handleClickEdit}
                          >
                            <Image src={EditIcon} alt="Edit" width={22} height={22} className="ml-3 mr-3" />
                            Edit
                          </button>

                          {/* Proper Horizontal Line */}
                          <hr className="w-full border-gray-300 my-1" />

                          <button
                            className="w-full px-4 py-2 text-[15px] hover:bg-gray-100 flex items-center text-[#4D4D4D]"
                            onClick={handleDeleteTodo}
                          >
                            <Image src={TrashIcon} alt="logout" width={22} height={22} className=" ml-3 mr-3" />
                            Delete
                          </button>
                        </div> : <></>}

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta Information */}
              <div className="mt-4 gap-6 ml-2">
                <div className="mt-4 text-[15px] text-[#4D4D4D]">
                  Added by&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;<span className=" text-[#333333]">{todo?.createdBy.fullName}</span>
                  <span className='text-[#333333]'> on {todo?.createdAt ? new Date(todo.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }) : "No ue date"}</span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className=" text-[15px] text-[#4D4D4D]">Assigned to &nbsp;&nbsp;:&nbsp;&nbsp;</div>
                  <div className="flex -space-x-2 gap-4">
                    {todo?.assignedTo.map((member, index) => <div className="flex justify-center items-center bg-[#5D56BD] rounded-full  px-1 py-1">
                      <Image src={avatar} alt="photo" className="rounded-full" width={24} height={24} />
                      <div className="text-[11px] text-white rounded-xl pl-2 -translate-x-[6px]">{member.fullName}</div>
                    </div>
                    )}

                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <span className="text[15px] text-[#4D4D4D]">When doen, notify &nbsp;&nbsp;:&nbsp;&nbsp;</span>
                  <div className="flex -space-x-2 gap-4">
                    {todo?.notifyUsers.map((watcher, index) => (
                      <div className="flex justify-center items-center bg-[#5D56BD] rounded-full  px-1 py-1">
                        <Image src={avatar} alt="photo" className="rounded-full" width={24} height={24} />
                        <div className="text-[11px] text-white rounded-xl pl-2 -translate-x-[6px]">{watcher.fullName}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <span className="text-[15px] text-[#4D4D4D]">Due date &nbsp;&nbsp;:&nbsp;&nbsp;</span>
                  <span className="text-sm ">{todo?.dueDate ? new Date(todo.dueDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }) : "No ue date"}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="flex mb-6">
              <h2 className="text-[15px] text-[#333333] mb-2 ml-2">Note&nbsp;&nbsp;:&nbsp;&nbsp;</h2>
              <p className="list-disc pl-5 space-y-1">

                <span className="text-sm text-gray-600">{todo?.notes}</span>

              </p>
            </div>

            {/* Comments */}

          </div>
          <div className="ml-[26px] my-4 bg-white p-4 rounded-lg mt-6 w-[1020px] ">
            <div className="">
              <h2 className="text-[19px] font-medium text-[#333333] mb-4">Comments</h2>
              {/* Comment Input */}
              <div>
                <div className="mt-9 flex gap-3">
                  <Image src={avatar} alt="avatar" className="w-12 h-12 rounded-full" width={48} height={48} />
                  <div className="flex flex-grow">
                    <Comment notes={comment} setNotes={setComment} fromTodo={false} />
                  </div>
                </div>
                <button
                  onClick={handlePostComment}
                  className="px-8 py-2 bg-[#5D56BD] text-white rounded-lg ml-[890px] mt-4 text-[12px]"
                  disabled={loading}
                >
                  {loading ? "Posting..." : "Send"}
                </button>
              </div>
            </div>
            {/* Display Comments */}
            <div className="space-y-4 mt-6 ml-2">
              {todo?.comments && todo.comments.length > 0 ? (
                todo.comments.map((comment, index) => (
                  <div key={index} className="gap-3 border-t-[1.5px] border-[#CCCCCC] pt-6 ">
                    <div className="flex">
                      <div className="flex">
                        <Image src={avatar} alt="avatar" className="rounded-full" width={48} height={48} />
                        <div className="flex-1 ml-[20px]">
                          <div className="flex items-center gap-2 text-[#333333]">
                            <span className="font-medium text-[16px]">{comment.commentedBy.fullName}</span>
                            <div className="text-[17px] font-medium">({comment.commentedBy.role})</div>
                          </div>
                          <div className="text-[13.5px] text-[#666666] mb-1">
                            {new Date(comment.commentedOn).toLocaleDateString("en-GB", {
                              weekday: "short",
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}{" "}
                          </div>
                        </div>
                      </div>
                      <div className=''>

                        {comment.commentedBy._id === decoded.id ?
                          <div className="ml-[710px] border h-[29px] -translate-x-3 -translate-y-2 p-[3px]"><MoreVertical
                            className='text-[#666666] p-[2px] cursor-pointer'
                            onClick={() => setIsDropdownComment(isDropdownComment === comment._id ? null : comment._id)}
                          /></div> : <></>}
                        <div>
                          {isDropdownComment ? <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-300 py-1 z-[100]">

                            <button
                              className="w-full px-4 py-2 text-[15px] hover:bg-gray-100 flex items-center text-[#4D4D4D]"
                              onClick={() => handleEditComment(comment._id, comment.comment)}
                            >
                              <Image src={EditIcon} alt="Edit" width={22} height={22} className="ml-3 mr-3" />
                              Edit
                            </button>

                            <hr className="w-full border-gray-300 my-1" />

                            <button
                              className="w-full px-4 py-2 text-[15px] hover:bg-gray-100 flex items-center text-[#4D4D4D]"
                              onClick={() => handleDeleteTodoComment(comment._id)}
                            >
                              <Image src={TrashIcon} alt="logout" width={22} height={22} className=" ml-3 mr-3" />
                              Delete
                            </button>
                          </div> : <></>}

                        </div>
                      </div>
                    </div>
                    {editingCommentId === comment._id ? <div className="ml-[70px] mt-2 flex flex-col">
                      <textarea
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D56BD]"
                      />
                      <div className="flex justify-end mt-2 space-x-2">
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 text-[12px] border border-gray-300 rounded-lg text-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleEditCommentText(comment._id)}
                          className="px-8 py-2 bg-[#5D56BD] text-white rounded-lg text-[12px]"
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>
                      </div>
                    </div> : <p className="text-[15px] text-[#333333] ml-[70px] mt-2">{comment.comment}</p>}
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDos;
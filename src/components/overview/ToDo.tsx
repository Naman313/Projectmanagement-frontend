'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Divide, Plus, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import AddToDoModal from './ToDo/AddToDoModal';
import ToDos from './ToDo/ToDos';
import useSWR, { mutate } from 'swr';
import avatar from '../../../public/assets/avtar.jpg'
import Link from 'next/link';
import EditIcon from "../../../public/assets/Edit Button 03.png";
import TrashIcon from "../../../public/assets/Trash Icon 02.png"
import DeleteIcon from "../../../public/assets/Trash Icon.png";
import EditButton from "../../../public/assets/Edit Button.png";
import EditTodos from './ToDo/EditTodos';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { MoreVertical } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Task {
  _id: string;
  description: string;
  createdBy: string;
  Task: string;
  dueDate: string;
  completed: boolean;
}

interface TodoList {
  _id: string;
  title: string;
  items: Task[];
}

interface Project {
  _id: string;
  name: string;
  pinned: boolean;
  archived: boolean;
}

interface TodosByStatus {
  [listId: string]: {
    pending: Task[];
    completed: Task[];
  }
}

export default function ToDo() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [isTodoModal, setTodoModal] = useState(false);
  const [openTodo, setOpenTodo] = useState(false);
  const [selectedListId, setSelectedListId] = useState<string>('');
  const [todosByStatus, setTodosByStatus] = useState<TodosByStatus>({});
  const { id: projectId } = useParams();
  const [TodoId, setTodoId] = useState("")
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [listTitle, setListTitle] = useState<string>("");
  const [todoEdited, setTodoEdited]= useState("");
  const [project, setProject] = useState<Project>({
    _id: "",
    name: "",
    pinned: false,
    archived: false,
  });
  const token = localStorage.getItem("token");

  // Fetch todo lists
  const fetchTodoLists = async (url: string, token: string | null) => {
    if (!token) return [];
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching todo lists:", error);
      throw error;
    }
  };

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

  const { data: todoLists = [], error } = useSWR<TodoList[]>(
    token ? [`${API_URL}/todolists/${projectId}`, token] : null,
    ([url, token]) => fetchTodoLists(url, localStorage.getItem('token')),
    {
      revalidateOnFocus: false,
      dedupingInterval: 2000
    }
  );

  // Fetch todos for each list and organize by status
  const { data: todos = {} } = useSWR<Record<string, Task[]>>(
    token && todoLists.length > 0 ? ['todos', todoLists.map(list => list._id), token] : null,
    async () => {
      const results: Record<string, Task[]> = {};
      await Promise.all(
        todoLists.map(async (list) => {
          try {
            const response = await axios.get(`${API_URL}/todos/list/${list._id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            results[list._id] = response.data.map((todo: any) => ({
              _id: todo._id,
              description: todo.notes || 'No Description',
              createdBy: todo.createdBy.fullName || "",
              Task: todo.task || " ",
              dueDate: todo.dueDate,
              completed: todo.status === 'Completed'
            }));

            // Organize todos by status
            const newTodosByStatus = { ...todosByStatus };
            newTodosByStatus[list._id] = {
              pending: results[list._id].filter(todo => !todo.completed),
              completed: results[list._id].filter(todo => todo.completed)
            };
            setTodosByStatus(newTodosByStatus);
          } catch (error) {
            console.error('Error fetching todos:', error);
            results[list._id] = [];
          }
        })
      );
      return results;
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 2000
    }
  );

  const handleCreateList = async () => {
    if (!newListName.trim()) return;
    try {
      await axios.post(
        `${API_URL}/todolists`,
        { title: newListName, projectId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      mutate([`${API_URL}/todolists/${projectId}`, token]);
      setNewListName('');
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating todo list:', error);
    }
  };

  const handleSaveEditTitle = async (todoListId: string) => {
    // console.log(listTitle,"list New name")
    try {
      const res = await axios.put(`${API_URL}/todolists/${todoListId}`,
        { title: listTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSelectedListId("")
      setIsEditTodos("")
      const updatedTodoLists = todoLists.map(list =>
        list._id === todoListId ? { ...list, title: listTitle } : list
      );
      mutate([`${API_URL}/todolists/${projectId}`, token])
      setIsEditTodos("")
      setTodoEdited("")
    }
    catch (error) {
      console.log("Error in updating Todos Name");
    }
  }
  const toggleTaskCompletion = async (todoId: string, listId: string, currentStatus: boolean) => {
    try {
      const newStatus = currentStatus ? 'Pending' : 'Completed';
      await axios.patch(
        `${API_URL}/todos/toogleTodo/${todoId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state
      const updatedTodosByStatus = { ...todosByStatus };
      const todo = [...updatedTodosByStatus[listId].pending, ...updatedTodosByStatus[listId].completed]
        .find(t => t._id === todoId);

      if (todo) {
        if (currentStatus) {
          // Moving from completed to pending
          updatedTodosByStatus[listId].completed = updatedTodosByStatus[listId].completed.filter(t => t._id !== todoId);
          updatedTodosByStatus[listId].pending.push({ ...todo, completed: false });
        } else {
          // Moving from pending to completed
          updatedTodosByStatus[listId].pending = updatedTodosByStatus[listId].pending.filter(t => t._id !== todoId);
          updatedTodosByStatus[listId].completed.push({ ...todo, completed: true });
        }
        setTodosByStatus(updatedTodosByStatus);
      }

      mutate([`${API_URL}/todolists/${projectId}`, token]);
      mutate(['todos', todoLists.map(list => list._id), token]);
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };
  const handleDeleteList = async (listId: string) => {
    const todoListId = listId;
    try {
      const res = await axios.delete(`${API_URL}/todolists/${todoListId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      mutate([`${API_URL}/todolists/${projectId}`, token])
    }
    catch (error) {
      console.log("Error in updating Todos Name");
    }
  }
  const handleDeleteTodo = async (todoId: string, listId: string) => {
    try {
      await axios.delete(`${API_URL}/todos/${todoId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updatedTodosByStatus = { ...todosByStatus };
      updatedTodosByStatus[listId].pending = updatedTodosByStatus[listId].pending.filter(t => t._id !== todoId);
      updatedTodosByStatus[listId].completed = updatedTodosByStatus[listId].completed.filter(t => t._id !== todoId);
      setTodosByStatus(updatedTodosByStatus);

      mutate([`${API_URL}/todolists/${projectId}`, token]);
      mutate(['todos', todoLists.map(list => list._id), token]);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  const [todoIdForOverview, setTodoIdForOverview] = useState<string>("")
  const handleTodoClick = (TodoId: string) => {
    // console.log(TodoId,"TodoId from overview")
    setTodoIdForOverview(TodoId);
    setOpenTodo(true)
  }

  const [isEditTodos, setIsEditTodos] = useState<string>("");
  const [listNewNamem, setListNewName] = useState<string>("");
  const handleTodoClickVertical= (listId: string)=>{
    
   todoEdited=== "" ? setTodoEdited(listId): setTodoEdited("")
  }

  const [isEditModal, setIsEditModal]= useState(false);
  const handleEditTodo=(todoId: string, listId: string)=>{
    // console.log(listId, todoId)
    setTodoId(todoId);
    setIsEditModal(true);
  }
  const handleClickEdit = (listId: string, listTitle: string) => {
    // console.log("Button clicked")
    setListTitle(listTitle)
    if (!isEditTodos.includes(listId)) {
      setIsEditTodos(listId);
    }
  };
  return (
    <>
      {openTodo ?
        <ToDos isOpen={openTodo} onClose={() => setOpenTodo(false)} projectId={typeof projectId === "string" ? projectId : null} TodoId={todoIdForOverview}
          revalidateTodos={() => {
            mutate([`${API_URL}/todolists/${projectId}`, token]);
            mutate(['todos', todoLists.map(list => list._id), token]);
          }} /> :
        <div className="h-screen bg-[#F8F7FA] flex flex-col font-sans">
          <div className="pl-7 pr-6 pb-0 mt-2">
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
                <span className="text-[#4D4D4D] font-medium text-[15px]">ToDo's</span>
              </div>
            </nav>
          </div>
          <div className="px-8 py-[2px]">
            <button
              className="flex items-center font-regular text-[12px] px-[20px] py-2 bg-[#5D56BD] text-white rounded-lg"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="h-5 w-5 mr-2" strokeWidth={2} /> Create List
            </button>

            {isTodoModal && (
              <AddToDoModal
                isOpen={isTodoModal}
                onClose={() => {
                  setTodoModal(false);
                  mutate([`${API_URL}/todolists/${projectId}`, token]);
                  mutate(['todos', todoLists.map(list => list._id), token]);
                }}
                listId={selectedListId}
              />
            )}
            {isEditModal && (<EditTodos isOpen={isEditModal} onClose={() => {
                  setIsEditModal(false);
                  mutate([`${API_URL}/todolists/${projectId}`, token]);
                  mutate(['todos', todoLists.map(list => list._id), token]);
                }}
                listId={selectedListId}
                todoId= {TodoId}/>)}
            {isCreateModalOpen && (
              <div className="bg-white mt-9 px-4 py-2 rounded-xl w-[1010px]">
                <div className="flex items-center justify-between pr-3">
                  <div className="text-[18.5px] font-medium mt-2">Create list</div>
                  <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="w-3/4">
                    <div className='text-[#333333] text-[13.5px]'>List Name</div>
                    <input
                      type="text"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleCreateList();
                        }
                      }}
                      className="w-[525px] text-[#333333] border-[1px] text-[13.5px] border-[#CCCCCC] placeholder-[#B3B3B3] rounded-md p-2 mb-2 h-10 mt-1"
                      placeholder="Enter list name...."
                    />
                  </div>
                  <button
                    className="py-[9px] ml-auto px-8 bg-[#5D56BD] text-white rounded-lg flex items-center text-[13.5px] font-normal"
                    onClick={handleCreateList}
                  >
                    Create
                  </button>
                </div>
              </div>
            )}

            {todoLists.length > 0 ? (
              <div className="mt-7 px-1 py-2">
                {todoLists.map((list, index) => (
                  <div key={index}>
                    {isEditTodos.includes(list._id) ?
                      <div key={list._id} className="bg-white px-2 py-[3px] rounded-xl mt-1 mb-2 w-[1010px]">
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center">
                            <input
                              type="text"
                              className="text-[#333333] text-[14px] border rounded px-3 py-2 border-[#CCCCCC] w-[500px]"
                              value={listTitle}
                              onChange={(e) => setListTitle(e.target.value)}
                            />

                          </div>
                          <div className='flex gap-4 mr-3'>
                            <button
                              className="flex items-center text-[11.5px] px-[30px] py-[5px] bg-[#5D56BD] text-white rounded-[4px] font-normal"
                              onClick={() => {
                                handleSaveEditTitle(list._id);
                              }}
                            >
                              Save
                            </button>
                            <button
                              className="flex items-center text-[11.5px] px-[5px] py-[5px] border border-[#CCCCCC] text-white rounded-[4px] font-normal"
                              onClick={() => {
                                handleDeleteList(list._id);
                              }}
                            >
                              <Image src={DeleteIcon} alt="Delete" className='w-5 h-5' />
                            </button>
                          </div>
                        </div>

                        {/* Rest of your todo list content */}
                        <div className="mt-4">
                          {todosByStatus[list._id]?.pending.length > 0 ? <div>
                            <h4 className="font-regular text-[#808080] mb-2 text-[13.5px]">
                              Pending ({todosByStatus[list._id].pending.length || 0})
                            </h4></div> : <div></div>}
                          {todosByStatus[list._id]?.pending.map(task => (
                            <div className='flex'>
                            <div key={task._id} className="flex items-center gap-4 p-4 bg-[#FAFAFA] "
                              onClick={() => handleTodoClick(task._id)}>
                              <div className="flex-grow">
                                <p className="text-[12.5px] font-sans text-[#333333]">{task.Task}</p>
                                <div className="flex text-sm text-gray-500 mt-1">
                                  <span className='rounded-full'><Image src={avatar} width={18} height={18} alt="user" className='rounded-full' /></span>
                                  <span className='text-[#4D4D4D] text-[12.5px] ml-2'>{task?.createdBy}</span>
                                  {" "} <span className='text-[#4D4D4D] text-[12.5px] ml-9'> <span className='font-light'>Due date:</span> {new Date(task.dueDate).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                  })}</span>
                                </div>
                              </div>
                              
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEditTodo(task._id, list._id)}>
                                  <Image alt="edit" src={EditButton} width={16} height={16} />
                                </button>
                                <button onClick={() => handleDeleteTodo(task._id, list._id)}>
                                  <Image alt="delete" src="/assets/myProjects/Trash Icon.png" width={16} height={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4">
                          {todosByStatus[list._id]?.completed.length > 0 ? <div>
                            <h4 className=" text-[#808080] mb-2 text-[13.5px]">
                              Completed({todosByStatus[list._id]?.completed.length || 0})
                            </h4></div> : <div></div>}

                          {todosByStatus[list._id]?.completed.map(task => (
                            <div key={task._id} className="flex items-center gap-4 p-4 bg-[#FAFAFA]"
                              onClick={() => handleTodoClick(task._id)}>
                              <div className="flex-grow">
                                <p className="text-[12.5px] font-sans text-[#333333]">{task.Task}</p>
                                <div className="flex text-sm text-gray-500 mt-1">
                                  <span className='rounded-full'><Image src={avatar} width={18} height={18} alt="user" className='rounded-full' /></span>
                                  <span className='text-[#4D4D4D] text-[12.5px] ml-2'>{task?.createdBy}</span>
                                  {" "} <span className='text-[#4D4D4D] text-[12.5px] ml-9'> <span className='font-light'>Due date:</span> {new Date(task.dueDate).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                  })}</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => handleEditTodo(task._id, list._id)}>
                                  <Image alt="edit" src={EditButton} width={16} height={16} />
                                </button>
                                <button onClick={() => handleDeleteTodo(task._id, list._id)}>
                                  <Image alt="delete" src="/assets/myProjects/Trash Icon.png" width={16} height={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      :
                      <div key={list._id} className="bg-white px-2 py-[3px] rounded-xl mt-1 mb-4 w-[1010px]">
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center text-[#333333] font-medium text-[18px]">
                            {list.title}
                            <span className='text-[#808080] text-[15px] ml-2 font-normal'>{todosByStatus[list._id]?.completed.length || 0}/{todosByStatus[list._id]?.completed.length + todosByStatus[list._id]?.pending.length || 0}</span>
                          </div>
                          <div className='flex gap-4'>
                            <button
                              className="flex items-center text-[11.5px] px-[14px] py-[5px] bg-[#5D56BD] text-white rounded-[4px] font-normal"
                              onClick={() => {
                                setSelectedListId(list._id);
                                setIsEditTodos("")
                                setTodoModal(true);
                              }}
                            >
                              <Plus className="mr-2" strokeWidth={1} /> Add To-Do
                            </button>
                            {/* {userId===currentUser } */}
                            <div className='border h-[32px] ml-auto mr-2 p-[3px] '>
                              <MoreVertical className='text-[#666666] p-[2px] shadow-sm' onClick={() => handleTodoClickVertical(list._id)} />
                              <div>
                                {todoEdited===list._id ? <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-300 py-1 z-[100] -translate-x-6">
                                  <button
                                    className="w-full px-4 py-2 text-[15px] hover:bg-gray-100 flex items-center text-[#4D4D4D]"
                                    onClick={() => handleClickEdit(list._id, list.title)}
                                  >
                                    <Image src={EditIcon} alt="Edit" width={22} height={22} className="ml-3 mr-3" />
                                    Edit
                                  </button>
                                  {/* Proper Horizontal Line */}
                                  <hr className="w-full border-gray-300 my-1" />

                                  <button
                                    className="w-full px-4 py-2 text-[15px] hover:bg-gray-100 flex items-center text-[#4D4D4D]"
                                    onClick={() => handleDeleteList(list._id)}
                                  >
                                    <Image src={TrashIcon} alt="logout" width={22} height={22} className=" ml-3 mr-3" />
                                    Delete
                                  </button>
                                </div> : <></>}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          {todosByStatus[list._id]?.pending.length > 0 ? <div>
                            <h4 className="font-regular text-[#808080] mb-2 text-[13.5px]">
                              Pending ({todosByStatus[list._id].pending.length || 0})
                            </h4></div> : <div></div>}
                          {todosByStatus[list._id]?.pending.map(task => (
                            <div className='flex'>
                            <div key={task._id} className="flex items-center gap-4 p-4 bg-[#FAFAFA]"
                              onClick={() => handleTodoClick(task._id)}>
                              <div className="flex-grow">
                                <p className="text-[12.5px] font-sans text-[#333333]">{task.Task}</p>
                                <div className="flex text-sm text-gray-500 mt-1">
                                  <span className='rounded-full'><Image src={avatar} width={18} height={18} alt="user" className='rounded-full' /></span>
                                  <span className='text-[#4D4D4D] text-[12.5px] ml-2'>{task?.createdBy}</span>
                                  {" "} <span className='text-[#4D4D4D] text-[12.5px] ml-9'> <span className='font-light'>Due date:</span> {new Date(task.dueDate).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                  })}</span>
                                </div>
                              </div>
                              
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEditTodo(task._id, list._id)}>
                                  <Image alt="edit" src={EditButton} width={16} height={16} />
                                </button>
                                <button onClick={() => handleDeleteTodo(task._id, list._id)}>
                                  <Image alt="delete" src="/assets/myProjects/Trash Icon.png" width={16} height={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4">
                          {todosByStatus[list._id]?.completed.length > 0 ? <div>
                            <h4 className=" text-[#808080] mb-2 text-[13.5px]">
                              Completed({todosByStatus[list._id]?.completed.length || 0})
                            </h4></div> : <div></div>}

                          {todosByStatus[list._id]?.completed.map(task => (
                            <div className='flex'>
                            <div key={task._id} className="flex items-center gap-4 p-4 bg-[#FAFAFA]"
                              onClick={() => handleTodoClick(task._id)}>
                              <div className="flex-grow">
                                <p className="text-[12.5px] font-sans text-[#333333]">{task.Task}</p>
                                <div className="flex text-sm text-gray-500 mt-1">
                                  <span className='rounded-full'><Image src={avatar} width={18} height={18} alt="user" className='rounded-full' /></span>
                                  <span className='text-[#4D4D4D] text-[12.5px] ml-2'>{task?.createdBy}</span>
                                  {" "} <span className='text-[#4D4D4D] text-[12.5px] ml-9'> <span className='font-light'>Due date:</span> {new Date(task.dueDate).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                  })}</span>
                                </div>
                              </div>
                              
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => handleEditTodo(task._id, list._id)}>
                                  <Image alt="edit" src={EditButton} width={16} height={16} />
                                </button>
                                <button onClick={() => handleDeleteTodo(task._id, list._id)}>
                                  <Image alt="delete" src="/assets/myProjects/Trash Icon.png" width={16} height={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    }
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex justify-center items-center mt-[146px] ml-12'>
                {isCreateModalOpen ? <div></div> : <div className="flex flex-col items-center justify-center py-8">
                  <Image
                    src="/assets/ToDo Illustration.png"
                    alt="Empty Status"
                    width={182}
                    height={182}
                  />
                  <p className='text-[#4d4d4d] font-regular text-[15px] mr-8 my-4'>No To-Do's</p>
                  <button
                    className="flex items-center px-6 py-2 bg-[#5D56BD] mr-6 text-white text-[13.5px] rounded-lg"
                    onClick={() => setIsCreateModalOpen(true)}
                  >
                    Create your first To-Do List
                  </button>
                </div>}
              </div>
            )}
          </div>
        </div>}

    </>
  );
}
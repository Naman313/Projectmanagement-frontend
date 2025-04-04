import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Toast from '../auth/Toast';
import {toast} from 'react-toastify'
import edit from '../../../public/assets/Edit Icon.png';
import Image from 'next/image';
interface ProjectFormData {
  name: string;
  category: string;
  description: string;
  collaboration: string;
}

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isOpen,
  onClose,
}) => {



  const defaultValues: ProjectFormData = {
    name: 'Project Atlas',
    category: 'development',
    description: 'Project Atlas aims to develop an innovative project management tool designed to streamline workflows and enhance team collaboration.',
    collaboration: 'Collaboration is at the heart of Project Atlas, ensuring seamless teamwork and communication.',
  };

  const [formData, setFormData] = useState<ProjectFormData>(defaultValues);
  const { id } = useParams();
  const router = useRouter();

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
        console.log(response.data)
        setFormData({
          name: response.data.name,
          category: response.data.category,
          description: response.data.description,
          collaboration: response.data.collaboration,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Saving:', formData);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/project/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
    onClose();
  };

  const showDeleteConfirmation = () => {
    // Create a custom toast with OK and Cancel buttons
    toast(
      <div>
        <h3 className="font-medium text-gray-900">Are you sure?</h3>
        <p className="text-sm text-gray-500">Do you really want to delete this milestone?</p>
        <div className="mt-4 flex justify-between items-center">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
            onClick={() => toast.dismiss()} // Dismiss the toast on cancel
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={() => {
              handleDelete();
              toast.dismiss(); // Dismiss the toast after deletion
            }}
          >
            OK
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false, // Prevent auto-close for confirmation
        closeButton: false, // Hide the close button
        draggable: false,
        theme: "light",
      }
    );
  };
  const handleDelete = async () => {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/project/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        router.push("/main/dashboard");
      } catch (error) {
        console.error(error);
      }
      onClose();
    }

  if (!isOpen) return null;

  return (
    <>
    <Toast/>
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 overflow-y-auto no-scrollbar">
      <div className="bg-white rounded-xl shadow-2xl w-11/12 h-[570px] relative mt-[250px] ml-2">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 hover:bg-gray-200 p-2 rounded-full"
          type="button"
          aria-label="Close modal"
        >
          <X className="h-6 w-6 text-gray-500" />
        </button>
        {/* Modal Content */}
        <h2 className="text-[19px] font-medium text-[#333333] mb-6 pl-5 pt-5">Edit Project</h2>
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-20 h-20 bg-[#F09B83] rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-xl font-medium">{`${formData.name.charAt(0).toUpperCase()+formData.name.charAt(1).toUpperCase()}`}</span>
            
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#565DBD] rounded-full flex items-center justify-center">
                      <Image src={edit} alt="pencil" width={16} height={16} />
                    </button>
          </div>
          <div className='text-[#333333] text-[13.5px]'>Project Image</div>
        </div>
        <div className="p-8">
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[13.5px]  text-[#333333] mb-1">
                  Project Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-2 py-2 border border-[#CCCCCC] rounded-md text-[#333333] text-[13.5px] "
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
               
              <div>
                <label htmlFor="description" className="block text-[13.5px] text-[#333333] mb-1">
                  About Project 
                </label>
                <textarea
                  id="description"
                  className="w-full px-3 py-2 border border-[#CCCCCC] rounded-md text-[#333333] font-light text-[13.5px] min-h-[150px]"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label htmlFor="category" className="block text-[13.5px] text-[#333333] mb-1">
                  Project Category
                </label>
                <select
                  id="category"
                  className="w-[530px] pl-2 py-2 border border-[#CCCCCC] rounded-md text-[#333333] text-[13.5px]"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="development">Project Development</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Mobile">Mobile Development</option>
                  <option value="Web">Web Development</option>
                  <option value="CRM">Customer Relationship Management (CRM)</option>
                  <option value="ERP">Enterprise Resource Planning (ERP)</option>
                  <option value="AI">Artificial Intelligence (AI)</option>
                </select>
              </div>

              <div>
                <label htmlFor="collaboration" className="block text-[13.5px] text-[#333333] mb-1">
                  How we collaborate?
                </label>
                <textarea
                  id="collaboration"
                  className="w-[530px]  px-3 py-2 border border-[#CCCCCC] font-light text-[13.5px] rounded-md min-h-[150px]"
                  value={formData.collaboration}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex justify-end gap-4 text-[13px] -translate-y-2 translate-x-5">
              <button
                  type="submit"
                  className="px-8 py-3 text-white bg-[#5D56BD] rounded-lg "
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={showDeleteConfirmation}
                  className="px-8 py-3 text-white bg-[#FF4C51] rounded-lg "
                >
                  Delete Project
                </button>
                
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default EditProjectModal;

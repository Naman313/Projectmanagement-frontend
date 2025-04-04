import { useState } from "react";
import { X, Plus, Camera, Pencil } from "lucide-react";
import AddTeamMembers from "./AddTeamMembers";
import AddMilestone from "./AddMilestone";
import axios from "axios";
import Toast from "../auth/Toast";
import { toast } from "react-toastify";
import avtar from '../../../public/assets/avtar.jpg'
import edit from '../../../public/assets/Edit Button modal.png'
import Image from 'next/image'
import circlePlus from '../../../public/assets/Plus Icon Manage Team.png'
interface TeamMember {
  _id: string;
  fullName: string;
  role: string;
  position: string;
  avatar: string;
}

interface Milestone {
  _id: number;
  description: string;
  assignedTo: string;
  dueDate: string;
}

interface CreateNewProjectProps {
  onClose: () => void;
  onProjectCreated: () => void;
}

const CreateNewProject: React.FC<CreateNewProjectProps> = ({ onClose, onProjectCreated }) => {

  const [projectName, setProjectName] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [aboutProject, setAboutProject] = useState("");
  const [collaboration, setCollaboration] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const fromOverview = false;
  const handleAddMember = (newMember: TeamMember) => {
    setTeamMembers((prev) => {
      const extingIndex = prev.findIndex(
        (member) => member._id === newMember._id
      );
      if (extingIndex !== -1) {
        if (newMember.role === "Select Role") {
          toast.error("Please select a valid role");
        }
        const updatedList = [...prev];
        updatedList[extingIndex] = {
          ...updatedList[extingIndex],
          role: newMember.role,
        };
        return updatedList;
      }
      return [...prev, newMember];
    });
    // setTeamMembers((prev)=> [...prev, newMember])
  };
  const [milestones, setmileStone] = useState<Milestone[]>([]);
  const [isAddTeamMemberModalOpen, setAddTeamMemberModalOpen] = useState(false);
  const [isAddMilestone, setAddMilestone] = useState(false);

  const handleClick = async () => {

    if (!projectName || !projectCategory || !aboutProject || !collaboration || teamMembers.length === 0) {
      toast.error("Please fill all required fields and add at least one team member.");
      return;
    }
    const projectData = {
      name: projectName,
      category: projectCategory,
      description: aboutProject,
      collaboration,
      members: teamMembers.map((member) => ({
        id: member._id,
        name: member.fullName,
        role: member.role,
      })),
      milestones: milestones.map((milestone) => ({
        title: milestone.description,
        assignedTo:
          teamMembers.find((member) => member.fullName === milestone.assignedTo)
            ?._id || null,
        dueDate: milestone.dueDate,
      })),
      private: false, // Set any default values as needed
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/create`,
        projectData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status == 201) {

        onProjectCreated()
        onClose();

      }
    } catch (error) {
      console.error("Failed to create project:", error);
    }

    // console.log("Project Data:", projectData);
  };

  return (
    <>
      <Toast />
      <div className="fixed overflow-y-auto no-scrollbar inset-0 flex items-center justify-center bg-black/25 z-50">
        <div className="bg-white translate-x-[6px] rounded-xl w-[1125px] h-[625px] mt-[450px] mb-[200px] flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center px-[22px] py-6">
            <h2 className="text-[19px] text-[#333333] font-medium">Create New Project</h2>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 -mt-2">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4 col-span-1">
                <div className="flex flex-col items-center mt-[5px]">
                  <div className="relative mb-1">
                    <div className="w-[75px] h-[75px] bg-[#e6e6e6] rounded-full flex items-center justify-center border border-gray-200">

                      <Camera className="w-[26px] h-8 text-[#B3B3B3]" strokeWidth={1} />
                    </div>
                    <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#565DBD] rounded-full flex items-center justify-center">
                      {/* <Pencil className="w-4 text-white" /> */}
                      <Image src={edit} alt="pencil" width={36} height={36} />
                    </button>
                  </div>
                  <span className="text-[13.5px] text-[#333333] mt-3">Project Image</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[#333333] text-[14px] pt-[4px]">
                  <div>
                    <label className="block mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter project name"
                      className="w-full h-[37px] px-2 rounded border-[1.5px]  border-gray-200 text-[14px] placeholder-[#B3B3B3]"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>
                  <div className="">
                    <label className="block mb-1">
                      Project Category
                    </label>
                    <select
                      className="w-full h-[37px] px-2 rounded border-[1.5px] border-gray-200
                       placeholder-[#B3B3B3] text-[14px] text-[#B3B3B3]"
                      value={projectCategory}
                      onChange={(e) => setProjectCategory(e.target.value)}
                    >
                      <option value="" disabled hidden className="text-[#B3b3b3]">
                        Select Project Category
                      </option>
                      <option value="Product">Product Development</option>
                      <option value="Customer">
                        Customer Relation Manager (CRM)
                      </option>
                      <option value="Enterprise">
                        Enterprise Resource Planning (ERP)
                      </option>
                      <option value="AI">Artificial Intelligence (AI)</option>
                      <option value="DevOps">DevOps</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Development">Mobile Development</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                    </select>
                  </div>
                </div>

                {/* Team Members Box */}
                <div>
                  <label className="block text-[13.5px] mb-1 mt-[22px]">
                    Team Members
                  </label>
                  <div className="border border-gray-200 rounded p-2 overflow-y-auto h-[180px]">
                    <div className="flex flex-wrap gap-6">
                      {teamMembers.map((member) => (
                        <div
                          key={member._id}
                          className="flex items-center bg-[#FAFAFA] text-[#333333] gap-1.5  p-1 hover:bg-gray-200 hover:rounded-sm"
                        >
                          <Image
                            src={avtar}
                            alt="Avatar"
                            className="rounded-full"
                            width={36}
                            height={36}
                          />
                          <div className="text-[12px] text-[#333333]">
                            <p className="">
                              {member.fullName}
                            </p>
                            <p className="text-[10px] leading-tight">
                              {member.role}
                            </p>
                          </div>
                          <div className="relative group">
                            <button
                              onClick={() =>
                                setTeamMembers((prev) => prev.filter((tm) => tm._id !== member._id))
                              }
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-white hover:bg-[#FF4c51] -translate-y-2 p-1 mt-1 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center pt-2">
                    <button
                      type="button"
                      className="px-[25px] py-[10px] rounded-lg bg-[#5D56BD] text-white 
                      hover:bg-[#4A44A7] text-[11.5px] flex items-center gap-2 font-normal"
                      onClick={() => setAddTeamMemberModalOpen(true)}
                    >
                      <Image src={circlePlus} alt="add member" className="w-[33px] h-[33px]" />Add Member
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4 col-span-1 mt-[10px] ml-[12px] text-[#333333]">
                <div className="">
                  <label className="block text-[13.5px] mb-1">
                    About Project
                  </label>
                  <textarea
                    placeholder="Describe..."
                    rows={3}
                    className="w-full px-[14px] py-1.5 rounded placeholder-[#B3B3B3] border border-gray-200 text-sm resize-none h-[110px]"
                    value={aboutProject}
                    onChange={(e) => setAboutProject(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[13.5px] mb-1">
                    How we collaborate?
                  </label>
                  <textarea
                    placeholder="Describe..."
                    rows={3}
                    className="w-full px-[14px] h-[110px] py-1.5 rounded placeholder-[#B3B3B3] border border-gray-200 text-sm resize-none"
                    value={collaboration}
                    onChange={(e) => setCollaboration(e.target.value)}
                  />
                </div>

                {/* Milestones Box (Aligned with Team Members) */}
                <div className="">
                  <label className="flex text-[13.5px] mb-1 text-[#333333]">
                    Milestones
                    <div className="text-[#808080] ">
                      (Optional)
                    </div>
                  </label>
                  <div className="border border-gray-200 rounded p-2 h-20 overflow-y-auto">
                    {milestones.map((milestone) => (
                      <div key={milestone._id} className="bg-gray-50 p-2 rounded text-xs">
                        <p className="text-gray-900 leading-tight">
                          {milestone.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            <Image
                              src={avtar}
                              alt="avtar"
                              className="w-4 h-4 rounded-full"
                            />
                            <span className="text-gray-600">
                              {milestone.assignedTo}
                            </span>
                          </div>
                          <span className="text-[#B3B3B3] ml-auto translate-x-[8px]">
                            Due date: <span className="text-[#4D4D4D]">{new Date(milestone.dueDate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric"
                            })}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center pt-2">
                    <button
                      type="button"
                      className="px-6 py-3 rounded-lg bg-[#5D56BD] text-white hover:bg-[#4A44A7] 
                      text-[11.5px] flex items-center gap-2"
                      onClick={() => setAddMilestone(true)}
                    >
                      <Plus className="w-4 h-4" /> Add Milestone
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Inside Modal */}
          <div className="flex justify-end gap-2 px-6 py-4">
            <button
              className="px-6 py-[10px] bg-[#5D56BD] text-[13.5px] text-white rounded-lg "
              onClick={handleClick}
            >
              Create Project
            </button>
            <button
              onClick={onClose}
              className="px-8 py-[10px] bg-[#999999] text-[13.5px] text-white rounded-lg  "
            >
              Cancel
            </button>
          </div>
        </div>


        {isAddTeamMemberModalOpen && (
          <AddTeamMembers
            mutate={() => { }}
            fromOverview={fromOverview}
            onClose={() => setAddTeamMemberModalOpen(false)}
            onAddMember={handleAddMember}
            teamMembers={teamMembers}
          />
        )}
        {isAddMilestone && (
          <AddMilestone
            handleMileStoneFetch={() => { }}
            onClose={() => setAddMilestone(false)}
            teamMembers={teamMembers}
            setmileStone={setmileStone}
            fromOverview={false}
          />
        )}
      </div>
    </>
  );
};

export default CreateNewProject;

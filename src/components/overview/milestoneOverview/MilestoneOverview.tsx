import React, { useState, useEffect } from "react";
import Image from "next/image";
import googleMeet from "../../../../public/assets/Google Meet image.png";
import avtar from "../../../../public/assets/avtar.jpg";
import Comment from "../Textarea/Comment";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";
import { Check } from 'lucide-react';
import EditmileStoneModal from "../EditmileStoneModal";
import EditIcon from "../../../../public/assets/Edit Button 03.png";
import TrashIcon from "../../../../public/assets/Trash Icon 02.png";
import {jwtDecode} from "jwt-decode";
import {
Search,
ChevronLeft,
ChevronRight,
ArrowLeft, MoreVertical, Pencil, Trash
} from "lucide-react";
import useSWR, { mutate } from 'swr';
import { resolve } from "path";
import ToDo from "../ToDo";

interface DetailProps {
milestoneId: string;
projectId: string | null;
isOpenDetail: boolean;
onClose: () => void;
reload: () => void;
}

interface MilestoneData {
_id: string;
title: string;
assignedTo: string[];
comments: {
_id: string;
comment: string;
commentedBy: {
    _id: string;
    fullName: string;
    role: string;
}

commentedOn: string;
}[];
createdBy: {
    _id: string;
fullName: string;
},
createdOn: Date;
dueDate: string;
status: "pending" | "completed";
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
interface Project {
_id: string;
name: string;
pinned: boolean;
archived: boolean;
members: [{
name: string;
}]
createdBy: string
}

const MilestoneOverview = ({ milestoneId, projectId, isOpenDetail, onClose, reload }: DetailProps) => {
const [comment, setComment] = useState("");
const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
const [editCommentText, setEditCommentText] = useState("");
const [milestoneFromBackend, setmilestoneFromBackend] = useState<mileStoneThatIsFetchedFromBackend[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [isEditModal, setIsEditModal] = useState<boolean>(false)
const [isDropdown, setIsDropdown] = useState<boolean>(false);
const [isDropdownComment, setIsDropdownComment] = useState<string | null>(null);
const [project, setProject] = useState<Project>({
_id: "",
name: "",
pinned: false,
archived: false,
members: [
    {
        name: "",
    }
],
createdBy: "",
});
const fetcher = async (url: string) => {
const response = await axios.get(url, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});
setMilestoneData(response.data.milestone)
return response.data;
};
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/projects/${milestoneId}`;
const { data, error: swrError, isLoading } = useSWR(apiUrl, fetcher);

const [milestoneData, setMilestoneData] = useState<MilestoneData>({
_id: "",
title: "",
assignedTo: [],
comments: [],
createdBy: {
    _id: "",
    fullName: ""
},
createdOn: new Date(),
dueDate: "",
status: "pending",
})
interface decodedToken{
    id: string;
}
const decoded:decodedToken = jwtDecode(`${localStorage.getItem("token")}`);


// Handle milestone status toggle
const handleMilestoneToogle = async (milestoneId: string, status: string) => {
// Toggle the status
const newStatus = status === "pending" ? "completed" : "pending";

// , process.env.TOKEN_SECRET
try {
    // Make the API call to update status
    await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/milestones/update-status`,
        { status: newStatus },
        {
            params: { projectId, milestoneId },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

    // Revalidate (refetch) the milestone data after status update
   reload()
    mutate(apiUrl);


} catch (error) {
    console.error("Error updating milestone status:", error);
}
};

// Fetch project data
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

useEffect(() => {
const fetchNotes = async () => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/members`,
            {
                params: {
                    projectId: projectId,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        setmilestoneFromBackend([response.data.milestone])
    } catch (error) {
        console.error(error);
    }
};

fetchNotes();
}, []);

const handlePostComment = async () => {
if (!comment.trim()) return;
setLoading(true);
setError(null);

try {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${milestoneId}/comment`,
        { comment },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        }
    );
    // After successful comment post, revalidate the milestone data to include the new comment
    mutate(apiUrl);
    setComment("");
} catch (error) {
    if (axios.isAxiosError(error)) {
        console.error("Error posting comment:", error.response?.data || error.message);
    } else {
        console.error("Error posting comment:", error);
    }
    setError("Failed to post comment. Try again.");
} finally {
    setLoading(false);
}
};

const handleClickEdit = async () => {
setIsEditModal(prev => !prev);
}

const handleEditComment = (commentId: string, commentText: string) => {
setEditingCommentId(commentId);
setEditCommentText(commentText);
setIsDropdownComment(null); // Close dropdown when starting to edit
}

const editMilestoneComment = async () => {
if (!editCommentText.trim() || !editingCommentId) return;
setLoading(true);
setError(null);
const commentId= editingCommentId
try {
    await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/${milestoneId}/${commentId}`,
        { newComment: editCommentText },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        }
    );
    
    // After successful edit, revalidate the milestone data
    mutate(apiUrl);
    setEditingCommentId(null);
    setEditCommentText("");
    reload();
} catch (error) {
    console.error("Error editing comment:", error);
    setError("Failed to edit comment. Try again.");
} finally {
    setLoading(false);
}
};

const handleDeleteComment = async (commentId: string) => {
try {
    await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/${milestoneId}/${commentId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        }
    );
    await mutate(apiUrl);
    reload();
    setIsDropdownComment(null);

} catch (error) {
    console.log("Error in deleting milestone", error);
}
}

const handleDelete = async () => {
try {
    await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/project/${projectId}/milestones/${milestoneId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        }
    );
    await mutate(apiUrl);
    reload();
    onClose();
} catch (error) {
    console.log("Error in deleting milestone", error);
}
}

const handleCancelEdit = () => {
setEditingCommentId(null);
setEditCommentText("");
};

if (!isOpenDetail) return null;

if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

// Show error state if there's an error fetching data
if (swrError) return <div className="flex justify-center items-center h-screen">Error loading milestone data</div>;

return (
<>
    {isEditModal && (

        <EditmileStoneModal
            mutate={() => mutate(apiUrl)}
            milestoneFromBackend={milestoneFromBackend}
            mileStoneId={milestoneId}
            milestoneValue={milestoneData.title}
            onClose={() => setIsEditModal(false)} />
    )}
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
                            {project.name}
                        </Link>
                        <span className="text-[#808080]"><ChevronRight width={20} height={20} strokeWidth={1.5} /></span>
                        <span className="text-[#4D4D4D] font-medium text-[15px]">Milestone Overview</span>
                    </div>
                </nav>
            </div>
            <div>
                <button
                    className="flex font-sans flex-row justify-center items-center px-[13px] py-2 bg-[#5D56BD] text-white rounded-lg mx-4  ml-[28px] -translate-y-3 font-light"
                    onClick={onClose}
                >
                    <ArrowLeft className="text-[13px] h-5 w-5" strokeWidth={1.5} />
                    <span className="text-[13px] ml-2">Go back</span>
                </button>
                <div className="mx-4 ml-[24px] mt-[26px] px-4 py-1 bg-white rounded-lg  font-sans">
                    <div className="flex justify-between items-start mt-3">
                        <div className="flex-1 mt-[2px]">

                            <div className='flex p-2 gap-5 pb-[19px] border-b border-[#000000]/20'>
                                <div onClick={() => handleMilestoneToogle(milestoneData._id, milestoneData.status)}>
                                    {milestoneData.status === "pending" ?
                                        <div className='py-[30px] px-[30px] flex items-center justify-center bg-[#CCCBCB] text-white w-12 h-14 text-[10px] rounded-xl hover:bg-[#B5DEAB]'>&nbsp;Mark this Complete</div> :
                                        <div className='flex items-center justify-center text-white w-[60px] h-[60px] text-[10px] rounded-xl bg-[#6BBD56]'><Check className="stroke-white text-white w-10 h-10" /></div>
                                    }
                                </div>
                                <h1 className="text-[22px] text-[#333333] translate-y-[14px]">{milestoneData.title}</h1>
                                <div className='border h-[29px] ml-auto -translate-y-2 p-[3px] '><MoreVertical className='text-[#666666] p-[2px] ' onClick={() => setIsDropdown(prev => !prev)} />
                                    <div>
                                        {isDropdown ? <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-300 py-1 z-[100]">

                                            <button
                                                className="w-full px-4 py-2 text-[15px] hover:bg-gray-100 flex items-center text-[#4D4D4D]"
                                                onClick={handleClickEdit}
                                            >
                                                <Image src={EditIcon} alt="Edit" width={22} height={22} className="ml-3 mr-3" />
                                                Edit
                                            </button>

                                            {/* Proper Horizontal Line */}
                                            <hr className="w-full border-gray-300 my-1" />

                                            <button
                                                className="w-full px-4 py-2 text-[15px] hover:bg-gray-100 flex items-center text-[#4D4D4D]"
                                                onClick={handleDelete}
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
                    <div className="mb-6  mt-2">
                        <div className="flex justify-between items-start">
                            <div className="flex">
                                <div className="mt-1 text-[15px] text-[rgb(77,77,77)] ml-3">
                                    Added by &nbsp;&nbsp;: &nbsp;&nbsp;<span className="text-[#333333]">{milestoneData.createdBy.fullName} </span> on &nbsp;
                                    {new Date(milestoneData.createdOn).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="ml-3 text-[#4D4D4D] text-sm">
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[15px] text-[#4D4D4D]">When done, notify &nbsp;:</span>

                                {project.members.map((member, index) => (
                                    <div className="flex items-center gap-1 p-1 " key={index}>
                                        <div className="flex justify-center items-center bg-[#5D56BD] rounded-full  px-1 py-[2px] font-light">
                                            <Image src={avtar} alt="photo" className="rounded-full" width={24} height={24} />
                                            <div className="text-[11px] text-white rounded-xl px-[2px] ">{member.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex mt-2">
                            <div className="mt-1 text-sm text-[#4D4D4D] ml-3">
                                Due Date&nbsp;&nbsp;:&nbsp;&nbsp; <span>{new Date(milestoneData.dueDate).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Comments Section */}
                <div className="ml-[26px] my-4 bg-white p-4 rounded-lg mt-6 w-[1020px] ">
                    <div>
                        <h2 className="text-[19px] font-medium text-[#333333] mb-4 pl-2 font-sans">Comments</h2>
                        {/* Comment Input */}
                        <div>
                            <div className="mt-9 flex gap-3">
                                <Image src={avtar} alt="avatar" className="w-12 h-12 rounded-full" width={48} height={48} />
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
                    <div className="space-y-4 mt-7">
                        {milestoneData.comments && milestoneData.comments.length > 0 ? (
                            milestoneData.comments.map((comment, index) => (
                                <div key={index} className="gap-3 border-t-[1.5px] border-[#CCCCCC] pt-6 ">
                                    <div className="flex">
                                        <div className="flex">
                                            <Image src={avtar} alt="avatar" className="rounded-full" width={48} height={48} />
                                            <div className="flex-1 ml-[20px]">
                                                <div className="flex items-center gap-2 text-[#333333]">
                                                    <span className="font-medium text-[16px]">{comment.commentedBy.fullName}</span>
                                                    <div className="text-[17px] font-medium">
                                                        ({comment.commentedBy.role[0].toUpperCase() +(comment.commentedBy.role).slice(1)})</div>
                                                </div>
                                                <div className="text-[13.5px] text-[#666666] mb-1">
                                                    {new Date(comment.commentedOn).toLocaleDateString("en-GB", {
                                                        weekday: "short",
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}{" "}
                                                    &nbsp;
                                                    {new Date(comment.commentedOn).toLocaleTimeString("en-GB", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: false,
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=''>
                                            {  comment.commentedBy._id=== decoded.id?
                                            <div className="ml-[720px] border h-[29px] -translate-x-3 -translate-y-2 p-[3px]"><MoreVertical
                                            className='text-[#666666] p-[2px] cursor-pointer' 
                                            onClick={() => setIsDropdownComment(isDropdownComment === comment._id ? null : comment._id)} 
                                        /></div>: <></>}
                                            
                                            <div>
                                                {isDropdownComment === comment._id && (
                                                    <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-300 py-1 z-[100]">
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
                                                            onClick={() => handleDeleteComment(comment._id)}
                                                        >
                                                            <Image src={TrashIcon} alt="logout" width={22} height={22} className="ml-3 mr-3" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {editingCommentId === comment._id ? (
                                        <div className="ml-[70px] mt-2 flex flex-col">
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
                                                    onClick={editMilestoneComment}
                                                    className="px-8 py-2 bg-[#5D56BD] text-white rounded-lg text-[12px]"
                                                    disabled={loading}
                                                >
                                                    {loading ? "Saving..." : "Save"}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-[15px] text-[#333333] ml-[70px] mt-2">{comment.comment}</p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
);
};

export default MilestoneOverview;
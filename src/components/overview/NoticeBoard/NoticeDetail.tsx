import React, { useState, useEffect } from "react";
import Image from "next/image";
import googleMeet from "../../../../public/assets/Google Meet image.png";
import avtar from "../../../../public/assets/avtar.jpg";
import Comment from "../Textarea/Comment";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";
import useSWR, { mutate } from "swr";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowLeft
} from "lucide-react";

interface DetailProps {
  id: string;
  projectId: string | null;
  isOpenDetail: boolean;
  onClose: () => void;
}

const fetcher = async (url: string) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const NoticeDetail = ({ id, projectId, isOpenDetail, onClose }: DetailProps) => {
  interface NoticeData {
    postedBy?: { fullName: string };
    postedOn?: string;
    category?: string;
    title?: string;
    description?: string;
    notifyWhenPosted?: { fullName: string }[];
    comments?: {
      avatar: string;
      commentedBy: { fullName: string; role: string };
      commentedOn: string;
      comment: string;
    }[];
  }
  interface Project {
    _id: string;
    name: string;
    pinned: boolean;
    archived: boolean;
  }

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<Project>({
    _id: "",
    name: "",
    pinned: false,
    archived: false,
  });

  // Using SWR for notice data
  const noticeUrl = `${process.env.NEXT_PUBLIC_API_URL}/noticeboard/${id}`;
  const { data: noticeData = {}, error: noticeError } = useSWR<NoticeData>(
    isOpenDetail ? noticeUrl : null,
    fetcher,
    {
      refreshInterval: 5000, // Refresh every 5 seconds
      revalidateOnFocus: true,
    }
  );

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
    if (isOpenDetail && projectId) {
      fetchProject();
    }
  }, [projectId, isOpenDetail]);

  const handlePostComment = async () => {
    if (!comment.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/noticeboard/${id}/comment`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Clear input field after posting
      setComment("");
      
      // Trigger SWR to revalidate the data
      mutate(noticeUrl);
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

  if (!isOpenDetail) return null;

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
                <span className="text-[#4D4D4D] font-medium text-[15px]">Notice Board</span>
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
              <div className="mb-6 pt-2 mt-2">
                <div className="flex justify-between items-start">
                  <div className="flex">
                    <div className="mt-1 text-[13.5px] text-[#4D4D4D] ml-3">
                      Posted by &nbsp;: &nbsp;
                      <span className="text-[#333333]">{noticeData?.postedBy?.fullName || "Unknown"}</span> on&nbsp;
                      {noticeData?.postedOn
                        ? new Date(noticeData.postedOn).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        : "N/A"}
                    </div>

                  </div>
                </div>
                <div className="h-[6px]"></div>
                <div className="ml-3 text-[#4D4D4D] text-[13.5px] mt-[1px]">Category &nbsp;&nbsp;:&nbsp;&nbsp;
                  <span className="text-[#333333]">{noticeData.category}</span></div>
                <div><h1 className="text-[#4D4D4D] font-medium mt-4 ml-3 text-[22.5px]">{noticeData.title}</h1></div>
                <div className="mt-4 gap-6 text-[#4D4D4D] ml-3">{noticeData.description}</div>
                <div className="flex justify-center my-4">
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-[#4D4D4D] ml-4">When post, notify :</span>
                  <div className="flex  text-white">
                    {noticeData.notifyWhenPosted?.map((watcher, index) => (
                      <div className="flex items-center gap-1 p-1 " key={index}>
                        <div className="flex justify-center items-center bg-[#5D56BD] rounded-full  px-1 py-[2px]">
                          <Image src={avtar} alt="photo" className="rounded-full" width={24} height={24} />
                          <div className="text-[11px] text-white rounded-xl px-1 ">{watcher?.fullName}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="ml-[26px] my-4 bg-white p-4 rounded-lg mt-6 w-[1020px] ">
              <div className=" border-[#CCCCCC] pb-6">
                <h2 className="text-[19px] font-medium text-[#333333] mb-4">Comments</h2>
                {/* Comment Input */}
                <div>
                  <div className="mt-9 flex gap-3">
                    <Image src={avtar} alt="avatar" className="w-12 h-12 rounded-full" width={48} height={48} />
                    <div className="flex flex-grow">
                      <Comment notes={comment} setNotes={setComment} fromTodo={false} />
                    </div>
                  </div>
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
              <div className="space-y-4 mt-4 ">
                {noticeData.comments && noticeData.comments.length > 0 ? (
                  noticeData.comments.map((comment, index) => (
                    <div key={index} className="flex gap-3 border-t border-[#CCCCCC] ">
                      <div>
                        <div className="flex mt-4">
                          <Image src={avtar} alt={comment.commentedBy?.fullName} className="rounded-full" width={48} height={48} />
                          <div className="flex-1 ml-[20px]">
                            <div className="flex items-center gap-2 text-[#333333]">
                              <span className="font-medium text-[16px]">{comment.commentedBy?.fullName}</span>
                              <span className="text-[17px] font-medium">({comment.commentedBy?.role[0].toUpperCase() + comment.commentedBy?.role.slice(1)}
                            )</span>
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
                        <p className="text-sm text-[#666666] ml-16">{comment.comment}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic text-sm">No comments yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeDetail;
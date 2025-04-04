import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Divide, Plus, ChevronDown, MoreVertical } from "lucide-react";
import Image from "next/image";
import avtar from "../../../public/assets/avtar.jpg";
import notice from "../../../public/assets/Notice Board Illustration.png";
import NoticeBoardModal from "./NoticeBoard/NoticeBoardModal";
import SortedModal from "./NoticeBoard/SortedModal";
import menu from "../../../public/assets/Menu.png";
import { ChartBarDecreasing, Pencil } from "lucide-react";
import EditModal from "./NoticeBoard/EditModal";
import NoticeDetail from "./NoticeBoard/NoticeDetail";
import axios from "axios";
import { useParams } from "next/navigation";
import {
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
interface noticeBoard {
  _id: string;
  title: string;
  project: string;
  postedOn: string;
  postedBy: {
    id: string;
    fullName: string;
  };
  notifyWhenPosted: [];
  description: string;
  comments: string;
  category: string;
}
interface Project {
  _id: string;
  name: string;
  pinned: boolean;
  archived: boolean;
}

export default function NoticeBoard() {
  const [isNoticeModal, setisNoticeModal] = useState(false);
  const [isSortedModal, setSortedModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Sort by");
  const [selectedOptionMessage, setSelectedOptionMessage] =
    useState("All messages");
  const [isDropMessage, setisDropMessage] = useState(false);
  const [isDrop, setisDrop] = useState(false);
  const [isEditModal, setisEditModal] = useState(false);
  const [Active, setActive] = useState<string>("By original post date");
  const [project, setProject] = useState<Project>({
    _id: "",
    name: "",
    pinned: false,
    archived: false,
  });
  const [messageOptions, setMessageOptions] = useState<string[]>([
    // "All messages",
    // "Announcement",
    // "FYI",
    // "Heartbeat",
    // "Pitch",
    // "Question",
  ]);

  const { id } = useParams();
  const [notesData, setNotesData] = useState([]);
  const [noticeId, setNoticeId] = useState("hi")
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
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    fetchProject();
  }, [id]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(response);
        // setNoticeBoardData([...response.data]);
        setMessageOptions(response.data.categories)
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/noticeboard/latest`,
          {
            params: {
              projectId: id,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // console.log(response.data);
        setNoticeBoardData([...response.data]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);

  const [NoticeBoardData, setNoticeBoardData] = useState<noticeBoard[]>([]);
  useEffect(() => {
    // console.log(NoticeBoardData, "hlo");
  }, [setNoticeBoardData]);
  const [isnoticeDetail, setisnoticeDetail] = useState(false);

  const handleClick = () => {
    setisNoticeModal(true);
  };

  const handleClickOptions = () => {
    setisDrop((prev) => !prev);
  };

  const options = [
    {
      value: "Sort by",
      label: "Sort by",
      icon: <ChartBarDecreasing className="w-4 h-4" />,
    },
    {
      value: "Edit",
      label: "Edit categories",
      icon: <Pencil className="w-4 h-4" />,
    },
  ];

  const handleOptionClick = (value: string) => {
    if (value === "Sort by") {
      setSortedModal(true);
      setisEditModal(false);
    } else {
      setSortedModal(false);
      setisEditModal(true);
    }
    setSelectedOption(value);
  };

  const handleMessageOptionClick = (option: string) => {
    setSelectedOptionMessage(option);
    setisDropMessage(false);
  };

  const handleUpdateMessageOptions = (updatedOptions: string[]) => {
    setMessageOptions(updatedOptions);
  };

  const handleNoticeClick = (note: any) => {
    setNoticeId(note._id)
    setisnoticeDetail(true);
  }

  const sortedNotesData = [...NoticeBoardData].sort((a, b) => {
    return new Date(b.postedOn).getTime() - new Date(a.postedOn).getTime();
  });

  const sortedAlphabetically = [...NoticeBoardData].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <>
      {isnoticeDetail ? (
        <NoticeDetail
          id={noticeId}
          projectId={typeof id === "string" ? id : null}
          isOpenDetail={isnoticeDetail}
          onClose={() => setisnoticeDetail(false)}
        />
      ) : (
        <>
          {isSortedModal && (
            <SortedModal
              isOpen={isSortedModal}
              onClose={() => setSortedModal(false)}
              Active={Active}
              setActive={setActive}
            />
          )}
          {isEditModal && (
            <EditModal
              isOpen={isEditModal}
              onClose={() => setisEditModal(false)}
              messageOption={messageOptions}
              onUpdateMessageOption={handleUpdateMessageOptions}
            />
          )}
          {isNoticeModal && (
            <NoticeBoardModal
              isOpen={isNoticeModal}
              onClose={() => setisNoticeModal(false)}
              messageOptions={messageOptions}
              setMessagesOptions={setMessageOptions}
              NoticeBoardData={NoticeBoardData}
              setNoticeBoardData={setNoticeBoardData}
            />
          )}
          {NoticeBoardData.length >= 0 ? (
            <div className="min-h-screen bg-[#F8F7FA] font-sans">
              <div className="pl-6 pr-6 pb-0 -tanslate-y-2 ">
                <div className="pl-2 pr-6 pb-0 mt-3">
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
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2 ml-[5px]">
                    <button
                      className="flex flex-row justify-center items-center px-6 py-[9px] bg-[#5D56BD] text-white rounded-lg mt-[14px] text-[12.5px]"
                      onClick={handleClick}
                    >
                      <Plus className="mr-2 w-[16px] h-[16px]" strokeWidth={1.5} /> New Message
                    </button>
                    <div className="relative w-[390px] mt-[14px] pl-5">
                      <Search className="absolute left-[10px] top-1/2 transform -translate-y-1/2 text-[#999999]
                                   w-[18px] h-[16px] translate-x-[22px]" />
                      <input
                        type="text"
                        placeholder="search message ..."
                        className="w-full ml-1 pl-[38px] py-[9px] text-[13.5px] bg-white border placeholder-[#B3B3B3] border-gray-200 rounded-lg focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 translate-x-4">
                    <div className="relative">
                      <button
                        className="flex px-3 py-2 text-[12.5px] text-[#4D4D4D] border border-[#CCCCCC] rounded-lg bg-white"
                        onClick={() => setisDropMessage((prev) => !prev)}
                      >
                        <span className="ml-3">{selectedOptionMessage || "All Messages"}</span>
                        <ChevronDown className="w-4 h-4 ml-6" />
                      </button>
                      {isDropMessage && (
                        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
                          {messageOptions.map((option) => (
                            <div
                              key={option}
                              className="px-4 py-2 text-sm hover:bg-[#565DBD] hover:text-[white] cursor-pointer bg-white"
                              onClick={() => handleMessageOptionClick(option)}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <button
                        className="w-auto bg-white px-2 py-2 rounded-md flex items-center gap-2 border z-0
                        border-[#CCCCCC] text-[#4D4D4D]"
                        onClick={handleClickOptions}
                      >
                        <MoreVertical
                          width={18}
                          height={18}
                          className="" />
                      </button>
                      {isDrop && (
                        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-[9999]">

                          {options.map((option) => (
                            <div
                              key={option.value}
                              className="flex gap-2 px-4 py-2 text-sm hover:bg-[#565DBD] hover:text-[white] cursor-pointer"
                              onClick={() => handleOptionClick(option.value)}
                            >
                              {option.icon}
                              {option.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 mx-7 mt-4 rounded-xl w-[1015px] ">
                {NoticeBoardData.length > 0 ? (
                  Active === "By original post date" ? (
                    NoticeBoardData.map((note) => (
                      <div
                        key={note._id}
                        className="border-b-[1.5px] border-[#CCCCCC] hover:cursor-pointer text-[13.5px] mb-4"
                        onClick={() => handleNoticeClick(note)}
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <Image
                            alt="profile"
                            src={avtar}
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                          <div>
                            <div className="flex text-[#666666] -translate-y-3">
                              <span>
                                {note.postedBy?.fullName}{` `}&nbsp;
                              </span>
                              <span className="text-[#666666]">
                                Published on:{" "}
                                {new Date(note.postedOn).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }).replace(",", "")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="-translate-y-6">
                          <h2 className="ml-16 text-[16px] font-medium text-[#333333] mb-2">
                            {note.title}
                          </h2>
                          <p className="ml-16 text-sm text-gray-600">
                            {note.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : Active === "By latest comment" ? (
                    sortedNotesData.map((note) => (
                      <div
                        key={note._id}
                        className="border-b-[1.5px] border-[#CCCCCC] hover:cursor-pointer text-[13.5px] mb-4"
                        onClick={() => handleNoticeClick(note)}
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <Image
                            alt="profile"
                            src={avtar}
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                          <div>
                            <div className="flex text-[#666666] -translate-y-3">
                              <span>
                                {note.postedBy?.fullName}{` `}&nbsp;
                              </span>
                              <span className="text-[#666666]">
                                Published on:{" "}
                                {new Date(note.postedOn).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }).replace(",", "")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="-translate-y-6">
                          <h2 className="ml-16 text-[16px] font-medium text-[#333333] mb-2">
                            {note.title}
                          </h2>
                          <p className="ml-16 text-sm text-gray-600">
                            {note.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    sortedAlphabetically.map((note) => (
                      <div
                        key={note._id}
                        className="border-b-[1.5px] border-[#CCCCCC] hover:cursor-pointer text-[13.5px] mb-4"
                        onClick={() => handleNoticeClick(note)}
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <Image
                            alt="profile"
                            src={avtar}
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                          <div>
                            <div className="flex text-[#666666] -translate-y-3">
                              <span>
                                {note.postedBy?.fullName}{` `}&nbsp;
                              </span>
                              <span className="text-[#666666]">
                                Published on:{" "}
                                {new Date(note.postedOn).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }).replace(",", "")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="-translate-y-6">
                          <h2 className="ml-16 text-[16px] font-medium text-[#333333] mb-2">
                            {note.title}
                          </h2>
                          <p className="ml-16 text-sm text-gray-600">
                            {note.description}
                          </p>
                        </div>
                      </div>
                    ))
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 pt-[125px]">
                    <Image
                      src="/assets/Notice Board Illustration.png"
                      width={135}
                      height={135}
                      alt="No Project Found"
                      className=""
                    />
                    <h3 className="text-[#4D4D4D] text-[15px] font-sm mb-4 mt-[10.5px]">
                      Empty Notice Board
                    </h3>
                    <div className="mt-[2px]">
                      <button
                        onClick={handleClick}
                        className="flex flex-row justify-center items-center px-[24px] py-2.5 bg-[#5D56BD] text-white rounded-lg text-[12.5px]"
                      >
                        Post your first Notice
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

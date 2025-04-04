import React, { use, useEffect, useState } from "react";
import axios from "axios";
import avatar from '../../../public/assets/avtar.jpg'
import Image from "next/image";
const StuffDuesSoon = () => {
  interface StuffDueItem {
    _id: string;
    title: string;
    assignedTo: string;
    dueDate: string;
    projectName: string;
    status: string; // Added status to handle the update
    projectId: string; // Added projectId to handle the project identification
  }

  const [stuffDue, setstuffDue] = useState<StuffDueItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token"); // Replace with the actual token
  const userName= "Test Uset 1"
  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/upcoming-milestones`, // Replace with the actual endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const milestones = response.data;
        // console.log(milestones,"these are milestones")
        setstuffDue(milestones);
        // console.log(stuffDue);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch milestones");
        } else {
          setError("Failed to fetch milestones");
        }
      }
    };

    fetchMilestones();
  }, [token]);


  const colors = [
    "bg-[#FFA800]/10 text-[#333333] border-yellow-400",
    "bg-[#FF4C51]/10 text-[#333333] border-red-400",
  ];

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg">
      <div className="">
        <div className="pt-8 mb-4 mt-[14px]">
          <img
            src="/assets/illustration (2).png"
            alt="No Project Found"
            className="w-[113px] h-[112px] ml-[20px]"
          />
        </div>
      </div>
      <h3 className="text-[#4d4d4d] text-[13px] -translate-y-[3px] ml-[17px]">
        No Stuff Due Soon Found
      </h3>
    </div>
  );

  if (!stuffDue.length) {
    return <EmptyState />;
  }

  return (
    <div className="mx-auto bg-white pb-2 rounded-md px-2 mt-8">
      {stuffDue.map((item, index) => (
        <div key={item._id}>
          <div className="">
            <div>
              <h4 className="text-sm  text-[#333333] line-clamp-1">
                {item.title}
              </h4>
            </div>
            <div className="flex text-[13.5px] text-[#333333] mt-[12px]">
           <div className="flex flex-shrink">
            <div className="" >
            <Image src={avatar} alt="profile pic" width={18} height={18} className="rounded-full object-cover"/></div>
            <div className="pl-[6px]">
             {userName}
             </div>
             <div className="ml-10 text-[#4D4D4D] font-light">Due date: <span className="text-[#4D4D4D] font-normal">{new Date(item.dueDate).toLocaleDateString("en-GB",{
              day: "2-digit",
              month: "short",
              year: "numeric"
             })}</span></div>
             </div>
              <div
                className={`px-2 py-1 pl-3 text-[13.5px] rounded-l-lg ml-auto border-r-[3.5px] h-full ${colors[index % colors.length]
                  } translate-x-5`}
              >
                {item.projectName}
              </div>
            </div>
          </div>
          {/* Horizontal Line */}
          {index < stuffDue.length - 1 && (
            <hr className="border-t w-[590px] border-gray-300 my-[10px] -translate-x-[10px]" />
          )}
        </div>
      ))}

      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
    </div>
  );
};

export default StuffDuesSoon;

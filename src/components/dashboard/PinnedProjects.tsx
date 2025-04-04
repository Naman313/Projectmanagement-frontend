import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Project {
  _id: string;
  name: string;
  description: string;
}

const PinnedProjects = () => {
  const [pinnedProjects, setPinnedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPinnedProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/pinned`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPinnedProjects(response.data.projects || []);
      } catch (err) {
        console.error("Error fetching pinned projects:", err);
        setError("Failed to load pinned projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedProjects();
  }, []);

  if (loading) return <p className="text-sm">Loading pinned projects...</p>;
  if (error) return <p className="text-sm text-red-500">{error}</p>;

  const EmptyState = () => (
    <div className="flex items-center justify-center rounded-lg pb-6">
      <div className="text-center">
        <div className="px-4 inline-block">
          <img src="/assets/illustration.png" alt="No Project Found" className="w-[89px] h-[89px] ml-[8px]" />
        </div>
        <h3 className="text-[#333333] text-[13px] ml-[5px]">No Pinned Projects</h3>
      </div>
    </div>
  );

  if (!pinnedProjects.length) {
    return <EmptyState />;
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4">
        {pinnedProjects.map((project) => (
          <div
            key={project._id}
            className="rounded-lg pt-3 w-[235px] h-[128px] border-[1.5px] border-[#000000]/20 hover:shadow-sm transition-shadow relative flex flex-col mb-4"
          >
            <div className="absolute top-2 right-2">
              <Image src="/assets/Pin.png" alt="Pin Icon" width={18} height={18} />
            </div>
            <h3 className="text-sm font-medium text-[#333333] mb-3 px-[9px]  truncate">{project.name}</h3>
            <p className="text-[11px] text-[#666666] line-clamp-2 overflow-hidden px-[9px]">{project.description}</p>
            <div className="mt-3 flex items-center px-[9px]">
              <Image
                src="/assets/avtar.jpg"
                alt={`${project.name} Profile`}
                width={24}
                height={24}
                className="rounded-full border border-gray-200 mb-2 "
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinnedProjects;

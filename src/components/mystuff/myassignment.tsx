'use client';
import React, { useState, useEffect } from 'react';
import { MoveLeft } from 'lucide-react';
import axios from 'axios';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Milestone = {
  _id: string;
  title: string;
  assignedTo: string[];
  dueDate: string;
  status: "pending" | "completed";
  projectId: string;
  projectName: string;
  completedOn?: string | null;
};

type Project = {
  _id: string;
  name: string;
  milestones: Milestone[];
};

export default function MyAssignment() {
  const [userId, setUserId] = useState<string | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    fetchUserId();
  }, []);

  const fetchUserId = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data?._id) {
        setUserId(response.data._id);
      } else {
        setError("User ID not found");
      }
    } catch (err) {
      console.error("Error fetching user ID:", err);
      setError("Failed to fetch user ID");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProjects(userId);
    }
  }, [userId]);

  const fetchProjects = async (userId: string) => {
    try {
      const response = await axios.get(`${API_URL}/projects`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (Array.isArray(response.data)) {
        const assignedMilestones: Milestone[] = response.data.flatMap((project: Project) =>
          project.milestones && Array.isArray(project.milestones)
            ? project.milestones
                .filter((milestone) => milestone.assignedTo.includes(userId))
                .map((milestone) => ({
                  ...milestone,
                  projectId: project._id,
                  projectName: project.name,
                }))
            : []
        );
        setMilestones(assignedMilestones);
      } else {
        console.error("Unexpected API response format:", response.data);
        setMilestones([]);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setMilestones([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = async (id: string, projectId: string) => {
    try {
      const updatedMilestones: Milestone[] = milestones.map((milestone) =>
        milestone._id === id
          ? { 
              ...milestone, 
              status: (milestone.status === "pending" ? "completed" : "pending") as "pending" | "completed", // ✅ Type assertion added
              completedOn: milestone.status === "pending" ? new Date().toISOString() : null
            }
          : milestone
      );
  
      setMilestones(updatedMilestones);
  
      const newStatus: "pending" | "completed" = updatedMilestones.find(m => m._id === id)?.status || "pending";
      const completedOn = newStatus === "completed" ? new Date().toISOString() : null;
  
      await axios.patch(
        `${API_URL}/projects/${projectId}/milestones/${id}`,
        { status: newStatus, completedOn },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
  
      fetchProjects(userId!); // ✅ Ensures fresh data is fetched
    } catch (err) {
      console.error("Error updating milestone status:", err);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {showCompleted ? (
        <div>
          <div className="w-full bg-gray-50 pl-5 pb-4">
            <button
              className="flex items-center justify-center text-center bg-[#5D56BD] text-white px-3 py-1 rounded-lg font-light text-[14px] gap-2"
              onClick={() => setShowCompleted(false)}
            >
              <MoveLeft className="w-4" /> <p>Go Back</p>
            </button>
          </div>
          <div className="m-3 min-h-[500px] rounded-lg bg-white p-6">
            <h1 className="text-xl font-medium mb-4 font-sans">My Completed Assignments</h1>
            {milestones.filter(m => m.status === "completed").length > 0 ? (
              <ul className="space-y-4 w-full">
                {milestones.filter(m => m.status === "completed").map((m) => (
                  <li key={m._id} className="p-4 bg-gray-50 rounded shadow-sm flex items-center">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 mr-2"
                    />
                    <div className="flex-1">
                      <p className="text-medium text-gray-700">{m.title}</p>
                      <p className="text-sm text-gray-400">
                        Due Date: {new Date(m.dueDate).toLocaleDateString()} |{" "}
                        <span className="font-light">{m.projectName}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <Image
                  src="/assets/Campfire Illustration.png"
                  alt="No Assignments Available"
                  width={400}
                  height={400}
                />
                <p className="mt-4 text-gray-600">No completed assignments available</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-screen bg-white p-6">
          <h1 className="text-xl font-sans font-medium mb-4">My Assignments</h1>
          <ul className="space-y-4">
            {milestones.length > 0 ? (
              milestones.map((milestone) => (
                <li key={milestone._id} className="p-4 bg-gray-50 rounded shadow-sm flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={milestone.status === "completed"}
                    onChange={() => handleCheckboxChange(milestone._id, milestone.projectId)}
                  />
                  <div className="flex-1 ml-3">
                    <p className="text-lg text-gray-700">{milestone.title}</p>
                    <p className="text-sm text-gray-400">
                      Due Date: {new Date(milestone.dueDate).toLocaleDateString()} |{" "}
                      <span className="font-light">{milestone.projectName}</span>
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <Image
                  src="/assets/Campfire Illustration.png"
                  alt="No Assignments Available"
                  width={400}
                  height={400}
                />
                <p className="text-gray-600">No assigned milestones found.</p>
              </div>
            )}
          </ul>
          <button 
            className="mt-6 px-4 py-2 text-[#5D56BD] font-normal rounded"
            onClick={() => setShowCompleted(true)}
          >
            Show My Completed Assignments
          </button>
        </div>
      )}
    </>
  );
}

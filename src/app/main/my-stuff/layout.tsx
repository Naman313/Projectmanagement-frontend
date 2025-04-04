"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/mystuff/Header";
import MyAssignment from "@/components/mystuff/myassignment";
import Bookmarked from "@/components/mystuff/BookMarked";
import Schedule from "@/components/mystuff/Schedule";
import MyDrafts from "@/components/mystuff/MyDrafts";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MystuffLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("My Assignment"); // Default tab
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserId();
  }, []);

  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserId(response.data._id); 
    } catch (err) {
      console.error("Error fetching user ID:", err);
      setError("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  const renderComponent = () => {
    switch (activeTab) {
      case "Bookmarked":
        return <Bookmarked />;
      case "Schedule":
        return <Schedule />;
      case "My Drafts":
        return <MyDrafts />;
      default:
        return userId ? <MyAssignment 
        // userId={userId} 
        /> 
        : <div className="text-center">User not found</div>;
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <>
      <div className="max-h-screen bg-gray-50 space-y-2 pt-3">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex items-center text-gray-600 mb-4">
            <a href="/main/activity" className="text-gray-600">My Stuff</a>
            <span className="mx-2">›</span>
            <span>{activeTab}</span>
          </div>
          {renderComponent()}
        </div>
      </div>
    </>
  );
}

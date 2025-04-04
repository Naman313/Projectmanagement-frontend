'use client';
import React, { useEffect, useState } from 'react';
import MyAssignment from '@/components/mystuff/myassignment'; // ✅ Adjusted import path
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MyStuff() {
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

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="h-screen flex items-center justify-center text-red-500">{error}</div>;

    return (
        <div className="h-screen bg-gray-50 m-6">
            {userId ? <MyAssignment userId={userId} /> : <div className="text-center">User not found</div>}
        </div>
    );
}

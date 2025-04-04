'use client';

import React, { useState, useCallback } from 'react';
import ActivityHeader from '@/components/activity/ActivityHeader';
import ActivityFeed, { SAMPLE_ACTIVITIES } from '@/components/activity/ActivityFeed';
import OverdueTasks from '@/components/activity/OverdueTasks';

type FilterType = 'everything' | 'project' | 'people';

export default function ActivityPage() {
  const [selectedReport, setSelectedReport] = useState<string>('latest');
  const [activeFilter, setActiveFilter] = useState<FilterType>('everything');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredActivities, setFilteredActivities] = useState(SAMPLE_ACTIVITIES);

  const handleFilter = useCallback(() => {
    if (activeFilter === 'everything' || !searchTerm) {
      setFilteredActivities(SAMPLE_ACTIVITIES);
      return;
    }

    const filtered = SAMPLE_ACTIVITIES.filter(activity => {
      const searchLower = searchTerm.toLowerCase();
      if (activeFilter === 'project') {
        return activity.project.toLowerCase().includes(searchLower);
      } else if (activeFilter === 'people') {
        return activity.user.name.toLowerCase().includes(searchLower);
      }
      return true;
    });

    setFilteredActivities(filtered);
  }, [activeFilter, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Breadcrumb Path - Only visible in overdue view */}
      {selectedReport === 'overdue' && (
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex items-center text-gray-600 mb-4">
            <a href="/main/activity" className="text-gray-600">
              Activity
            </a>
            <span className="mx-2">›</span>
            <span>Overdue To-dos</span>
          </div>

          <button
            onClick={() => setSelectedReport('latest')}
            className="flex items-center px-4 py-2 bg-[#5D56BD] text-white rounded-lg hover:bg-[#5D56BD]-400"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go back
          </button>
        </div>
      )}

      {/* Main Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-lg">
          <h1 className="text-2xl text-gray-900">
            {selectedReport === 'overdue' ? 'Overdue to-dos' : 'Latest Activity'}
          </h1>
          <select
            className="border rounded-lg px-4 py-2 text-gray-800 min-w-[200px]"
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
          >
            <option value="">Choose a report</option>
            <option value="latest">Latest Activity</option>
            <option value="overdue">Overdue To-dos</option>
          </select>
        </div>

        <div className="bg-white p-6 rounded-lg">
          {selectedReport === 'overdue' ? (
            <OverdueTasks />
          ) : (
            <>
              <ActivityHeader
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onFilter={handleFilter}
              />
              <ActivityFeed filteredActivities={filteredActivities} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
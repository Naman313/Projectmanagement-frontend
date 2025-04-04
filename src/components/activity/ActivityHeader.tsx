'use client';

import React from 'react';

type FilterType = 'everything' | 'project' | 'people';

interface ActivityHeaderProps {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onFilter: () => void;
}

const ActivityHeader: React.FC<ActivityHeaderProps> = ({
  activeFilter,
  setActiveFilter,
  searchTerm,
  setSearchTerm,
  onFilter
}) => {
  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
    if (filter === 'everything') {
      setSearchTerm('');
      onFilter();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-8 space-y-4 w-full max-w-4xl mx-auto">

      {/* Filter Buttons */}
      <div className="inline-flex rounded-full bg-white p-1 items-center justify-center border border-black">
        <button
          className={`px-4 py-2 rounded-full ${activeFilter === 'everything'
              ? 'bg-gray-200 shadow-sm'
              : 'text-gray-600 hover:bg-gray-50'
            }`}
          onClick={() => handleFilterClick('everything')}
        >
          Everything
        </button>
        <button
          className={`px-4 py-2 rounded-full ${activeFilter === 'project'
              ? 'bg-gray-200 shadow-sm'
              : 'text-gray-600 hover:bg-gray-50'
            }`}
          onClick={() => handleFilterClick('project')}
        >
          Filter by project
        </button>
        <button
          className={`px-4 py-2 rounded-full ${activeFilter === 'people'
              ? 'bg-gray-200 shadow-sm'
              : 'text-gray-600 hover:bg-gray-50'
            }`}
          onClick={() => handleFilterClick('people')}
        >
          Filter by people
        </button>
      </div>

      {/* Search Input */}
      {activeFilter !== 'everything' && (
        <div className="flex gap-4 items-center justify-center w-full">
          <input
            type="text"
            placeholder={`Find ${activeFilter === 'project' ? 'Project' : 'People'}`}
            className="w-full p-3 rounded-lg text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            className="px-6 py-3 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors"
            onClick={onFilter}
          >
            Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityHeader;
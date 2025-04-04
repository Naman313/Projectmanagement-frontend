'use client';

import React, { useState, useEffect } from 'react';
import { SearchSectionProps, ChatUser } from './../../app/main/pings/page';

interface User {
  id: string;
  name: string;
  avatar: string;
  status?: 'online' | 'offline';
}

export default function SearchSection({ onChatStart }: SearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const users: User[] = [
    { id: '1', name: 'Esther Howard', avatar: '/api/placeholder/32/32', status: 'online' },
    { id: '2', name: 'Robert Fox', avatar: '/api/placeholder/32/32', status: 'offline' },
    { id: '3', name: 'Eleanor Pena', avatar: '/api/placeholder/32/32', status: 'online' },
    { id: '4', name: 'Kathryn Murphy', avatar: '/api/placeholder/32/32', status: 'offline' },
    { id: '5', name: 'Devon Lane', avatar: '/api/placeholder/32/32', status: 'online' },
    { id: '6', name: 'Ronald Richards', avatar: '/api/placeholder/32/32', status: 'online' },
  ];

  // First, let's define a type for the mock messages structure
type MockMessagesType = {
  [key: string]: {
    id: string;
    sender: string;
    timestamp: string;
    content: string;
    date: string;
  }[];
};

const mockMessages: MockMessagesType = {
  'Esther Howard': [
    {
      id: '1',
      sender: 'Esther Howard',
      timestamp: '09:30',
      content: 'Hello! How can I help you today?',
      date: '2024-01-21',
    },
  ],
  'Robert Fox': [
    {
      id: '2',
      sender: 'Robert Fox',
      timestamp: '10:15',
      content: 'Hi there! Are you available for a quick chat?',
      date: '2024-01-21',
    },
  ],
};

const handlePing = () => {
  if (selectedUser) {
    const chatUser: ChatUser = {
      id: selectedUser.id,
      name: selectedUser.name,
      status: selectedUser.status || 'offline',
      messages: mockMessages[selectedUser.name] || [],
      avatar: selectedUser.avatar,
    };
    onChatStart(chatUser);
  }
};

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDropdown && !(event.target as Element).closest('.search-container')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSearchQuery('');
    setShowDropdown(false);
  };

  return (
    <div className="px-6 py-8 bg-white ml-4 mr-4 rounded-2xl">
      <h2 className="text-2xl font-medium text-gray-900 mb-12">Pings</h2>
      <div className="flex items-center search-container">
        <div className="flex-1 relative">
          <div className="bg-gray-50 rounded-2xl mb-6 flex items-center gap-2 px-4 py-2">
            {selectedUser && (
              <div className="flex items-center gap-2 bg-white h-[45px] rounded-lg px-4 py-1">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-gray-700 text-sm">{selectedUser.name}</span>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-500 hover:text-gray-700 text-xs"
                >
                  ✕
                </button>
              </div>
            )}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              placeholder="Start a private chat with"
              className="flex-1 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500 h-[45px] px-4"
            />
          </div>

          {searchQuery && showDropdown && !selectedUser && (
            <div className="absolute w-full bg-white rounded-2xl shadow-lg mt-2 max-h-64 overflow-y-auto z-10">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white 
                        ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}
                    />
                  </div>
                  <span className="text-gray-900">{user.name}</span>
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <div className="px-4 py-3 text-gray-500">No users found</div>
              )}
            </div>
          )}
        </div>
        <button
          onClick={handlePing}
          className={`bg-gray-900 text-white px-16 py-4 mb-6 rounded-lg font-medium transition-colors`}        >
          ping
        </button>
      </div>
    </div>
  );
}
'use client';

import React from 'react';
import { ChatUser } from '@/app/main/pings/page';

interface RecentChatsProps {
  onChatStart: (user: ChatUser) => void;
}

const RecentChats: React.FC<RecentChatsProps> = ({ onChatStart }) => {
  const chats = [
    {
      id: '1',
      name: 'Ronald Richards',
      message: 'when can we expect to finish this work',
      time: '13:00',
      image: '/api/placeholder/40/40',
      status: 'online' as const,
      messages: [
        {
          id: '1',
          sender: 'Ronald Richards',
          timestamp: '09:30',
          content: 'when can we expect to finish this work',
          date: '2024-01-21'
        }
      ]
    },
    {
      id: '2',
      name: 'Devon Lane+2',
      message: '@Ronald please review the design',
      time: '13:00',
      initials: 'DL',
      mentions: ['Ronald'],
      status: 'offline' as const,
      messages: [
        {
          id: '2',
          sender: 'Devon Lane',
          timestamp: '13:00',
          content: '@Ronald please review the design',
          date: '2024-01-21'
        }
      ]
    },
    {
      id: '3',
      name: 'Project Atlas',
      message: 'when can we expect to finish this work',
      time: '11:00',
      initials: 'PA',
      status: 'offline' as const,
      messages: [
        {
          id: '3',
          sender: 'Project Atlas',
          timestamp: '11:00',
          content: 'Team meeting at 3 PM',
          date: '2024-01-21'
        }
      ]
    },
    {
      id: '4',
      name: 'Designing team',
      message: 'when can we expect to finish this work',
      time: '11:00',
      initials: 'DT',
      status: 'online' as const,
      messages: [
        {
          id: '4',
          sender: 'Designing team',
          timestamp: '11:00',
          content: 'New design files are ready for review',
          date: '2024-01-21'
        }
      ]
    }
  ];

  const handleChatClick = (chat: typeof chats[0]) => {
    const chatUser: ChatUser = {
      id: chat.id,
      name: chat.name.split('+')[0],
      status: chat.status,
      messages: chat.messages,
      avatar: chat.image,
      initials: chat.initials
    };
    
    onChatStart(chatUser);
  };

  return (
    <div className="p-6 min-h-[50vh] bg-white ml-4 mr-4 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Recent Chats</h2>
      <div className="space-y-4">
        {chats.map((chat) => (
          <div 
            key={chat.id} 
            onClick={() => handleChatClick(chat)}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <div className="relative">
              {chat.image ? (
                <img src={chat.image} alt="" className="w-10 h-10 rounded-full" />
              ) : (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white
                  ${chat.name.includes('Devon') ? 'bg-[#B4888B]' : ''}
                  ${chat.name.includes('Project') ? 'bg-[#E5A097]' : ''}
                  ${chat.name.includes('Designing') ? 'bg-[#7DC1D4]' : ''}`}
                >
                  {chat.initials}
                </div>
              )}
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                ${chat.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{chat.name}</h3>
              <p className="text-gray-500 text-sm truncate">
                {chat.mentions?.map(mention => (
                  <span key={mention} className="text-[#5D56BD]">@{mention} </span>
                ))}
                {chat.message}
              </p>
            </div>
            <span className="text-gray-500 text-sm whitespace-nowrap">{chat.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentChats;
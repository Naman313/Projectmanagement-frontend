'use client';

import React, { useState, useReducer } from 'react';
import RecentChatSection from '@/components/pings/RecentChatSection';
import SearchSection from '@/components/pings/SearchSection';
import ChatSection from '@/components/pings/ChatSection';

export interface Message {
  id: string;
  sender: string;
  timestamp: string;
  content: string;
  date: string;
  type?: 'text' | 'file' | 'video' | 'audio';
  attachments?: Array<{
    id: string;
    type: string;
    url: string;
    name: string;
  }>;
}

export interface ChatUser {
  id: string;
  name: string;
  status: 'online' | 'offline';
  messages: Message[];
  avatar?: string;
  initials?: string;
}

export interface SearchSectionProps {
  onChatStart: (user: ChatUser) => void;
}

export interface RecentChatsProps {
  onChatStart: (user: ChatUser) => void;
}

interface ChatState {
  activeChat: boolean;
  currentUser: ChatUser | null;
  messages: Message[];
}

type ChatAction = 
  | { type: 'START_CHAT'; payload: ChatUser }
  | { type: 'END_CHAT' }
  | { type: 'ADD_MESSAGE'; payload: Message };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'START_CHAT':
      return {
        activeChat: true,
        currentUser: action.payload,
        messages: action.payload.messages
      };
    case 'END_CHAT':
      return {
        activeChat: false,
        currentUser: null,
        messages: []
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
};



export default function PingsPage() {
  const initialState: ChatState = {
    activeChat: false,
    currentUser: null,
    messages: []
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  const showChat = (user: ChatUser) => {
    dispatch({ type: 'START_CHAT', payload: user });
  };

  const hideChat = () => {
    dispatch({ type: 'END_CHAT' });
  };

  const handleSendMessage = (messageText: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "Esther Howard",
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      }),
      content: messageText,
      date: new Date().toISOString(),
      type: 'text'
    };
    
    dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
  };

  return (
    <main className="space-y-12 mb-6">
      {!state.activeChat ? (
        <>
          <SearchSection onChatStart={showChat} />
          <RecentChatSection onChatStart={showChat} />
        </>
      ) : (
        state.currentUser && (
          <ChatSection 
            messages={state.messages}
            breadcrumbs={[
              { label: 'Ping', href: '/ping' },
              { label: 'Search', href: '/ping/search' },
              { label: state.currentUser.name }
            ]}
            showBackButton={true}
            userName={state.currentUser.name}
            userStatus={state.currentUser.status}
            onSendMessage={handleSendMessage}
            onBack={hideChat}
          />
        )
      )}
      <div className="mb-6"></div>
    </main>
  );
}
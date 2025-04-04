'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Send, Paperclip, Video, Phone } from 'lucide-react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';

const ChatSection = ({
  messages,
  breadcrumbs,
  showBackButton,
  userName,
  userStatus,
  onSendMessage,
  onBack
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVideoCall = () => {
    router.push('/video-call');
  };

  const handleVoiceCall = () => {
    router.push('/voice-call');
  };

  return (
    <div className="flex flex-col h-screen bg-white m-6 rounded-lg shadow-lg">
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.label}>
                {index > 0 && <span>/</span>}
                {item.href ? (
                  <Link href={item.href} className="hover:text-gray-700 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
          {showBackButton && (
            <button
              onClick={onBack}
              className="inline-flex items-center px-4 py-2 mt-2 text-sm text-white bg-[#5D56BD] rounded-md hover:bg-[#4A4494] transition-colors w-fit"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Go back
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 border-b">
        <div className="relative">
          <img
            src="/api/placeholder/40/40"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
            ${userStatus === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}
          />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-semibold">{userName}</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {userStatus === 'online' ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        {userStatus === 'online' && (
          <div className="flex gap-2">

          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${message.sender === 'Esther Howard' ? 'items-end' : 'items-start'
              }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">{message.sender}</span>
              <span className="text-sm text-gray-500">{message.timestamp}</span>
            </div>
            <div
              className={`max-w-[70%] p-3 rounded-lg ${message.sender === 'Esther Howard'
                  ? 'bg-[#5D56BD] text-white'
                  : 'bg-gray-900 text-white'
                }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-4 bg-gray-50 rounded-full border-0 focus:ring-2 focus:ring-[#5D56BD] placeholder-gray-400"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className="flex gap-2">
            {!newMessage && (
              <>
                <button type="button" className="p-3 rounded-full hover:bg-gray-100 text-[#5D56BD] transition-colors">
                  <Paperclip className="w-6 h-6" />
                </button>
                <button
                  onClick={handleVideoCall}
                  className="p-3 rounded-full hover:bg-gray-100 text-[#5D56BD] transition-colors"
                >
                  <Video className="w-6 h-6" />
                </button>
                <button
                  onClick={handleVoiceCall}
                  className="p-3 rounded-full hover:bg-gray-100 text-[#5D56BD] transition-colors"
                >
                  <Phone className="w-6 h-6" />
                </button>
              </>
            )}
            {newMessage && (
              <button type="submit" className="p-3 rounded-full hover:bg-gray-100 text-[#5D56BD] transition-colors">
                <Send className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

ChatSection.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'file', 'video', 'audio']),
    })
  ).isRequired,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
  showBackButton: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  userStatus: PropTypes.oneOf(['online', 'offline']).isRequired,
  onSendMessage: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default ChatSection;
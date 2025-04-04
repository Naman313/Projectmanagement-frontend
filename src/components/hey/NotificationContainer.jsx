import React from 'react';

const NotificationContainer = ({ 
  message, 
  author = "Eleanor",
  project = "Project Atlas",
  date = "03 Aug",
  type = "mention"
}) => {
  return (
    <div className="flex items-start gap-3 ml-6 p-4 hover:bg-blue-100 transition-colors border-white">
      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
        <img
          src="/api/placeholder/40/40"
          alt={author}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <div className={`px-2 py-1 rounded-full text-sm ${
            type === 'mention' ? 'bg-yellow-100' : 'bg-yellow-100'
          }`}>
            {type === 'mention' ? '@mention you' : 'Replied you'}
          </div>
          <span className="text-gray-600">{message}</span>
        </div>
        <div className="text-sm text-gray-500 truncate">
          {author} {project && `· ${project}`} · {date}
        </div>
      </div>
    </div>
  );
};

export default NotificationContainer;
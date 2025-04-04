'use client';

import React, { useState } from 'react';
import NotificationContainer from '../../../components/hey/NotificationContainer';

function Hey() {
  const [notifications] = useState([
    {
      id: 1,
      type: 'mention',
      message: 'Please share the documents end of the day.',
      author: 'Eleanor',
      project: 'Project Atlas',
      date: '03 Aug',
    },
    {
      id: 2,
      type: 'mention',
      message: 'sure I will do it.',
      author: 'Ronald Richards',
      project: '',
      date: '06 Aug',
    },
    {
      id: 3,
      type: 'reply',
      message: 'hi ,Please share the documents end of the day.',
      author: 'Ronald Richards',
      project: '',
      date: '07 Aug',
    },
    {
      id: 4,
      type: 'reply',
      message: 'there is a problem with the sign-up page.',
      author: 'Ronald Richards',
      project: '',
      date: '08 Aug',
    },
    {
      id: 5,
      type: 'reply',
      message: 'hi ,Please share the documents soon as possible.',
      author: 'Ronald Richards',
      project: '',
      date: '09 Aug',
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white p-4 text-xl font-normal text-gray-800">
          Prevision Notification
        </div>
        
        {/* Notifications List */}
        <div className="flex flex-col divide-y">
          {notifications.map(notification => (
            <NotificationContainer
              key={notification.id}
              message={notification.message}
              author={notification.author}
              project={notification.project}
              date={notification.date}
              type={notification.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hey;
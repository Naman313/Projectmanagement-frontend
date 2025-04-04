import React from 'react';

interface Activity {
  id: string;
  project: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  title: string;
  description: string;
  link: string;
  timestamp: string;
  date: string;
}

export const SAMPLE_ACTIVITIES: Activity[] = [
  {
    id: '1',
    project: 'Project Atlas',
    user: {
      name: 'Esther H.',
      avatar: '/api/placeholder/40/40'
    },
    action: 'commented on',
    title: 'Report Daily Tasks performed by Project Atlas',
    description: 'Task: a) created a dashboard. b) verified the data. c) created a report for the dashboard requirement.',
    link: 'https://doc.google.com/Ctxiyi2QmYDcmoHVvr0uoE/Project',
    timestamp: '7:00 PM',
    date: 'Yesterday'
  },
  {
    id: '3',
    project: 'Project Phoenix',
    user: {
      name: 'Sarah L.',
      avatar: '/api/placeholder/40/40'
    },
    action: 'created',
    title: 'New Feature Implementation Plan',
    description: 'Outlined the implementation strategy for the new user authentication system with timeline and resource allocation.',
    link: 'https://doc.google.com/docs/feature-plan',
    timestamp: '11:45 AM',
    date: '17 October'
  },
  {
    id: '5',
    project: 'Project Mercury',
    user: {
      name: 'Emma W.',
      avatar: '/api/placeholder/40/40'
    },
    action: 'shared',
    title: 'User Research Findings',
    description: 'Compiled results from recent user interviews and usability testing sessions with key insights and recommendations.',
    link: 'https://doc.google.com/presentation/user-research',
    timestamp: '4:20 PM',
    date: '16 October'
  },
];

interface ActivityFeedProps {
  filteredActivities?: Activity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ filteredActivities = SAMPLE_ACTIVITIES }) => {
  const groupedActivities = React.useMemo(() => {
    const activities = filteredActivities || SAMPLE_ACTIVITIES;
    return activities.reduce((acc, activity) => {
      if (!acc[activity.date]) {
        acc[activity.date] = [];
      }
      acc[activity.date].push(activity);
      return acc;
    }, {} as Record<string, Activity[]>);
  }, [filteredActivities]);

  const dates = Object.keys(groupedActivities);

  return (
    <div className="space-y-8">
      {dates.map((date) => (
        <div key={date}>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-gray-500 text-sm">{date}</span>
            </div>
          </div>

          {groupedActivities[date].map((activity, index) => (
            <div key={activity.id} className="mt-6">
              <div className="relative">
                {/* Project name with alternating alignment */}
                <div className={`text-sm font-medium text-gray-600 mb-2 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                  {activity.project}
                </div>
                
                <div className="flex justify-between items-start group">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src={activity.user.avatar} 
                        alt={activity.user.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-gray-900">
                        <span className="font-medium">{activity.user.name}</span>{' '}
                        {activity.action}{' '}
                        <a href="#" className="text-gray-600 hover:underline">
                          {activity.title}
                        </a>
                      </p>
                      <p className="mt-1 text-gray-600">{activity.description}</p>
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">{activity.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
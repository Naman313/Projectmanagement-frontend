import React, { useState } from 'react';
import { Square, CheckSquare } from 'lucide-react';

interface Task {
  id: number;
  project: string;
  description: string;
  createdDate: Date;
  completed: boolean;
}

const OverdueTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      project: 'Project Atlas',
      description: 'Create sign up page.',
      createdDate: new Date(2025, 0, 21), // Jan 21, 2025
      completed: false
    },
    {
      id: 2,
      project: 'Project Atlas',
      description: 'Prepare design specifications.',
      createdDate: new Date(2025, 0, 20), // Jan 20, 2025
      completed: false
    }
  ]);

  const calculateDaysOverdue = (createdDate: Date) => {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    const daysOverdue = calculateDaysOverdue(task.createdDate);
    const key = `${daysOverdue} day${daysOverdue !== 1 ? 's' : ''} Overdue`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <div className="w-full space-y-8">
      {Object.entries(groupedTasks).map(([overduePeriod, periodTasks]) => (
        <div key={overduePeriod} className="w-full">
          <div className="border-b border-gray-200 pb-2 mb-4">
            <h3 className="text-gray-600 text-sm px-4">{overduePeriod}</h3>
          </div>
          <div className="w-full space-y-4">
            {periodTasks.map((task) => (
              <div 
                key={task.id} 
                className="w-full hover:bg-gray-50 transition-colors duration-150 ease-in-out"
              >
                <div className="px-4 py-3 space-y-2">
                  <div className="text-gray-600 text-sm">{task.project}</div>
                  <div className="flex items-start gap-2">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    >
                      {task.completed ? (
                        <CheckSquare className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    <span className={`text-gray-800 ${task.completed ? ' text-gray-500' : ''}`}>
                      {task.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {Object.keys(groupedTasks).length === 0 && (
        <div className="w-full text-center text-gray-500 py-8">
          No overdue tasks
        </div>
      )}
    </div>
  );
};

export default OverdueTasks;
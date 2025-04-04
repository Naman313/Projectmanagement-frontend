import React from 'react';
import { MoveLeft } from 'lucide-react';
import Image from 'next/image';

type Assignment = {
  id: number;
  name: string;
  createdBy: string;
  dueDate: string;
  projectName: string;
  isCompleted: boolean;
};

type CompletedAssignmentProps = {
  onBack: () => void;
  completedAssignments: Assignment[];
};

const CompletedAssignment: React.FC<CompletedAssignmentProps> = ({ onBack, completedAssignments }) => {
  return (
    <>
      <div className='w-full bg-gray-50 pl-5 pb-4'>
        <button
          className='flex items-center justify-center text-center bg-[#5D56BD] text-white px-3 py-1 rounded-lg font-light text-[14px] gap-2'
          onClick={onBack}
        >
          <MoveLeft className='w-4' /> <p>Go Back</p>
        </button>
      </div>
      <div className='m-3 min-h-[500px] rounded-lg bg-white p-6'>
        <h1 className="text-2xl font-normal mb-4">Completed Assignments</h1>
        {completedAssignments.length > 0 ? (
          <ul className="space-y-4 w-full">
            {completedAssignments.map((assignment) => (
              <li
                key={assignment.id}
                className="p-4 bg-gray-50 rounded shadow-sm flex items-center"
              >
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 mr-2"
                />
                <div className="flex-1">
                  <p className="text-medium text-gray-700">{assignment.name}</p>
                  <p className="text-sm text-gray-600">
                    {assignment.createdBy} | Completed on: {assignment.dueDate} | Project: {assignment.projectName}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
            <div className="flex flex-col items-center justify-center h-full">
                <Image
                    src="/assets/Campfire Illustration.png"
                    alt="No Assignments Available"
                    width={400}
                    height={400}
                  />
                <p className="mt-4 text-gray-600">No completed assignments available</p>
            </div>
        )}
      </div>
    </>
  );
};

export default CompletedAssignment;

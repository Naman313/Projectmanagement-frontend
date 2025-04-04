import React, { useState } from 'react';
import Image from 'next/image';

const initialDrafts = [
  {
    id: 1,
    author: "Esther Howard (Project Manager)",
    project: "Project Atlas",
    title: "Project Kickoff Meeting",
    message: "@all join the kickoff meeting. We will discuss project goals, timelines, and team assignments. Your participation is crucial.",
    meetingDate: "29 Oct, 12:30",
    meetingLink: "https://meet.google.com/kbb-xzgf-ssg",
    isBookmarked: false,
  },
  {
    id: 2,
    author: "Dianne Russell (Team Lead)",
    project: "Neptune CRM",
    title: "Sprint Planning",
    message: "Let's finalize the tasks for the next sprint. Make sure to review the backlog before the meeting.",
    meetingDate: "01 Nov, 10:00",
    meetingLink: "https://meet.google.com/xyz-abc-def",
    isBookmarked: false,
  },
  {
    id: 3,
    author: "Ronald Richards (Designer)",
    project: "UI Redesign",
    title: "Wireframe Review",
    message: "We will go over the updated wireframes and discuss changes before the development phase starts.",
    meetingDate: "05 Nov, 15:00",
    meetingLink: "https://meet.google.com/lmn-opq-rst",
    isBookmarked: false,
  },
];

const MyDrafts = () => {
  const [drafts, setDrafts] = useState(initialDrafts);

  return (
    <>
      <div className='m-3 min-h-[500px] rounded-lg bg-white p-6'>
        <h1 className="text-xl text-black font-sans font-medium mb-4">My Draft</h1>
        {drafts.length > 0 ? (
          <ul className="space-y-4 w-full">
            {drafts.map((draft) => (
              <li
                key={draft.id}
                className="p-4 bg-gray-50 rounded shadow-sm flex items-center justify-between"
              >
                <div className="flex-1">
                  <p className="text-medium text-gray-900 font-semibold">{draft.author}</p>
                  <p className="text-sm text-gray-600">{draft.project}</p>
                  <p className="text-lg font-medium mt-2">{draft.title}</p>
                  <p className="text-sm text-gray-700 mt-1">{draft.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    <strong>Meeting at:</strong> {draft.meetingDate}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    <span className='text-gray-600'>Meeting Link:</span> {draft.meetingLink}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[480px] w-full">
             <Image
                src="/assets/Illustration (4).png"
                alt="No Assignments Available"
                width={150}
                height={150}
              />
            <p className="mt-4 text-gray-600">No Draft Found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MyDrafts;

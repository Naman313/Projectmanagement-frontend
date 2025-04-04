import React, { useState } from 'react';
import Image from 'next/image';
import { Bookmark } from 'lucide-react';

const initialBookmarked = [
  {
    id: 1,
    name: "Identify stakeholders who will be impacted by the project and who will be involved.",
    createdBy: "Eleanor Peno",
    dueDate: "2024-10-02",
    projectName: "Neptune CRM",
    isBookmarked: true, // Default to bookmarked
  },
  {
    id: 2,
    name: "Develop report for the requirements of the project.",
    createdBy: "Eleanor Peno",
    dueDate: "2024-10-03",
    projectName: "Project Atlas",
    isBookmarked: true, // Default to bookmarked
  },
  {
    id: 3,
    name: "Develop project charter by documenting the project's purpose, objectives, and key players.",
    createdBy: "Eleanor Peno",
    dueDate: "2024-11-02",
    projectName: "Project Atlas",
    isBookmarked: true, // Default to bookmarked
  },
];

const BookMarked = () => {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  const toggleBookmark = (id: number) => {
    setBookmarked((prevBookmarked) =>
      prevBookmarked.map((assignment) =>
        assignment.id === id
          ? { ...assignment, isBookmarked: !assignment.isBookmarked }
          : assignment
      )
    );
  };

  return (
    <>
      <div className='m-3 min-h-[500px] rounded-lg bg-white p-6'>
        <h1 className="text-xl text-black font-sans font-medium mb-4">My Bookmarked</h1>
        {bookmarked.length > 0 ? (
          <ul className="space-y-4 w-full">
            {bookmarked.map((assignment) => (
              <li
                key={assignment.id}
                className="p-4 bg-gray-50 rounded shadow-sm flex items-center justify-between"
              >
                <div className="flex gap-3">
                  <div className='rounded-full overflow-hidden'>
                    <Image
                        src="/assets/avtar.jpg"
                        alt="No Assignments Available"
                        width={50}
                        height={50}
                    />
                  </div>
                  <div>
                    <p className="text-medium text-gray-700">{assignment.name}</p>
                    <p className="text-sm text-gray-600">
                        {assignment.createdBy} | Due: {assignment.dueDate} | Project: {assignment.projectName}
                    </p>
                  </div>
                </div>
                <button onClick={() => toggleBookmark(assignment.id)} className="focus:outline-none">
                  <Bookmark
                    className={`w-6 h-6 transition-colors duration-300 ${
                      assignment.isBookmarked ? 'text-[#5D56BD] fill-[#5D56BD]' : 'text-[#5D56BD]'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[480px] w-full">
            <Image
              src="/assets/Illustration (2).png"
              alt="No Assignments Available"
              width={150}
              height={150}
            />
            <p className="mt-4 text-gray-600">No Bookmarked Found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default BookMarked;

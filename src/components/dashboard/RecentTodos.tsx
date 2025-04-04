import React, { useState, useEffect } from "react";
import axios from "axios";

const RecentToDos = () => {
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  const [todos] = useState([
    {
      projectName: "Overview",
      tasks: [
        {
          id: "1",
          text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
        },
        {
          id: "2",
          text: "Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
        },
      ],
    },
  ]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/todos`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchedTodos = response.data;
        console.log(response.data, "These are Todos");

        const transformedTodos = fetchedTodos.map((todo: any) => ({
          _id: todo._id,
          projectId: todo.projectId,
          projectName: todo.projectId.name,
          tasks: [
            {
              id: todo._id,
              text: todo.task,
              completed: todo.status === "Completed",
            },
          ],
        }));
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch To-Do's");
        } else {
          setError("Failed to fetch To-Do's");
        }
      }
    };

    fetchTodos();
  }, []);

  const colors = [
    "bg-[#FFA800]/10 text-[#333333] border-yellow-400",
    "bg-[#FF4C51]/10 text-[#333333] border-red-400",
  ];

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg">
      <div>
        <div className="rounded-full my-5 mb-4 pt-3">
          <img
            src="/assets/illustration (1).png"
            alt="No Project Found"
            className="w-44 h-32"
          />
        </div>
      </div>
      <h3 className="text-gray-700 text-sm font-medium mb-4 -translate-y-1">
        Empty To-Dos
      </h3>
    </div>
  );

  if (!todos.length) {
    return <EmptyState />;
  }

  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="space-y-0 -translate-y-2">
        {todos.map((todo, index) => (
          <div key={index}>
            <h3
              className={`text-[13.5px] mb-2 ${
                colors[index % colors.length]
              } pl-[14px] border-l-[3.5px] rounded-l-sm w-24 py-[3px] rounded-r-md -translate-x-6`}
            >
              {todo.projectName}
            </h3>
            <ul className="space-y-2 -translate-x-2 pt-[5px]">
              {todo.tasks.map((task: any) => (
                <li
                  key={task.id}
                  className="flex items-center text-[13.5px] text-[#333333] line-clamp-1 overflow-hidden"
                >
                  <span className="truncate">{task.text}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-300 mt-2 w-[340px] -translate-x-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentToDos;
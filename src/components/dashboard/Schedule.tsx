import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export default function Schedule() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentDate] = useState(today.getDate());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDaysInMonth = (year: any, month: any) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: any, month: any) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const formatCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
    return `${dayName}, ${monthName} ${day}`;
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1);
    
    const days = [];

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        currentMonth: false
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        currentMonth: true
      });
    }

    // Next month days
    const remainingDays = 35 - days.length; // Changed from 42 to 35 for 5 weeks instead of 6
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        currentMonth: false
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => prev === 0 ? 11 : prev - 1);
    if (currentMonth === 0) {
      setCurrentYear(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => prev === 11 ? 0 : prev + 1);
    if (currentMonth === 11) {
      setCurrentYear(prev => prev + 1);
    }
  };

  return (
    <div className="w-full font-sans">
      <div className="text-[22px] font-medium text-[#333333]  mt-8 ml-[2px] mb-[4px]">
        {formatCurrentDate()}
      </div>

      <div className="border-t-[1px] border-gray-200 pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex ml-[9px] text-sm text-[#808080]">
            {months[currentMonth]} {currentYear} <ChevronDown  className="ml-1 w-4 h-4 text-gray-600"/>
          </div>
          <div className="flex space-x-2">
            <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-[2px]">
          {weekDays.map(day => (
            <div key={day} className="text-xs text-gray-500 text-center pt-2">
              {day}
            </div>
          ))}
          
          {generateCalendarDays().map((day, index) => {
            const isToday = day.currentMonth && day.day === currentDate;
            
            return (
              <div
                key={index}
                className={`
                  text-xs py-2 text-center
                  ${day.currentMonth ? 'text-gray-900' : 'text-gray-400'}
                  ${isToday ? 'bg-indigo-100 rounded-full font-semibold' : ''}
                `}
              >
                {day.day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
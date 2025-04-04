import { SetStateAction, useState } from "react";
import {Dispatch} from "react"; 
import {X} from 'lucide-react'
interface SortedProps{
  isOpen: boolean,
  onClose: ()=> void,
  Active: string,
  setActive: Dispatch<SetStateAction<string>>;
}
export default function Modal({ isOpen, onClose, Active, setActive }:SortedProps) {
  const [selectedOption, setSelectedOption] = useState("By original post date");

  const handleSave = () => {
    console.log("Saved option:", Active);
    setActive(selectedOption);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 overflow-y-auto no-scrollbar">
      <div className="bg-white w-[500px]  h-[425px] rounded-xl shadow-lg px-6 py-3 mt-[230px] font-sans ml-[32px]">
        <div className="flex  mt-[2px]">
        <h2 className="text-[19px] font-medium mb-4 text-[#333333]">How should messages be sorted?</h2>
        <X className="ml-auto text-[#4D4D4D]" onClick={onClose}/>
        </div>
        <form className="mt-[12px] ml-[8px]">
          <div className="space-y-1">
            <label className="flex items-center space-x-2">
              <input
                type="radio" 
                name="sorting"
                value="By original post date"
                checked={selectedOption === "By original post date"}
                onChange={() => setSelectedOption("By original post date")}
                className="text-[#565DBD]"
              />
              <span className="text-[#333333] font-medium">By original post date</span>
            </label>
            <p className="text-[#808080] text-[12px] ml-6">The most recent message will appear first, followed by older ones.</p>
            
            <label className="flex items-center space-x-2 pt-[18px]">
              <input
                type="radio"
                name="sorting"
                value="By latest comment"
                checked= {selectedOption==="By latest comment"}
                onChange={() => setSelectedOption("By latest comment")}
                className="text-[#565DBD]"
              />
              <span className="text-[#333333] font-medium">By latest comment</span>
            </label>
            <p className="text-[#808080] text-[13px] ml-6 mt-2">Messages with recent comments will be shown first, regardless of when the message was posted.</p>
            
            <label className="flex items-center space-x-2 pt-4">
              <input
                type="radio"
                name="sorting"
                value="Alphabetically A-Z"
                checked={selectedOption === "Alphabetically A-Z"}
                onChange={() => setSelectedOption("Alphabetically A-Z")}
                className="text-[#565DBD]"
              />
              <span className="text-[#333333] font-medium ">Alphabetically A-Z</span>
            </label>
            <p className="text-[#808080] text-[13px] ml-6">Messages will be organized alphabetically by title.</p>
          </div>
        </form>
        <p className="text-[#333333] text-[15px]  mt-6">Everyone on the project will see messages in this order after you save.</p>
        <div className="flex justify-end space-x-3 mt-[34px]">
        <button
            onClick={handleSave}
            className="bg-[#5D56BD] text-white px-4 py-2 text-[13px] rounded-lg font-light"
          >
            Save Change
          </button>
          <button
            onClick={onClose}
            className="bg-[#999999] text-white px-4 py-2 text-[13px] rounded-lg font-light"
          >
            Never mind
          </button>
         
        </div>
      </div>
    </div>
  );
}

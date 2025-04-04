import { useState, useEffect } from "react";
import Image from 'next/image';
import editIcon from '../../../../public/assets/Edit Button.png';
import deleteIcon from '../../../../public/assets/deleteIcon.png';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  messageOption: Array<string>;
  onUpdateMessageOption: (updatedOptions: string[]) => void;
}

const EditModal = ({ isOpen, onClose, messageOption, onUpdateMessageOption }: EditModalProps) => {
  const [newCategory, setNewCategory] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedCategory, setEditedCategory] = useState("");

  // Add a new category
  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      const updatedCategories = [...messageOption, newCategory];
      onUpdateMessageOption(updatedCategories); // Update parent state
      setNewCategory("");
      setIsAdding(false);
    }
  };

  // Delete a category
  const handleDeleteCategory = (index: number) => {
    const updatedCategories = messageOption.filter((_, i) => i !== index);
    onUpdateMessageOption(updatedCategories); // Update parent state
  };

  // Save edited category
  const handleSaveEdit = (index: number) => {
    if (editedCategory.trim() === "") return; // Validate new name
    const updatedCategories = [...messageOption];
    updatedCategories[index] = editedCategory;
    onUpdateMessageOption(updatedCategories); // Update parent state
    setEditingIndex(null); // Close editing mode
    setEditedCategory(""); // Clear edited category
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30  overflow-y-auto no-scrollbar">
      <div className="bg-white rounded-xl shadow-lg w-[485px]  mt-[240px] h-[420px] ml-2">
        <div className="flex justify-between items-center pt-3 pb-[5px] px-3 border-b pl-3">
          <div className="flex flex-col pl-3">
          <h2 className="text-[19px] text-[#333333] font-medium pt-[3px]">Edit Notice Board Categories</h2>
          <p className="text-[13px] text-[#808080] mb-3 mt-1">
            Set up categories for this Notice Board below.
          </p>
          </div>
          <button onClick={onClose} className="text-[#4D4D4D] hover:text-gray-700 -translate-y-5">
            ✖
          </button>
        </div>
        <div className="p-1 px-6">
          
          <ul>
            {messageOption.map((category, index) => (
              <div className="mt-[2px]">
              <li
                key={index}
                className="flex justify-between items-center py-2 text-[18px]">
                {editingIndex === index ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editedCategory}
                      onChange={(e) => setEditedCategory(e.target.value)}
                      className="flex-grow border border-gray-300 rounded-l px-3 py-2"
                    />
                    <button
                      onClick={() => handleSaveEdit(index)}
                      className="bg-[#6BBD56] text-white px-3 py-2 rounded-r hover:bg-green-600 ml-auto"
                    >
                      ✔
                    </button>
                    <button
                      onClick={() => {
                        setEditingIndex(null);
                        setEditedCategory(""); // Reset edit state
                      }}
                      className="bg-[#FF0000] ml-2 px-3 py-2 text-white hover:bg-red-700"
                    >
                      ✖
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center w-full font-sans group">
                    <span className="text-[#333333] mb-2 text-[15.5px]">{category}</span>
                    <div className="flex items-center space-x-2 ml-auto opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => {
                          setEditingIndex(index); 
                          setEditedCategory(category); 
                        }}
                        className="text-yellow-500 hover:text-yellow-700 ml-auto"
                      >
                        <Image src={editIcon} alt="edit" width={24} height={24} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(index)}
                        className="text-[#FF0000] hover:text-red-700"
                      >
                        <Image src={deleteIcon} alt="delete" width={24} height={24} />
                      </button>
                    </div>
                  </div>
                )}
              </li>
              <hr className="w-[480px] -translate-x-6"/>
              </div>
            ))}
          </ul>
          {isAdding ? (
            <div className="flex items-center mt-4">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name..."
                className="flex-grow border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
              />
              <button
                onClick={handleAddCategory}
                className="bg-[#6BBD56] text-white px-3 py-2 rounded-r hover:bg-green-600 ml-2"
              >
                ✔
              </button>
              <button
                onClick={() => {
                  setNewCategory("");
                  setIsAdding(false);
                }}
                className="bg-[#FF0000] ml-2 px-3 py-2 text-white hover:bg-red-700"
              >
                ✖
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="mt-[27px] bg-[#565DBD] text-white px-3 py-2 text-[13.5px] rounded-lg"
            >
              Add Category
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditModal;

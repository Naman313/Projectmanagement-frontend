import React, { useState, useMemo, Dispatch, SetStateAction } from "react";
import {
  X,
  Link,
  RotateCcw,
  Paperclip,
  Search,
  ChevronDown,
} from "lucide-react";
import axios from "axios";

interface Notes {
  notes: string;
  setNotes: Dispatch<SetStateAction<string>>;
  fromTodo: boolean;
}
function TextareaBox({ notes, setNotes, fromTodo }: Notes) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFileUrl(response.data.fileUrl);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed", error);
      alert("File upload failed.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    setNotes(newValue); // Update parent component state
  };

  return (
    <div className={`flex flex-col flex-grow border rounded-sm ${fromTodo ? 'h-[220px]' : 'h-[400px]'} border-[#CCCCCC]` }>
      <div className="flex items-center gap-2 border-b p-2">
        <button className="p-1 hover:bg-gray-100 rounded">
          <span className="font-bold">B</span>
        </button>
        <button className="p-1 hover:bg-gray-100 rounded italic">
          <span>I</span>
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Link className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="h-4 w-px bg-gray-300 mx-1" />
        <button className="p-1 hover:bg-gray-100 rounded">
          <div className="w-4 h-4 flex flex-col justify-center items-center gap-1">
            <div className="w-3 h-px bg-gray-600" />
            <div className="w-3 h-px bg-gray-600" />
          </div>
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <div className="w-4 h-4 flex flex-col justify-center items-center gap-1">
            <div className="w-1 h-px bg-gray-600" />
            <div className="w-3 h-px bg-gray-600 ml-2" />
          </div>
        </button>
        <div className="flex-grow" />
        <button className="p-1 hover:bg-gray-100 rounded flex items-center gap-1 text-gray-600">
          <Paperclip className="w-4 h-4" />
          <input type="file" name="singleFile" onChange={handleFileChange} />
          {/* <span className="text-sm">Attach files</span> */}
        </button>
      </div>
      <textarea
        placeholder="Note..."
        className="w-full p-2 rounded-b-lg focus:ring-0 focus:outline-none"
        rows={10}
        value={notes}
        onChange={handleChange}
      />
    </div>
  );
}

export default TextareaBox;

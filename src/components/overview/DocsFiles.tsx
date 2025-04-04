import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Divide, Plus, TextIcon } from "lucide-react";
import folderIcon from "../../../public/assets/Folder Icon.png";
import docxIcon from "../../../public/assets/File Icon.png";
import jpegIcon from "../../../public/assets/jpg Icon.png";
import figmaIcon from "../../../public/assets/Figma Icon.png";
import txtIcon from '../../../public/assets/Text Icon.png';
import DocsDescription from "./Docs&Files/DocsDesciption";
function DocsFiles() {



  const [messageOptions] = useState([
    "Unsorted",
    "Sort by name",
    "Sort by date",
    "Sort by comments",
  ]);
  const linkedServices = [
    { name: 'Create a new doc', color: 'text-red-600' },
    { name: 'Make a new folder', color: 'text-yellow-500' },
    { name: 'upload files', color: 'text-blue-500' },
    { name: 'Adobe Creative Cloud', color: 'text-red-600' },
    { name: 'Airtable', color: 'text-yellow-500' },
    { name: 'Box', color: 'text-blue-500' },
    { name: 'Dropbox', color: 'text-blue-600' },
    { name: 'Figma', color: 'text-pink-500' },
    { name: 'Google Drive', color: 'text-green-500' },
    { name: 'iCloud Drive', color: 'text-gray-500' },
    { name: 'InVision', color: 'text-red-500' },
    { name: 'Notion', color: 'text-black' },
  ];
  interface DataInterface {
    id: string | number;
    type: string;
    title: string;
    description: string;
  }
  const [isDropMessage, setIsDropMessage] = useState<boolean>(false);
  const [isAddDocs, setisAddDocs] = useState<boolean>(false);
  const [selectedOptionMessage, setSelectedOptionMessage] = useState("Unsorted");
  const [isNewFolder, setisNewFolder] = useState<boolean>(false);
  const [isDocsDescription, setisDocsDescription] = useState<boolean>(false);

  const [newFolderName, setNewFolderName]= useState<string>("")
  const [datas, setDatas] = useState<DataInterface[]>([
    { id: "1", type: "Folder", title: "ProjectAtlas", description: "2 items" },
    { id: "2", type: "docs", title: "UI design guide", description: "A complete guide to user interface and more" },
    { id: "3", type: "txt", title: "ReadMe", description: "Text file with project details" },
    { id: "4", type: "jpg", title: "UI Mockup", description: "5.0 MB" },
    { id: "5", type: "figma", title: "Figma File", description: "Visual representations of the app's structure, focusing on the placement of elements and user interactions." }
  ]);
  const handleMessageOptionClick = (option: string) => {
    setSelectedOptionMessage(option);
    setIsDropMessage(false);
  };
  const handleSave = () => {
    setDatas(prevDatas => [
      ...prevDatas,
      {
        id: Date.now(),
        type: "Folder",
        title: newFolderName, // Use the user-entered name
        description: ""
      }
    ]);
    setisNewFolder(false);
    setNewFolderName(""); // Reset input field after adding
  };
  
 
  const handleClick = (e: string) => (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("hlo world")
    if (e === "Make a new folder") {
      setisNewFolder(true)
    }
    setisAddDocs(false)
  }

  
  return (
    <>
    {isDocsDescription ? <DocsDescription isOpenDetail={isDocsDescription} onClose={()=> setisDocsDescription(false)}/>:<div className="pl-6 pr-6 pb-0">
      <nav className="flex items-center justify-between mb-6 text-gray-600 text-sm">
        <div className="flex items-center space-x-2">
          <Link href="/main/dashboard" className="hover:text-gray-900">Dashboard</Link>
          <span className="text-gray-400">›</span>
          <Link href="/projects" className="hover:text-gray-900">Project Atlas</Link>
          <span className="text-gray-400">›</span>
          <span className="text-black">Docs & Files</span>
        </div>
      </nav>

      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              className="flex items-center px-6 py-2 bg-[#5D56BD] text-white rounded-lg mt-4"
              onClick={() => setisAddDocs(!isAddDocs)}
            >
              <Plus className="mr-2" /> Add Docs and Files
            </button>

            {isAddDocs && (
              <div className="absolute top-full  left-0 mt-2 w-auto bg-white border rounded-lg shadow-lg text-[#333333] z-10">
                {linkedServices.map((option, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 text-sm hover:bg-[#565DBD] hover:text-white cursor-pointer"
                    onClick={handleClick(option.name)}
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <input type="text" placeholder="Search message" className="mx-3 mt-4 px-6 py-2 border border-gray-200 rounded-lg text-sm" />
        </div>
        <div className="relative flex gap-6 px-6 py-2 mr-4">
          <button className="flex px-2 py-2 text-sm border border-gray-200 rounded-lg bg-white" onClick={() => setIsDropMessage((prev) => !prev)}>
            {selectedOptionMessage || "Unsorted"}
          </button>
          {isDropMessage && (
            <div className="absolute mt-2 w-36 bg-white border rounded-lg shadow-lg mr-4">
              {messageOptions.map((option) => (
                <div key={option} className="px-2 py-1 text-sm hover:bg-[#565DBD] hover:text-white cursor-pointer" onClick={() => handleMessageOptionClick(option)}>
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-[450px] bg-white rounded-lg overflow-y-auto mt-4 no-scrollbar">
        <div className="bg-white mt-4 rounded-lg">
          {isNewFolder &&
            <div className="flex border-b-2">
            <div className="flex pl-3 flex-row items-center space-x-2">
              <Image src={folderIcon} alt="New folder" width={50} height={30} />
            </div>
          
            <div className="flex w-full">
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  value= {newFolderName}
                  placeholder="Enter Folder name"
                  onChange={(e)=> setNewFolderName(e.target.value)}
                  className="p-2 w-full"
                />
                <div className="mt-2">
                  <div className="text-sm ml-3 mb-2">New Folder</div>
                </div>
              </div>
          
              <div className="ml-auto space-x-2">
                <div className="flex gap-2">
                <button className="ml-2 px-10 py-2 bg-[#5D56BD] text-white rounded-lg hover:bg-[#4b479c] mX-2" onClick={handleSave}>Save</button>
                <button className="px-10 py-2 bg-[#808080] text-white rounded-lg" 
                onClick={()=>setisNewFolder(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
          
          }
          {datas.map((data) => (
            <div key={data.id} className="p-3  border-b-2 flex items-center" onClick={()=> setisDocsDescription(true)}>
              {data.type === "Folder" && <Image src={folderIcon} alt="Folder" width={50} height={30} />}
              {data.type === "docs" && <Image src={docxIcon} alt="Document" width={50} height={30} />}
              {data.type === "jpg" && <Image src={jpegIcon} alt="JPEG File" width={50} height={30} />}
              {data.type === "figma" && <Image src={figmaIcon} alt="Figma File" width={50} height={30} />}
              {data.type === "txt" && <Image src={txtIcon} alt="Figma File" width={50} height={30} />}


              <div className="ml-4">
                <div className="text-[#333333] font-medium">{data.title}</div>
                <div className="text-[#808080] text-sm">{data.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>}
    
    </>
  );
}

export default DocsFiles;
import React, { MouseEventHandler, useState } from 'react';
import { Download } from 'lucide-react';
import Image from 'next/image';
import PinFalse from '../../../public/assets/myProjects/PinnedFalse Icon.png';
import Pin from '../../../public/assets/Pin.png';
import Trash from '../../../public/assets/myProjects/Trash Icon.png';
import Archive from '../../../public/assets/Archive Button.png';
import ArchiveFalse from '../../../public/assets/Archive Icon.png'
import NoticeBoard from '../../../public/assets/Notice Board Illustration.png'

interface PropValue{
  query: string;
}
const WithClients = ({query}:PropValue) => {
  const [projectData, setProjectData] = useState<any[]>([]);
  const colors= ["bg-teal-100 text-teal-600", "bg-rose-100 text-rose-600", 'bg-gray-100 text-gray-600', 'bg-orange-100 text-orange-600',  'bg-blue-100 text-blue-600', 'bg-blue-100 text-blue-600','bg-orange-100 text-orange-600' ]

  // const handleClick= (e: MouseEventHandler<HTMLImageElement>)=>{
  //     projectData.map((projectID, index)=>{
  //       if(projectID.id=== e){
  //         projectID.pinned= ![]
  //       }
  //     })
  // }

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-[555px] bg-white rounded-lg translate-x-1 ">
    <div className="flex flex-col items-center justify-center mb-12">
      <div className="translate-y-6">
        <Image
          src={NoticeBoard}
          alt="No Project Found"
          width={165}
          height={380}
        />
      </div>
      <h3 className="text-[#4D4D4D] text-lg mb-4 mt-2 translate-y-6">No With Client Project</h3>
    </div>
    
  </div>
  );

  if (!projectData.length) {
    return <EmptyState />;
  }

  return (
    <div className="w-full mx-auto">
      <div className="space-y-2">
        {projectData.filter((project)=> project.name.toLowerCase().includes(query).trim()).map((project) => (
          <div
            key={project.id}
            className="flex items-start justify-between p-4 hover:bg-blue-50 bg-[#FAFAFA] rounded-lg max-w-10xl"
          >
            <div className="flex items-center">
              <div
                className={`w-10 h-10 ${colors[Math.floor(Math.random()*10)%colors.length]} rounded-lg flex items-center justify-center font-medium`}
              >
                {project.letter}
              </div>
              <div className='pl-6'>
                <h3 className="text-sm font-medium text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-500">{project.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
            <div className='border-2'>
              <button className="p-2 text-gray-400 hover:text-gray-600"
              >
                <Image
                  src={project.pinned ? Pin : PinFalse}
                  alt="pin"
                  width={20}
                  height={20}
                  // onClick= {(project.id)=> handleClick}
                />
              </button>
              </div>
              <div className='border-2'>
              <button className="p-2 text-gray-400 hover:text-gray-600">
              <Image
                  src={project.archived ? Archive : ArchiveFalse}
                  alt="pin"
                  width={20}
                  height={20}
                  // onClick= {(project.id)=> handleClick}
                />
              </button>
              </div>
              <div className='border-2'>
              <button className="p-2 text-gray-400 hover:text-red-600">
                <Image src={Trash} alt="Trash" width={20} height={20} />
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WithClients;

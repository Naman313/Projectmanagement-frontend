import React, { useState } from 'react'
import Image from 'next/image';
import googleMeet from '../../../../public/assets/Google Meet image.png';
import avtar from '../../../../public/assets/avtar.jpg'
import TextareaBox from '../Textarea/TextareaBox';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';

interface DetailProps {
    isOpenDetail: boolean;
    onClose: () => void;
}

const noticeData = {

    title: "Project Kickoff Meeting",
    addedBy: "Naman Dubey",
    date: "22 Jan 2024",
    category: "none",
    watchers: [
        { name: "Sandesh", avatar: "/api/placeholder/32/32" },
        { name: "Prashant", avatar: "/api/placeholder/32/32" },
        { name: "Tarush", avatar: "/api/placeholder/32/32" },
        { name: "Naman", avatar: "/api/placeholder/32/32" }
    ],
    avtar: '/api/placeholder/32/32',
    dueDate: "15 Aug 2024",
    image: "../../../../public/assets/Google Meet image.png",
    notes: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque commodi illum id ex inventore, at nulla? Exercitationem, eligendi voluptatem nobis, voluptatum nisi harum rerum, dolorum ipsam mollitia fuga ab obcaecati. Nobis autem, ex molestias qui illum at consectetur rem. Asperiores nam reiciendis consequatur nisi assumenda magnam autem quam est illo, vero quibusdam recusandae, nostrum fugiat, ipsam amet iusto doloremque consectetur."
    ],
    comments: [
        {
            user: {
                name: "Naman",
                role: "Team Leader",
                avatar: "/api/placeholder/32/32"
            },
            date: "Wed 22 Jan 2024",
            time: "12:45",
            content: "@Esther Howard Sure"
        },
        {
            user: {
                name: "Tarush",
                role: "Project Manager",
                avatar: "/api/placeholder/32/32"
            },
            date: "Mon on 16 Jan 2024",
            time: "14:45",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur doloribus laboriosam voluptate aut eum harum earum odio, a voluptas quaerat iste, amet iure! Quae officia praesentium repudiandae quibusdam adipisci quod? Atque, obcaecati blanditiis! Doloremque, voluptas blanditiis. Assumenda pariatur officiis ex perspiciatis, voluptatibus iusto quam molestias delectus hic ratione possimus provident tempora repellat in quisquam soluta voluptas repellendus maiores aut quod?"
        }
    ]
};
const DocsDescription= ({ isOpenDetail, onClose }: DetailProps) => {

    const [notice, setNotice]= useState("")
    const handleClick = () => {
        onClose()
    }
    if (!isOpenDetail) return null;
    return (
        <>
        <div className="pl-6 pr-6 pb-0">
        <nav className="flex items-center justify-between mb-6 text-gray-600 text-sm">
                <div className="flex items-center space-x-2">
                  <Link href="/main/dashboard" className="hover:text-gray-900">
                    Dashboard
                  </Link>
                  <span className="text-gray-400">›</span>
                  <Link href="/projects" className="hover:text-gray-900">
                    Project Atlas 
                  </Link>
                  <span className="text-gray-400">›</span>
                  <span className="text-black">Notice Board</span>
                </div>
              </nav>
            </div>
            <div>
                <button className="flex flex-row justify-center items-center px-6 py-2 bg-[#5D56BD] text-white rounded-lg mx-4 my-2" onClick={handleClick} >
                    {" <- "}Go Back
                </button>
                <div className="mx-4 my-2 p-4 bg-white rounded-lg shadow">

                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex justify-between items-start">
                            <div className="flex">
                                {/* <h1 className="text-lg font-medium text-gray-900">{todoData.title}</h1> */}
                                <div className="mt-1 text-sm text-gray-500">

                                    Produced by: <span className="font-medium">{noticeData.addedBy}</span> on {noticeData.date}
                                </div>
                            </div>

                            {/* <button className="p-2 hover:bg-gray-100 rounded-full">
                            <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button> */}
                        </div>
                        <div className='my-3 text-gray-500'>Category: {noticeData.category}</div>
                        <div><h1>{noticeData.title}</h1></div>
                        {/* Meta Information */}
                        <div className="mt-4 gap-6">
                            {noticeData.notes}
                        </div>
                        <div className='flex justify-center my-4'>
                            <div className=''>
                                <Image src={googleMeet} alt="googleLink" width={500} height={500} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-">
                            <span className="text-sm text-gray-500">When post, notify</span>
                            <div className="flex -space-x-2  text-white border-b-2">
                                {noticeData.watchers.map((watcher, index) => (
                                    <div className="flex items-center gap-1 p-1 ml-2"
                                        key={index}>
                                        <div className=
                                        'flex justify-center items-center bg-[#5D56BD] rounded-full ml-2 p-2'>
                                            <Image
                                                src={avtar}
                                                alt="photo"
                                                className=" rounded-full"
                                                width={48}
                                                height={48}
                                            />
                                            <div className="text-sm font-medium  text-white rounded-xl p-2 ">{watcher.name}</div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>


                    </div>
                </div>



                {/* Comments */}
                <div className='mb-2'>
                <div className="mx-4 my-4 bg-white p-4 rounded-lg  border-b-2">
                    <h2 className="text-sm font-medium text-gray-900 ">Comments</h2>
                    {/* Comment Input */}
                    <div className="mt-4 flex gap-3 border-b-2">
                        <Image
                            src="/api/placeholder/32/32"
                            alt="User avatar"
                            className="w-8 h-8 rounded-full"
                            width={48}
                            height={48}
                        />
                        {/* <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                className="w-full p-2 border rounded-lg focus:ring-2"
                            />
                        </div> */}
                        <div className='flex flex-grow'>
                        <TextareaBox fromTodo={false} notes={notice} setNotes={setNotice}/>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {noticeData.comments.map((comment, index) => (
                            <div key={index} className="flex gap-3">
                                <div>
                                    <Image
                                        src={comment.user.avatar}
                                        alt={comment.user.name}
                                        className="rounded-full"
                                        width={48}
                                        height={48}
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-sm">{comment.user.name}</span>
                                            <span className="text-xs text-gray-500">({comment.user.role})</span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 mb-1">
                                        {comment.date} {comment.time}
                                    </div>
                                    <p className="text-sm text-gray-600">{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
            </div>
        </>
    )
}

export default DocsDescription
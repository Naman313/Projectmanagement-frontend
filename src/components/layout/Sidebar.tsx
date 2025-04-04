"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MyProjects from '../myProjects/MyProjects';
import Image from 'next/image';
import NoticeBoard from '../../../public/assets/Notice Board Illustration.png';
import DashboardFalse from '../../../public/assets/Dashboard/Dashboard Icon False.png';
import DashboardTrue from '../../../public/assets/Dashboard/Dashboard icon.png';
import Tracker from '../../../public/assets/Dashboard/tracker icon.png';
import Pings from '../../../public/assets/Dashboard/ping icon.png';
import Hey from '../../../public/assets/Dashboard/Hey icon.png';
import Activity from '../../../public/assets/Dashboard/Activity icon.png';
import Mystuff from '../../../public/assets/Dashboard/my stuff icon.png';
import Logo from '../../../public/assets/Logo Icon.png';
import PingsTrue from '../../../public/assets/Dashboard/Pings True.png'
import HeyTrue from '../../../public/assets/Dashboard/Hey True.png';
import ActivityTrue from '../../../public/assets/Dashboard/Activity True.png';
import MystuffTrue from '../../../public/assets/Dashboard/My stuff True.png';
import { ChevronRight } from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        {
            label: 'Dashboard',
            href: '/main/dashboard',
            icon: pathname === '/main/dashboard' ? DashboardTrue : DashboardFalse,
            isActive: pathname === '/main/dashboard',
        },
        {
            label: 'Pings',
            href: '/main/pings',
            icon: pathname === '/main/pings' ? PingsTrue : Pings,
            isActive: pathname === '/main/pings',
        },
        {
            label: 'Hey',
            href: '/main/hey',
            icon: pathname === '/main/hey' ? HeyTrue : Hey,
            isActive: pathname === '/main/hey',
        },
        {
            label: 'Activity',
            href: '/main/activity',
            icon: pathname === '/main/activity' ? ActivityTrue : Activity,
            isActive: pathname === '/main/activity',
        },
        {
            label: 'My Stuff',
            href: '/main/my-stuff',
            icon: pathname === '/main/my-stuff' ? MystuffTrue : Mystuff,
            isActive: pathname === '/main/my-stuff',
        },
        {
            label: 'Tracker',
            href: '/main/tracker',
            icon: Tracker,
            isActive: pathname === '/main/tracker',
        },
    ];


    return (
        <aside className="bg-white min-h-screen text-sm">

            <div className="flex items-center justify-center mb-4 ml-1 mt-[34px]">
                <Image src={Logo} alt="Logo" width={28} height={28} className='-translate-x-[15px]' />
                <span className="text-base font-rosario font-bold text-[#333333] -translate-x-[6px]">
                    <span className="font-rosario text-[#333333] font-bold text-xl">B</span>lackcofferToDos
                </span>
            </div>
            <nav className="flex flex-col space-y-2 pt-[17px] font-sans">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-row font-sans items-center py-[3px] relative rounded-md text-xs mr-[16px] mt-[1px]
                    ${item.isActive
                                ? "text-[#565dbd] bg-[#565dbd]/5 before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-[#565dbd] before:rounded-r"
                                : "text-[#4d4d4d] hover:bg-gray-50"
                            } transition-all duration-200 text-xs`}
                    >
                        <div className='flex space-x-4 ml-5 py-1'>
                            <Image src={item.icon} alt="icon" className='w-[19px] h-[19px] ml-[1px]' />
                            <span className="text-[12.5px] font-medium pt-[2px]">{item.label}</span>
                        </div>
                    </Link>
                ))}
            </nav>

            <hr className="my-5 mx-[13px] bg-[#000000]/10 h-[1px]" />

            {/* Projects Section */}
            <div className="mt-1 font-sans">
                <div className="flex items-center justify-between mb-2 pt-[13px] ">
                    <h2 className="font-medium text-[15px] text-[#000000] pl-[22px] font-sans">My Projects</h2>
                    <Link href="/main/myprojects" className="flex items-center  gap-[2px] text-[#5D56BD]  font-medium text-[11px] hover:text-[#4A4495] -translate-x-[18px]">
                        Show all
                        <ChevronRight className="w-[18px] h-[18px] text-[#5D56BD]  pl-[5px] -translate-x-[3px]" />
                    </Link>
                </div>
                <MyProjects />
            </div>
        </aside>

    );
}

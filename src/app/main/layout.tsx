
import { Inter } from 'next/font/google'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BlackcofferToDos',
  description: 'Task management and collaboration platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <div className="flex ">
          <div className="w-[208px]  top-0 h-screen">
          <Sidebar />
          </div>
            <main className="flex-1 overflow-y-scroll no-scrollbar w-[1448px]">

              {children}
            </main>
        </div>

  )
}
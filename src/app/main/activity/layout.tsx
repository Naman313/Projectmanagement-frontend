import React from 'react';
import Header from '@/components/pings/Header';

export default function ActivityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 mt-6 space-y-4">
          <Header propValue='Activity'/>
          {children}
          
        </div>
  );
}  
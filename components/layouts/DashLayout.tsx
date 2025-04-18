'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Bell, ChevronDown, ListFilter } from 'lucide-react';
import { Sidebar } from '../widgets';

const DashLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const userInfo = {
    name: 'Nur Hasan',
    role: 'Merchant',
  }; // this needs to be changed using local stroage interacted with backend

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">Hello, {userInfo.name}</h2>
            <p className="text-sm text-gray-500">
              {new Intl.DateTimeFormat('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: '2-digit',
              }).format(new Date())}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center gap-2 border border-gray-400 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100">
              <ListFilter className="w-4 h-4 text-indigo-900" />
              Last 7 Days
            </button>
            <Link
              className="relative block rounded-full border-gray-300 border-1 p-1 cursor-pointer"
              href="/dashboard/notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500" />
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <div className="bg-gray-300 w-8 h-8 rounded-full" />
              <div>
                <p className="font-medium">{userInfo.name}</p>
                <p className="text-gray-500">{userInfo.role}</p>
              </div>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default DashLayout;

'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Bell, ChevronDown } from 'lucide-react';
import { SidebarMerchant } from '../widgets';

const DashLayout: React.FC<{ children: ReactNode; titleArea: ReactNode; tools?: ReactNode }> = ({
  children,
  titleArea,
  tools,
}) => {
  const userInfo = {
    name: 'Nur Hasan',
    role: 'Merchant',
  }; // this needs to be changed using local stroage interacted with backend

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <SidebarMerchant />
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 space-y-6 md:ml-64 transform transition-transform duration-300 ease-in-out max-w-full md:max-w-[calc(100%-16rem)]">
        <div className="flex justify-between items-center ml-12 md:ml-0 h-10">
          <div>{titleArea}</div>
          <div className="flex items-center gap-4">
            {tools}
            <Link
              className="relative block rounded-full border-gray-300 border-1 p-1 cursor-pointer"
              href="/merchant/notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-[7px] block h-2 w-2 rounded-full bg-red-500" />
            </Link>
            <div className="md:flex items-center gap-2 text-sm hidden">
              <div className="bg-gray-300 w-8 h-8 rounded-full" />
              <div>
                <p className="font-medium truncate">{userInfo.name}</p>
                <p className="text-gray-500 truncate">{userInfo.role}</p>
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

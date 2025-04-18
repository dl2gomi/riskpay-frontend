'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logoImg from '@/assets/images/logo.svg';
import dashIcon from '@/assets/images/icons/dashboard.svg';
import transIcon from '@/assets/images/icons/transactions.svg';
import payLinkIcon from '@/assets/images/icons/paymentLink.svg';
import integIcon from '@/assets/images/icons/integrations.svg';
import balanceIcon from '@/assets/images/icons/balance.svg';
import settingsIcon from '@/assets/images/icons/settings.svg';
import logoutIcon from '@/assets/images/icons/logout.svg';

const Sidebar = () => {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const subpath = pathname.substring(pathname.indexOf('/dashboard') + '/dashboard'.length);

      if (subpath.startsWith('/transactions')) {
        setCurrentTab('transactions');
      } else if (subpath.startsWith('/payments')) {
        setCurrentTab('payments');
      } else if (subpath.startsWith('/integration')) {
        setCurrentTab('integration');
      } else if (subpath.startsWith('/balances')) {
        setCurrentTab('balances');
      } else if (subpath.startsWith('/settings')) {
        setCurrentTab('settings');
      } else {
        setCurrentTab('dashboard');
      }
    }
  }, [pathname]);

  return (
    <aside className="w-64 bg-white p-4 flex flex-col">
      <div className="h-24 px-4 py-3">
        <Link href="/">
          <Image alt="RiskPay" src={logoImg} className="h-10 w-auto" />
        </Link>
      </div>
      <div className="flex-1 overflow-auto flex flex-col justify-between">
        <div className="space-y-1">
          <Link
            className={`block px-3 py-2 rounded-lg cursor-pointer ${currentTab === 'dashboard' ? 'bg-red-100' : ''}`}
            href="/dashboard"
          >
            <div className="flex items-center gap-3 text-sm font-medium">
              <Image src={dashIcon} alt="Dashboard Icon" width={16} /> Dashboard
            </div>
          </Link>
          <Link
            className={`block px-3 py-2 rounded-lg cursor-pointer ${currentTab === 'transactions' ? 'bg-red-100' : ''}`}
            href="/dashboard/transactions"
          >
            <div className="flex items-center gap-3 text-sm font-medium">
              <Image src={transIcon} alt="Transactions Icon" width={16} /> Transactions
            </div>
          </Link>
          <Link
            className={`block px-3 py-2 rounded-lg cursor-pointer ${currentTab === 'payments' ? 'bg-red-100' : ''}`}
            href="/dashboard/payments"
          >
            <div className="flex items-center gap-3 text-sm font-medium">
              <Image src={payLinkIcon} alt="Payment Icon" height={16} /> Payment Links
            </div>
          </Link>
          <Link
            className={`block px-3 py-2 rounded-lg cursor-pointer ${currentTab === 'integration' ? 'bg-red-100' : ''}`}
            href="/dashboard/integration"
          >
            <div className="flex items-center gap-3 text-sm font-medium">
              <Image src={integIcon} alt="Integrations Icon" height={16} /> Integrations
            </div>
          </Link>
          <Link
            className={`block px-3 py-2 rounded-lg cursor-pointer ${currentTab === 'balances' ? 'bg-red-100' : ''}`}
            href="/dashboard/balances"
          >
            <div className="flex items-center gap-3 text-sm font-medium">
              <Image src={balanceIcon} alt="Balance Icon" height={16} /> Balance and Payouts
            </div>
          </Link>
        </div>
        <div className="mt-auto pt-6">
          <Link
            className={`block px-3 py-2 rounded-lg cursor-pointer ${currentTab === 'settings' ? 'bg-red-100' : ''}`}
            href="/dashboard/settings"
          >
            <div className="flex items-center gap-3 text-sm font-medium">
              <Image src={settingsIcon} alt="Settings Icon" height={16} /> Settings
            </div>
          </Link>
          <Link
            className={`block px-3 py-2 rounded-lg cursor-pointer ${currentTab === 'settings' ? 'bg-red-100' : ''}`}
            href="/"
          >
            <div className="flex items-center gap-3 text-sm font-medium">
              <Image src={logoutIcon} alt="Logout Icon" height={16} /> Log Out
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

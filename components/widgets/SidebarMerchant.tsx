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
import { Menu, X } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pathname) {
      const subpath = pathname.substring(pathname.indexOf('/merchant') + '/merchant'.length);
      if (subpath.startsWith('/transactions')) setCurrentTab('transactions');
      else if (subpath.startsWith('/products')) setCurrentTab('products');
      else if (subpath.startsWith('/integration')) setCurrentTab('integration');
      else if (subpath.startsWith('/finance')) setCurrentTab('finance');
      else if (subpath.startsWith('/settings')) setCurrentTab('settings');
      else setCurrentTab('dashboard');
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          className={`p-2 rounded-full bg-white text-gray-800 cursor-pointer ${
            isOpen ? 'translate-x-48' : 'translate-0 border border-gray-300'
          } transform transition-transform duration-300 ease-in-out`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white p-4 flex flex-col justify-between z-40 transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0 md:h-screen md:transform-none
  `}
      >
        <div>
          {/* Logo */}
          <div className="h-24 px-4 py-3">
            <Link href="/">
              <Image alt="RiskPay" src={logoImg} className="h-10 w-auto" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <SidebarLink href="/merchant" icon={dashIcon} label="Dashboard" active={currentTab === 'dashboard'} />
            <SidebarLink
              href="/merchant/transactions"
              icon={transIcon}
              label="Transactions"
              active={currentTab === 'transactions'}
            />
            <SidebarLink
              href="/merchant/products"
              icon={payLinkIcon}
              label="Products"
              active={currentTab === 'products'}
            />
            <SidebarLink
              href="/merchant/integrations"
              icon={integIcon}
              label="Integrations"
              active={currentTab === 'integration'}
            />
            <SidebarLink
              href="/merchant/finance"
              icon={balanceIcon}
              label="Finance"
              active={currentTab === 'finance'}
            />
          </div>
        </div>

        {/* Settings link at the bottom */}
        <div className="pb-6">
          <SidebarLink
            href="/merchant/settings"
            icon={settingsIcon}
            label="Settings"
            active={currentTab === 'settings'}
          />
          <SidebarLink href="/merchant/logout" icon={logoutIcon} label="Log Out" active={false} className="md:hidden" />
        </div>
      </aside>
    </>
  );
};

const SidebarLink = ({
  href,
  icon,
  label,
  active,
  className,
}: {
  href: string;
  icon: any;
  label: string;
  active: boolean;
  className?: string;
}) => (
  <Link href={href} className={`block px-3 py-2 rounded-lg cursor-pointer ${active ? 'bg-red-100' : ''} ${className}`}>
    <div className="flex items-center gap-3 text-sm font-medium">
      <Image src={icon} alt={`${label} Icon`} width={16} height={16} /> {label}
    </div>
  </Link>
);

export default Sidebar;

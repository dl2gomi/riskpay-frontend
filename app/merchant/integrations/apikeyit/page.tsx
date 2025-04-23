'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { InfoIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { DashLayout } from '@/components/layouts';

import fileCopyIcon from '@/assets/images/icons/file-copy-2-fill.svg';
import eyeFillIcon from '@/assets/images/icons/eye-fill.svg';
import arrowRightIcon from '@/assets/images/icons/arrow-right-line.svg';

const ApiKeyIntegrationPage = () => {
  const [viewingTestData, setViewingTestData] = useState(true);
  const searchParams = useSearchParams();
  const title = searchParams.get('title');

  return (
    <DashLayout
      titleArea={
        <>
          <h2 className="text-xl font-semibold">System Integrations</h2>
        </>
      }
    >
      <div className="p-6 bg-white rounded-lg space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <Link href="/merchant/integrations" className="text-sm text-gray-800 cursor-pointer">
            &larr; Back
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold">{title} API Integration Keys</div>
          <Link
            href="/merchant/help"
            className="flex items-center gap-1 text-sm text-[#DE0707] font-medium cursor-pointer"
          >
            Learn more about API authentication <Image src={arrowRightIcon} alt="to" className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-700 px-2">
            <InfoIcon fill="#777" stroke="white" className="w-5 h-5 rounded-full border-0" />
            Viewing test API Keys. Toggle to view live Keys
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Switch
              checked={!viewingTestData}
              onChange={() => setViewingTestData(!viewingTestData)}
              className={`${
                viewingTestData ? 'bg-gray-200' : 'bg-red-600'
              } relative inline-flex h-5 w-10 items-center rounded-full transition cursor-pointer`}
            >
              <span
                className={`${
                  viewingTestData ? 'translate-x-1' : 'translate-x-5'
                } inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </Switch>
            Viewing test data
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-1">Standard Key</h2>
          <p className="text-sm text-gray-600">
            These keys will allow you to authenticate API request.{' '}
            <Link href="/merchant/help" className="text-red-500 cursor-pointer">
              Learn more
            </Link>
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="text-gray-800 font-medium border-b border-gray-200">
                <th className="py-1">Name</th>
                <th className="py-1">Token</th>
                <th className="py-1">Last Used</th>
                <th className="py-1">Created</th>
                <th className="py-1">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {[
                { name: 'Publishable Key', token: 'pk_test_1234567890abcdefghijklmnopqrstuvwxyz', date: 'Feb 6, 2025' },
                { name: 'Secret Key', token: 'sk_test_1234567890abcdefghijklmnopqrstuvwxyz', date: 'Feb 6, 2025' },
              ].map((key, i) => (
                <tr key={key.name} className="">
                  <td className="pt-4 font-bold">{key.name}</td>
                  <td className="pt-4 truncate max-w-xs">{key.token}</td>
                  <td className="pt-4">{key.date}</td>
                  <td className="pt-4">Jan 6, 2025</td>
                  <td className="pt-4 flex gap-2">
                    <button title="Copy" className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                      <Image alt="Copy" src={fileCopyIcon} className="w-4 h-4" />
                    </button>
                    <button title="Show" className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                      <Image alt="Show" src={eyeFillIcon} className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-2 pt-4">
          <button className="bg-[#DE0707] hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer">
            Reset Publishable Key
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer">
            Reset Secret Key
          </button>
        </div>
      </div>
    </DashLayout>
  );
};

export default ApiKeyIntegrationPage;

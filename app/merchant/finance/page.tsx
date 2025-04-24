'use client';

import { DashLayout } from '@/components/layouts';
import { ListFilter } from 'lucide-react';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { MenuButton, MenuItem, MenuItems, Menu } from '@headlessui/react';
import { BalanceCard, Pagination } from '@/components/widgets';
import { ITEMS_PER_PAGE } from '@/consts/vars';
import { useApiRequest } from '@/hooks';
import { payoutsUrl } from '@/consts/paths';
import Toaster from '@/helpers/Toaster';
import { payoutDataMock } from '@/mock';
import { Payout, PayoutData } from '@/types/payout';

import walletIcon from '@/assets/images/icons/walletIcon.svg';
import chartIcon from '@/assets/images/icons/chartIcon.svg';
import bagIcon from '@/assets/images/icons/bagIcon.svg';
import { useRouter } from 'next/navigation';

const statusStyles: Record<Payout['status'], string> = {
  Approved: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Failed: 'bg-red-100 text-red-700',
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const periods = [0, 7, 15, 30];

const FinancePage = () => {
  const router = useRouter();

  const [period, setPeriod] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [payoutData, setPayoutData] = useState<PayoutData>({
    pagination: {
      totalLength: 0,
      itemsPerPage: 0,
      pageCount: 0,
      currentPage: 1,
    },
    data: [] as Payout[],
  });

  const {
    response: payoutResponse,
    error: payoutError,
    loading: payoutLoading,
    sendRequest: sendPayoutRequest,
  } = useApiRequest({
    endpoint: payoutsUrl,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer 124567890`, // this needs to be changed with the local storage key
    },
    method: 'GET',
    params: {
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      period,
    },
  });

  useEffect(() => {
    sendPayoutRequest();
  }, [period, currentPage]);

  useEffect(() => {
    if (payoutResponse) {
      // Handle the response data here
      setPayoutData(payoutResponse.data); // this should be changed according to the response structure, this is the real code
    }
  }, [payoutResponse]);

  useEffect(() => {
    if (payoutError) {
      Toaster.error(payoutError?.message);

      // mock data instead: remove this code in production mode
      setPayoutData(payoutDataMock);
    }
  }, [payoutError]);

  return (
    <DashLayout
      titleArea={
        <>
          <h2 className="text-xl font-semibold">Finance</h2>
        </>
      }
      tools={
        <>
          <Link
            href="/merchant/finance/accounts"
            className="rounded-full bg-white hover:bg-gray-100 cursor-pointer text-sm px-3 py-1.5 text-gray-700 transition border border-gray-200"
          >
            Payout Accounts
          </Link>
          <Link
            href="/merchant/finance/withdraw"
            className="rounded-full bg-red-600 hover:bg-red-500 cursor-pointer text-sm px-3 py-1.5 text-white transition"
          >
            Withdraw
          </Link>
        </>
      }
    >
      {/* balance amounts should be fetched from backend */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BalanceCard icon={walletIcon} label="Available Balance" amount={45445} />
        <BalanceCard icon={chartIcon} label="Total Balance" amount={4544.5} />
        <BalanceCard icon={bagIcon} label="Reserve Balance" amount={4545} />
      </div>

      <div className="p-4 bg-white rounded-lg">
        <div className="flex gap-4 flex-wrap mb-3 px-2 items-center justify-between">
          <div className="text-lg font-bold">Payouts List</div>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex items-center gap-2 border border-gray-400 px-3 py-1 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer">
                <ListFilter className="w-4 h-4 text-indigo-900" />
                {period === 0 ? 'All' : `Last ${period} days`}
              </MenuButton>
            </div>
            <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 ring-gray-300 focus:outline-none cursor-pointer">
              <div className="py-1">
                {periods.map((p, i) => (
                  <MenuItem key={i}>
                    <button
                      className="hover:bg-gray-100 hover:text-black text-gray-700 w-full px-4 py-2 text-left text-sm cursor-pointer"
                      onClick={() => setPeriod(p)}
                    >
                      {p === 0 ? 'All' : `Last ${p} days`}
                    </button>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>

        <div className="h-12 bg-gray-100 -mx-4" style={{ width: 'calc(100% + var(--spacing) * 8)' }} />

        <table className="table-auto w-full -mt-12">
          <thead className="bg-gray-100 text-xs font-semibold text-gray-700 mb-2">
            <tr className="h-12">
              <th className="p-2 text-left cursor-pointer">
                <div className="flex items-center">
                  <span>Created At</span>
                </div>
              </th>
              <th className="p-2 text-left cursor-pointer">
                <div className="flex items-center">
                  <span>Transaction ID</span>
                </div>
              </th>
              <th className="p-2 text-left cursor-pointer">
                <div className="flex items-center">
                  <span>Transfer Method</span>
                </div>
              </th>
              <th className="p-2 text-left cursor-pointer">
                <div className="flex items-center">
                  <span>Status</span>
                </div>
              </th>
              <th className="p-2 text-left cursor-pointer">
                <div className="flex items-center">
                  <span>Amount</span>
                </div>
              </th>
              <th className="p-2 text-left"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {payoutLoading && (
              <tr>
                <td colSpan={8} className="text-center p-6">
                  Loading Payouts History...
                </td>
              </tr>
            )}
            {!payoutLoading &&
              payoutData?.data?.length > 0 &&
              payoutData?.data.map((t, i) => (
                <tr
                  key={i}
                  className="h-10 hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/merchant/finance/payouts?id=${t.id}`)}
                >
                  {/* <td className="pl-4 w-8 h-full">
                    <div className="border-b border-b-gray-200 flex items-center h-full w-full">
                      <input type="checkbox" style={{ verticalAlign: 'middle' }} />
                    </div>
                  </td> */}
                  <td className="p-2 whitespace-nowrap border-b border-b-gray-200">
                    {t.createdAt.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </td>
                  <td className="p-2 whitespace-nowrap border-b border-b-gray-200">{t.txid}</td>
                  <td className="p-2 whitespace-nowrap border-b border-b-gray-200">
                    {t.method === 'bank' ? 'Bank' : 'Crypto'}
                  </td>
                  <td className="p-2 border-b border-b-gray-200">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[t.status]}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="p-2 font-semibold border-b border-b-gray-200">{`$${formatter.format(t.amount)}`}</td>
                  {/* <td className="p-2 text-gray-500 border-b border-b-gray-200">
                    <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors duration-200 ease-in-out cursor-pointer">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td> */}
                </tr>
              ))}
            {!payoutLoading && payoutData?.data?.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center p-6">
                  No Payout History
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-12">
          <Pagination
            totalLength={payoutData.pagination.totalLength}
            limit={payoutData.pagination.itemsPerPage}
            pageCount={payoutData.pagination.pageCount}
            page={payoutData.pagination.currentPage}
            pageClick={(p) => setCurrentPage(p)}
          />
        </div>
      </div>
    </DashLayout>
  );
};

export default FinancePage;

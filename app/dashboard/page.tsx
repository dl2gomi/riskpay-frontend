'use client';

import React from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import { DashLayout } from '@/components/layouts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import '@/assets/styles/dashboard.css';

const CustomTooltip: React.FC<{ payload?: Array<{ payload: { value: number | string } }>; label?: string }> = ({
  payload,
  label,
}) => {
  if (!payload || payload.length === 0) return null;

  const data = payload[0].payload; // Get the data from the tooltip
  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '10px', borderRadius: '5px' }}>
      <p className="text-sm">US$ {data.value}</p>
      <p className="text-xs">{label}</p>
    </div>
  );
};

const Dashboard = () => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const orderOverview = {
    gross: {
      amount: 45445.0,
      delta: 5,
    },
    paidOrder: {
      amount: 504,
      delta: -14,
    },
    averageSucceedOrder: {
      amount: 59,
      delta: 12,
    },
  }; // this needs to be changed using api request

  const salesData = [
    { month: 'Jan', value: 10 },
    { month: 'Feb', value: 440 },
    { month: 'Mar', value: 290 },
    { month: 'Apr', value: 280 },
    { month: 'May', value: 300 },
    { month: 'Jun', value: 350 },
    { month: 'Jul', value: 500 },
    { month: 'Aug', value: 310 },
    { month: 'Sep', value: 200 },
    { month: 'Oct', value: 330 },
    { month: 'Nov' },
    { month: 'Dec' },
  ]; // this needs to be changed using api

  const balanceData = {
    balance: 45445.0,
    payout: 5844.0,
    payoutDate: 'Feb 10',
  }; // this needs to be changed using api

  const orderStatus = {
    chargeback: {
      amount: 58,
      percent: 20,
    },
    paid: {
      amount: 74,
      percent: 35,
    },
    failed: {
      amount: 4,
      percent: 2,
    },
  }; // this needs to be fetched via api

  return (
    <DashLayout>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-3 lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 bg-white p-4 rounded-2xl">
            <div className="mt-4 mb-4 pl-4 pr-2 border-r-none lg:border-r border-gray-200">
              <p className="text-[#777B84] font-semibold text-sm mb-2 truncate overflow-hidden whitespace-nowrap">
                Gross Revenue
              </p>
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-bold">{`$${formatter.format(orderOverview?.gross?.amount ?? 0)}`}</h3>
                {(orderOverview?.gross?.delta ?? 0) > 0 && (
                  <p className="text-[#309147] text-xs bg-[#E9FFE1] px-2 rounded-xl truncate overflow-hidden whitespace-nowrap">
                    ▲ {orderOverview?.gross?.delta}%
                  </p>
                )}
                {(orderOverview?.gross?.delta ?? 0) < 0 && (
                  <p className="text-red-500 text-xs bg-red-100 px-2 rounded-xl truncate overflow-hidden whitespace-nowrap">
                    ▼ {orderOverview?.gross?.delta}%
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 mb-4 pl-4 pr-2 lg:pl-10 border-r-none lg:border-r border-gray-200">
              <p className="text-[#777B84] font-semibold text-sm mb-2 truncate overflow-hidden whitespace-nowrap">
                Paid Order
              </p>
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-bold">{`${orderOverview?.paidOrder?.amount ?? 0}`}</h3>
                {(orderOverview?.paidOrder?.delta ?? 0) > 0 && (
                  <p className="text-[#309147] text-xs bg-[#E9FFE1] px-2 rounded-xl truncate overflow-hidden whitespace-nowrap">
                    ▲ {orderOverview?.paidOrder?.delta}%
                  </p>
                )}
                {(orderOverview?.paidOrder?.delta ?? 0) < 0 && (
                  <p className="text-red-500 text-xs bg-red-100 px-2 rounded-xl truncate overflow-hidden whitespace-nowrap">
                    ▼ {orderOverview?.paidOrder?.delta}%
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 mb-4 pl-4 pr-2 lg:pl-10">
              <p className="text-[#777B84] font-semibold text-sm mb-2 truncate overflow-hidden whitespace-nowrap">
                Average Succeed Order
              </p>
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-bold">{`${orderOverview?.averageSucceedOrder?.amount ?? 0}%`}</h3>
                {(orderOverview?.averageSucceedOrder?.delta ?? 0) > 0 && (
                  <p className="text-[#309147] text-xs bg-[#E9FFE1] px-2 rounded-xl truncate overflow-hidden whitespace-nowrap">
                    ▲ {orderOverview?.averageSucceedOrder?.delta}%
                  </p>
                )}
                {(orderOverview?.averageSucceedOrder?.delta ?? 0) < 0 && (
                  <p className="text-red-500 text-xs bg-red-100 px-2 rounded-xl truncate overflow-hidden whitespace-nowrap">
                    ▼ {orderOverview?.averageSucceedOrder?.delta}%
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Sale Overview*/}
          <div className="bg-white p-6 rounded-2xl">
            <h4 className="font-semibold mb-2 text-[#777B84] text-xl">Sales Overview</h4>
            <p className="text-sm text-[#BEBEBE] mb-4">Track your company daily volume</p>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#9FA6B2" tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis
                  dataKey="value"
                  stroke="#9FA6B2"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => (value === 0 ? value : `$${value}`)}
                  tick={{ fontSize: 12 }}
                />
                <CartesianGrid stroke="#D2D6DC33" vertical={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#ef4444" fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-span-3 lg:col-span-1 space-y-4 w-full text-sm text-black">
          {/* Balance Section */}
          <div className="p-4 bg-white rounded-xl space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-[#777B84] font-semibold my-1">Balance in USD</h4>
                <p className="text-xl font-semibold my-2">{`$${formatter.format(balanceData?.balance)}`}</p>
                <p className="text-[#BEBEBE] my-1 truncate overflow-hidden whitespace-nowrap text-sm">
                  Estimate of future transfers
                </p>
              </div>
              <a
                href="#"
                className="font-normal text-gray-600 hover:underline truncate overflow-hidden whitespace-nowrap"
              >
                See Details
              </a>
            </div>

            <hr className="border-gray-200" />

            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-[#777B84] font-semibold my-1">Payout</h4>
                <p className="text-xl font-semibold my-2">{`$${formatter.format(balanceData?.payout)}`}</p>
                <p className="text-[#BEBEBE] my-1 truncate overflow-hidden whitespace-nowrap text-sm">
                  Expected on {balanceData?.payoutDate}
                </p>
              </div>
              <a
                href="#"
                className="font-normal text-gray-600 hover:underline truncate overflow-hidden whitespace-nowrap"
              >
                See Details
              </a>
            </div>
          </div>

          {/* Account Status Section */}
          <div className="p-4 bg-white rounded-xl">
            <h4 className="font-semibold text-[#090E18] mb-1 text-base">Account status</h4>
            <p className="text-sm text-[#BEBEBE] mb-4 truncate overflow-hidden whitespace-nowrap">
              Chargebacks, Paid / Failed order
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={orderStatus?.chargeback?.percent ?? 0}
                    text={`${orderStatus?.chargeback?.percent ?? 0}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                      pathColor: '#DE0707',
                      textColor: '#2E3033',
                      trailColor: '#FBF3F4',
                      textSize: '20px',
                    })}
                  />
                  <style>
                    {`
                      .CircularProgressbar-text {
                        font-weight: 600;
                        color: #090E18;
                      }
                    `}
                  </style>
                </div>
                <div>
                  <p className="font-semibold text-base text-[#090E18] truncate overflow-hidden whitespace-nowrap">
                    Chargebacks
                  </p>
                  <p className="text-sm text-[#BEBEBE] truncate overflow-hidden whitespace-nowrap">
                    {orderStatus?.chargeback?.amount ?? 0} in this period
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={orderStatus?.paid?.percent ?? 0}
                    text={`${orderStatus?.paid?.percent ?? 0}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                      pathColor: '#03AD5A',
                      textColor: '#2E3033',
                      trailColor: '#E5FDE5',
                      textSize: '20px',
                    })}
                  />
                  <style>
                    {`
                      .CircularProgressbar-text {
                        font-weight: 600;
                        color: #090E18;
                      }
                    `}
                  </style>
                </div>
                <div>
                  <p className="font-semibold text-base text-[#090E18] truncate overflow-hidden whitespace-nowrap">
                    Paid Orders
                  </p>
                  <p className="text-sm text-[#BEBEBE] truncate overflow-hidden whitespace-nowrap">
                    {orderStatus?.paid?.amount ?? 0} in this period
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={orderStatus?.failed?.percent ?? 0}
                    text={`${orderStatus?.failed?.percent ?? 0}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                      pathColor: '#DE0707',
                      textColor: '#2E3033',
                      trailColor: '#FBF3F4',
                      textSize: '20px',
                    })}
                  />
                  <style>
                    {`
                      .CircularProgressbar-text {
                        font-weight: 600;
                        color: #090E18;
                      }
                    `}
                  </style>
                </div>
                <div>
                  <p className="font-semibold text-base text-[#090E18] truncate overflow-hidden whitespace-nowrap">
                    Failed Orders
                  </p>
                  <p className="text-sm text-[#BEBEBE] truncate overflow-hidden whitespace-nowrap">
                    {orderStatus?.failed?.amount ?? 0} in this period
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashLayout>
  );
};

export default Dashboard;

'use client';

import { useEffect, useState } from 'react';

import { useApiRequest } from '@/hooks';
import { tfaStatusUrl } from '@/consts/paths';
import Toaster from '@/helpers/Toaster';
import Image from 'next/image';
import { SpinLoading } from 'respinner';

import checkCircle from '@/assets/images/icons/checkbox-circle-fill.svg';

const TFASlot = () => {
  const [status, setStatus] = useState({
    app: false,
    key: false,
    sms: false,
  });

  const {
    response: statusResponse,
    error: statusError,
    loading: statusLoading,
    sendRequest: sendStatusRequest,
  } = useApiRequest({
    endpoint: tfaStatusUrl,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer 124567890`, // this needs to be changed with the local storage key
    },
    method: 'GET',
  });

  useEffect(() => {
    sendStatusRequest();
  }, []);

  useEffect(() => {
    if (statusResponse) {
      // Handle the response data here
      setStatus(statusResponse.data); // this should be changed according to the response structure, this is the real code
    }
  }, [statusResponse]);

  useEffect(() => {
    if (statusError) {
      Toaster.error(statusError?.message);

      // mock data instead: remove this code in production mode
      setStatus({
        app: true,
        key: false,
        sms: false,
      });
    }
  }, [statusError]);

  return (
    <div className="pb-10">
      <h2 className="text-lg font-semibold mb-3">Two step verification</h2>
      <p className="text-gray-600 mb-3 text-sm">
        RiskPay two-step authentication in order to keep your account secure. By using either your phone or an
        authenticator app in addition to your password, you ensure that no one else can log in to your account.
      </p>
      <p className="text-gray-600 mb-6 text-sm">
        We encourage you to enable multiple forms of two-step authentication as a backup in case you lose your mobile
        device or lose service.
      </p>

      <div className="space-y-3 flex flex-col">
        <button
          disabled={statusLoading}
          className={`w-80 max-w-full border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2 text-sm font-medium hover:bg-blue-100 transition ${
            statusLoading ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {statusLoading && (
            <SpinLoading size={16} count={10} barWidth={3} barHeight={5} borderRadius={1} fill="gray" className="" />
          )}
          {status.app && <Image src={checkCircle} alt="Check" className="w-5 h-5" />}
          Use an authenticator app
        </button>
        <button
          disabled={statusLoading}
          className={`w-80 max-w-full border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2 text-sm font-medium hover:bg-blue-100 transition ${
            statusLoading ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {statusLoading && (
            <SpinLoading size={16} count={10} barWidth={3} barHeight={5} borderRadius={1} fill="gray" className="" />
          )}
          {status.key && <Image src={checkCircle} alt="Check" className="w-5 h-5" />}Add a Security Key
        </button>
        <button
          disabled={statusLoading}
          className={`w-80 max-w-full border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2 text-sm font-medium hover:bg-blue-100 transition ${
            statusLoading ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {statusLoading && (
            <SpinLoading size={16} count={10} barWidth={3} barHeight={5} borderRadius={1} fill="gray" className="" />
          )}
          {status.sms && <Image src={checkCircle} alt="Check" className="w-5 h-5" />}Use SMS
        </button>
      </div>
    </div>
  );
};

export default TFASlot;

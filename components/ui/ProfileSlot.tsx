'use client';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { CountryCode, getCountryCallingCode } from 'libphonenumber-js';
import { getName, getCodes } from 'country-list';

const countries = ['us', 'gb', 'br', 'ca', 'ae'];

const ProfileSlot = () => {
  const [country, setCountry] = useState('us');

  return (
    <div className="space-y-7 pb-6">
      <section>
        <h2 className="text-lg font-semibold mb-2">Profile Name & Phone</h2>
        <p className="text-sm text-gray-500 mb-4">
          Here you can change your password. To change password please fill up the form.
        </p>
        <div className="space-y-4 text-sm">
          <div>
            <label className="block font-medium mb-1">Profile Name</label>
            <input
              type="text"
              defaultValue="Nur Hasan Nishad"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <div className="flex">
              <div className="inline-flex items-center cursor-pointer w-34">
                <Listbox value={country} onChange={setCountry}>
                  <div className="relative">
                    <ListboxButton className="w-full border cursor-pointer border-r-0 border-gray-300 rounded-l-md px-4 py-2 text-sm text-gray-500 bg-white flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <div className="flex items-center justify-start cursor-pointer">
                        <Image
                          src={`https://flagcdn.com/32x24/${country}.png`}
                          alt={`${country} Flag`}
                          width={24}
                          height={18}
                        />
                        <span className="px-3">+{getCountryCallingCode(country.toUpperCase() as CountryCode)}</span>
                      </div>
                      <ChevronDownIcon className="w-4 h-4 text-gray-400 ml-1" />
                    </ListboxButton>
                    <ListboxOptions className="absolute mt-1 max-h-60 w-60 overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-gray-300 focus:outline-none z-10">
                      {getCodes().map((c) => (
                        <ListboxOption
                          key={c.toLowerCase()}
                          value={c.toLowerCase()}
                          className={({ active }) =>
                            `cursor-pointer select-none px-4 py-2 ${
                              active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                            }`
                          }
                        >
                          <div className="flex items-center justify-start gap-2">
                            <Image
                              src={`https://flagcdn.com/32x24/${c.toLowerCase()}.png`}
                              alt={`${c} Flag`}
                              width={24}
                              height={18}
                            />
                            <span className="truncate">{getName(c)}</span>
                          </div>
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>
              </div>
              <input
                type="text"
                placeholder="125 568 5896"
                className="w-full border border-gray-300 rounded-r px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 transition text-white rounded px-8 py-2 cursor-pointer">
            Save
          </button>
        </div>
      </section>
      <hr className="border-gray-300" />
      <section>
        <h2 className="text-lg font-semibold mb-2">Change Password</h2>
        <p className="text-sm text-gray-500 mb-4">
          Here you can change your password. To change password please fill up the form.
        </p>
        <div className="space-y-4 text-sm">
          <div>
            <label className="block font-medium mb-1">Old Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">New Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 transition cursor-pointer text-white rounded px-4 py-2">
            Update Password
          </button>
        </div>
      </section>
      <hr className="border-gray-300" />
      <section>
        <h2 className="text-lg font-semibold mb-2">Change Email Address</h2>
        <p className="text-sm text-gray-500 mb-4">
          Here you can change your email address. To change email address, please fill up the form.
        </p>
        <div className="space-y-4 text-sm">
          <div>
            <label className="block font-medium mb-1">Old Email Address</label>
            <input
              type="email"
              placeholder="Enter your old email address"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">New Email Address</label>
            <input
              type="email"
              placeholder="Enter your new email address"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 transition cursor-pointer text-white rounded px-4 py-2">
            Change Email Address
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProfileSlot;

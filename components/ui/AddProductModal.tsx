'use client';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckCircle, ChevronDownIcon, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const money = [
  {
    name: 'USD',
    prefix: 'US$',
  },
  {
    name: 'EUR',
    prefix: 'EU€',
  },
];

const formatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const AddProductModal: React.FC<{
  open: boolean;
  onClose: () => void;
  type: 'Physical' | 'Digital';
}> = ({ open, onClose, type }) => {
  const [moneyType, setMoneyType] = useState('USD');
  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: any) => {
    const file = event.target?.files?.[0];
    if (file) {
      console.log('Selected file:', file);
      // You can add preview logic here if needed
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0008]" onClick={onClose}>
      <div
        className="flex flex-col gap-4 bg-white rounded-xl p-6 w-full max-w-5xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-300 pb-2">
          <div className="text-lg font-semibold">Add Product</div>
          <button className="rounded-full hover:bg-gray-100 transition p-2 cursor-pointer" onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-6">
          {/* Left: Form */}
          <div className="flex-1 space-y-6 text-sm">
            <div className="space-y-1">
              <div className="font-bold">Name (required)</div>
              <div className="text-gray-600">Name of the product or service, visible to customers.</div>
              <input className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="space-y-1">
              <div className="font-bold">Description</div>
              <div className="text-gray-600">It appears at checkout, in the customer portal and in quotation mark.</div>
              <textarea
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={5}
              />
            </div>

            <div className="space-y-1">
              <div className="font-bold">Image</div>
              <div className="text-sm text-gray-500 mb-2">Appears at checkout as JPEG, PNG or WEBP less than 2MB.</div>
              <button
                className="px-4 py-2 border border-gray-300 hover:bg-gray-100 transition shadow-lg cursor-pointer rounded-md flex items-center gap-2 text-sm font-medium"
                onClick={handleButtonClick}
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </button>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-lg">More Option</p>
              <div className="grid grid-cols-2 gap-4">
                <button className="border px-4 py-2 rounded-md font-medium border-gray-300 hover:bg-gray-100 transition cursor-pointer">
                  Recurrent
                </button>
                <button className="border px-4 py-2 rounded-md font-medium border-gray-300 hover:bg-gray-100 transition cursor-pointer">
                  One Time
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-bold">Value (required)</div>
              <div className="flex gap-2 relative items-center">
                <input
                  className="border border-gray-300 rounded-md px-3 pl-12 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={value}
                  onChange={(e) => setValue(isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value))}
                />
                <div className="absolute top-2.5 left-3 font-bold">
                  {money.find((e) => e.name === moneyType)?.prefix ?? '$'}
                </div>
                <Listbox value={moneyType} onChange={setMoneyType}>
                  <div className="relative">
                    <ListboxButton className="w-full rounded-md px-4 py-2 text-sm text-white cursor-pointer bg-gray-800 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500">
                      {money.find((e) => e.name === moneyType)?.name || 'Please select'}
                      <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                    </ListboxButton>
                    <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-gray-300 focus:outline-none z-10">
                      {money.map((e, i) => (
                        <ListboxOption
                          value={e.name}
                          key={i}
                          className={({ active }) =>
                            `cursor-pointer select-none px-4 py-2 ${
                              active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                            }`
                          }
                        >
                          {e.name}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button className="px-6 py-2 bg-gray-100 rounded-md font-medium cursor-pointer" onClick={onClose}>
                Cancel
              </button>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 transition cursor-pointer text-white rounded-md font-medium">
                Create Product
              </button>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="w-100 bg-gray-100 p-6 rounded-lg space-y-4 text-sm">
            <h3 className="font-semibold text-lg">Preview</h3>
            <p className="text-sm text-gray-600">Estimate totals based on pricing model, unit quantity, and tax</p>
            <div className="space-y-1">
              <div className="text-sm font-medium">Unit Quantity</div>
              <input
                className="border border-gray-300 bg-white rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value))}
              />
            </div>
            <div className="border-t border-gray-300">
              <div className="text-sm border-b border-gray-300 py-4">
                {`${quantity} × $${formatter.format(value)} = `}
                <strong>US$ {formatter.format(value * quantity)}</strong>
              </div>
              <div className="font-semibold pt-2">
                Total <span className="float-right">US$ {formatter.format(value * quantity)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddProductModal;

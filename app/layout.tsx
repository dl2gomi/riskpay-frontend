import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

import './globals.css';

export const metadata: Metadata = {
  title: 'Riskpay Test',
  description: 'A simple and faster payment gateway for credit cards, cryptocurrency, and bank transfers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        {children}
        <ToastContainer theme="colored" />
      </body>
    </html>
  );
}

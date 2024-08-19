import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import StoreProvider from '@/components/layout/storeProvider';
import Auth from '@/components/auth/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InvoEasy',
  description: 'Make Invoicing so Easy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <ToastContainer
            position="top-center"
            theme="colored"
            toastStyle={{
              borderRadius: '20px',
            }}
            style={{ textAlign: 'center' }}
            limit={1}
            autoClose={800}
            closeButton={false}
            hideProgressBar
          />
        </body>
      </html>
    </StoreProvider>
  );
}

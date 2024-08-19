import instance from '@/utils/axiosInstance';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface CardProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  status: string;
  dueDate: string;
}

const BentoBoxLarge = ({ title, description, icon }: CardProps) => {
  const [pendingInvoices, setPendingInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchPendingInvoices = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = user.id;
        const response = await instance.get(`/invoices/${userId}`, {
          params: {
            status: 'Pending',
            size: 5,
          },
        });
        setPendingInvoices(response.data.invoices);
      } catch (error) {
        console.error('Error fetching pending invoices:', error);
      }
    };

    fetchPendingInvoices();
  }, []);

  return (
    <div className="col-span-full lg:col-span-3 overflow-hidden relative p-8 rounded-xl border-gray-800 bg-gray-900 hover:scale-95 shadow-xl hover:shadow-teal-500">
      <Link href="/dashboard/invoices" className="">
        <div className="grid sm:grid-cols-2">
          <div className="flex flex-col justify-between relative z-10 space-y-12 lg:space-y-6">
            <div className="">
              <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 dark:text-white">
                {title}
              </h2>
              <p className="dark:text-gray-300 text-gray-700">{description}</p>
            </div>
            <div className="relative aspect-square rounded-full size-20 flex border dark:bg-white/5 dark:border-white/10 before:absolute before:-inset-2 before:border dark:before:border-white/5 dark:before:bg-white/5 before:rounded-full">
              {icon}
            </div>
          </div>
          <div className="w-full h-full py-2 p-6 border rounded-lg dark:bg-white/5 dark:border-white/10">
            {pendingInvoices.length === 0 ? (
              <p className="text-white">No pending invoices found.</p>
            ) : (
              <ul className="text-white space-y-2">
                {pendingInvoices.map((invoice) => (
                  <li key={invoice.id} className="border-b-2">
                    {invoice.invoiceNumber}
                    {' - '}
                    Status: {invoice.status}
                    {' - '}
                    Due Date:{' '}
                    {invoice.dueDate
                      .toString()
                      .replace('T', ' ')
                      .replace('Z', '')
                      .replace('00:00:00.000', '')}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BentoBoxLarge;

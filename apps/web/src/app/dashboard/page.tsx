'use client';

import React from 'react';
import BentoBox from '../../components/dashboard/bentoBox/bentoBox';
import BentoBoxLarge from '../../components/dashboard/bentoBox/bentoBoxLarge';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { FaPersonCirclePlus } from 'react-icons/fa6';
import { AiOutlineShopping } from 'react-icons/ai';
import { FaFileInvoice } from 'react-icons/fa';

const Page = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <BentoBox
          href="/dashboard/invoices/create"
          title="Create Invoice"
          description="Quick Create Invoice"
          icon={
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 text-white justify-center"
              viewBox="0 0 17 19"
            >
              <LiaFileInvoiceDollarSolid className="justify-center" />
            </svg>
          }
        />
        <BentoBox
          href="/dashboard/customers/create"
          title="Create Customer"
          description="Quick Create Customer"
          icon={
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 text-white justify-center"
              viewBox="0 0 16 18"
            >
              <FaPersonCirclePlus />
            </svg>
          }
        />
        <BentoBox
          href="/dashboard/products/create"
          title="Create Product"
          description="Quick Create Product"
          icon={
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 text-white justify-center"
              viewBox="0 0 16 18"
            >
              <AiOutlineShopping />
            </svg>
          }
        />
        <BentoBoxLarge
          title="Pending Invoices"
          description="Quick catch up on your pending invoices."
          icon={
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 text-gray-500"
              viewBox="0 0 24 24"
            >
              <FaFileInvoice color="yellow" />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default Page;

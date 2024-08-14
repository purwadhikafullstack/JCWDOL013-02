import React from 'react';
import BentoBox from './components/bentoBox/bentoBox';
import BentoBoxLarge from './components/bentoBox/bentoBoxLarge';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { FaPersonCirclePlus } from 'react-icons/fa6';
import { AiOutlineShopping } from 'react-icons/ai';

const page = () => {
  return (
    <div className="container mx-auto px-20 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <BentoBox
          href="/dashboard/invoices/create"
          title="Create Invoice"
          description="Quick Create Invoice"
          icon={
            <svg
              className="w-20 h-20 text-white justify-center"
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
              className="w-20 h-20 text-white justify-center"
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
              className="w-20 h-20 text-white justify-center"
              viewBox="0 0 16 18"
            >
              <AiOutlineShopping />
            </svg>
          }
        />
        <BentoBoxLarge
          title="Better than dark"
          description="Brief description of the fourth box."
          icon={
            <svg className="w-12 h-12 text-gray-500" viewBox="0 0 24 24">
              {' '}
              {/* Your icon here */}
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default page;

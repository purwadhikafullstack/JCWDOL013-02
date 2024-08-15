'use client';

import React, { useEffect, useState } from 'react';
import { getInvoicesByUserID } from '@/services/invoice.service'; // Adjust the service import as needed
import { useRouter } from 'next/navigation';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { toast } from 'react-toastify';
import { IInvoice } from '@/interfaces/invoice.interface'; // Define IInvoice interface
import InvoiceSearchBar from '@/components/searchBar/searchBar'; // Adjust as needed
import { FaRegTrashAlt } from 'react-icons/fa';
import { Loading } from '../../../components/dashboard/loading/loadData';
import DatePicker from '@/components/dashboard/datePicker';

const InvoicePage = () => {
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [filters, setFilters] = useState<{
    keyword: string;
    page: number;
    startDate: string;
    endDate: string;
    status: string;
    type: string;
    paymentMethod: string;
  }>({
    keyword: '',
    page: 1,
    startDate: '',
    endDate: '',
    status: '',
    type: '',
    paymentMethod: '',
  });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const result = await getInvoicesByUserID({
          page,
          size,
          keyword: filters.keyword,
          startDate: filters.startDate,
          endDate: filters.endDate,
          status: filters.status,
        });

        if (result) {
          setInvoices(result.invoices);
          setTotalPages(result.pages);
        } else {
          setInvoices([]);
          setTotalPages(0);
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
        toast.error('Failed to fetch invoices');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [filters, page, size]);

  if (loading) {
    return <Loading />;
  }

  const handleSoftDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/invoices/${id}/soft-delete`,
          { method: 'DELETE' },
        );
        toast.success('Invoice deleted successfully');
        setFilters((prev) => ({ ...prev }));
      } catch (error) {
        console.error('Failed to delete invoice:', error);
        toast.error('Failed to delete invoice');
      }
    }
  };

  return (
    <div className="p-4">
      <div className="my-10 border-gray-800 bg-slate-800 rounded-xl shadow-2xl shadow-teal-200 p-6">
        <h2 className="text-3xl font-serif font-bold border-teal-900 border-b-2 mb-4 text-teal-400 tracking-tighter">
          Invoice Management
        </h2>
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <InvoiceSearchBar setFilters={setFilters} />
            <button
              className="flex items-center px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              onClick={() => {
                router.push(`/dashboard/invoices/create`);
              }}
            >
              + Add New
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="-mt-8">
              <label
                htmlFor="status"
                className="text-white block text-center mb-1"
              >
                Invoice Status:
              </label>
              <select
                value={filters.status || ''}
                onChange={handleStatusChange}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 text-lg"
              >
                <option value="">All</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
            <DatePicker
              filters={filters}
              setFilters={setFilters}
              router={router}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-collapse table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border text-center">No.</th>
                <th className="px-4 py-2 border text-center">Invoice Number</th>
                <th className="px-4 py-2 border text-center">Created Date</th>
                <th className="px-4 py-2 border text-center">Due Date</th>
                <th className="px-4 py-2 border text-center">Status</th>
                <th className="px-4 py-2 border text-center">Amount</th>
                <th className="px-4 py-2 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices?.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-10 border text-center text-gray-300 text-3xl"
                    colSpan={7}
                  >
                    No Invoices yet, Please add a new one
                  </td>
                </tr>
              )}
              {invoices?.map((invoice: any, index: number) => (
                <tr key={invoice.id}>
                  <td className="px-4 py-2 border text-gray-100 text-center">
                    {index + 1 + (page - 1) * size}
                  </td>
                  <td className="px-4 py-2 border text-gray-100 text-center">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-4 py-2 border text-gray-100 text-center">
                    {new Date(invoice.invoiceDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border text-gray-100 text-center">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </td>
                  {invoice.status === 'Paid' && (
                    <td className="px-4 py-2 border text-gray-100 text-center">
                      <span className="bg-green-500 text-white font-bold py-1 px-4 rounded-full">
                        {invoice.status}
                      </span>
                    </td>
                  )}
                  {invoice.status === 'Expired' && (
                    <td className="px-4 py-2 border text-gray-100 text-center">
                      <span className="bg-red-500 text-white font-bold py-1 px-4 rounded-full">
                        {invoice.status}
                      </span>
                    </td>
                  )}
                  {invoice.status === 'Pending' && (
                    <td className="px-4 py-2 border text-gray-100 text-center">
                      <span className="bg-yellow-500 text-white font-bold py-1 px-4 rounded-full">
                        {invoice.status}
                      </span>
                    </td>
                  )}
                  <td className="px-4 py-2 border text-gray-100 text-center">
                    {'Rp. ' +
                      invoice.totalPrice.toLocaleString('id-ID', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleSoftDelete(invoice.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded-full"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pt-4 flex justify-center">
          <div className="flex items-center">
            <button
              aria-label="left"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className={`p-2 border rounded-md shadow-sm bg-white hover:bg-gray-100 ${
                page === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={page === 1}
            >
              <GrFormPreviousLink />
            </button>
            <div className="px-4 text-gray-100">
              {page} / {totalPages}
            </div>
            <button
              aria-label="right"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className={`p-2 border rounded-md shadow-sm bg-white hover:bg-gray-100 ${
                page === totalPages ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={page === totalPages}
            >
              <GrFormNextLink />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;

'use client';

import React, { useEffect, useState } from 'react';
import { getCustomersByUserID } from '@/services/customer.service';
import { useRouter } from 'next/navigation';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { toast } from 'react-toastify';
import { ICustomer } from '@/interfaces/customer.interface';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import CustomerSearchBar from '@/components/searchBar/searchBar';
import Link from 'next/link';

const CustomersPage = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [filters, setFilters] = useState<{
    keyword: string;
    page: number;
    type: string;
    startDate: string;
    endDate: string;
    status: string;
    paymentMethod: string;
  }>({
    keyword: '',
    page: 1,
    type: '',
    startDate: '',
    endDate: '',
    status: '',
    paymentMethod: '',
  });

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      type: e.target.value,
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      paymentMethod: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const result = await getCustomersByUserID({
          page,
          keyword: filters.keyword,
          type: filters.type,
          paymentMethod: filters.paymentMethod,
        });

        if (result) {
          setCustomers(result.customers);
          setTotalPages(result.pages);
        } else {
          setCustomers([]);
          setTotalPages(0);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
        toast.error('Failed to fetch customers');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [filters, page, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent border-t-4 rounded-full animate-spin"></div>
          <div className="text-4xl font-medium text-teal-600">Loading...</div>
        </div>
      </div>
    );
  }

  const handleSoftDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/customers/${id}/soft-delete`,
          { method: 'DELETE' },
        );
        toast.success('Customer deleted successfully');
        setFilters((prev) => ({ ...prev }));
      } catch (error) {
        console.error('Failed to delete customer:', error);
        toast.error('Failed to delete customer');
      }
    }
  };

  return (
    <div className="p-4">
      <div className="my-10 border-gray-800 bg-slate-800 rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 shadow-teal-200">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold border-b-2 mb-4 text-teal-400 border-teal-900">
          Customer Management
        </h2>
        <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row gap-4 pb-4 sm:pb-8 justify-start">
            <CustomerSearchBar setFilters={setFilters} />
            <button
              className="flex items-center px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              onClick={() => {
                router.push(`/dashboard/customers/create`);
              }}
            >
              + Add New
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:gap-4 justify-center">
              <label htmlFor="type" className="text-white mr-3 mb-1 sm:mb-0">
                Customer Type:
              </label>
              <select
                value={filters.type || ''}
                onChange={handleTypeChange}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 text-base sm:text-lg"
                id="type"
              >
                <option value="">All</option>
                <option value="Individual">Individual</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:gap-4 justify-center">
              <label
                htmlFor="paymentMethod"
                className="text-white mr-3 mb-1 sm:mb-0"
              >
                Payment Type:
              </label>
              <select
                value={filters.paymentMethod || ''}
                onChange={handlePaymentChange}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 text-base sm:text-lg mb-4 lg:mb-0"
                id="paymentMethod"
              >
                <option value="">All</option>
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Virtual Account">Virtual Account</option>
                <option value="OVO">OVO</option>
                <option value="Gopay">Gopay</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border text-center">No.</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border text-center">Payment</th>
                <th className="px-4 py-2 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers?.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 border text-gray-50 text-center text-2xl"
                  >
                    No customers found, please add a new one
                  </td>
                </tr>
              )}
              {customers?.map((customer: any, index: number) => (
                <tr key={customer.id}>
                  <td className="px-4 py-2 border text-gray-100 text-center">
                    {index + 1 + (page - 1) * size}
                  </td>
                  <td className="px-4 py-2 border text-gray-100">
                    {customer.name}
                  </td>
                  <td className="px-4 py-2 border text-gray-100">
                    {customer.customerEmail}
                  </td>
                  <td className="px-4 py-2 border text-gray-100">
                    {customer.type}
                  </td>
                  <td className="px-4 py-2 border text-gray-100">
                    {customer.address}
                  </td>
                  <td className="text-center border px-1 text-gray-100">
                    {customer.paymentMethod}
                  </td>
                  <td className="px-4 py-2 border text-end">
                    <div className="flex gap-4 justify-center">
                      <Link
                        href={`/dashboard/customers/edit/${customer.id}`}
                        prefetch={true}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-full font-extralight text-md flex items-center"
                      >
                        <FaRegEdit />
                      </Link>
                      <button
                        onClick={() => handleSoftDelete(customer.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded-full"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
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

export default CustomersPage;

'use client';

import React, { useEffect, useState } from 'react';
import { getCustomersByUserID } from '@/services/customer.service'; // Adjust the path
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { toast } from 'react-toastify';

const CustomersPage = () => {
  const [customers, setCustomers] = useState({
    customers: [],
    pages: 1,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const [filters, setFilters] = useState({
    keyword: '',
    page: 1,
    size: 5,
    userId: '',
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.id) {
          const userId = user.id;
          const result = await getCustomersByUserID({ ...filters, userId });
          setCustomers(result);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [filters]);

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
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/customers/${id}/soft-delete`,
        { method: 'DELETE' },
      );
      toast.success('Customer deleted successfully');
    }
    setFilters({ ...filters });
    router.push('/dashboard/customers');
  };

  return (
    <div className="p-4">
      <div className="my-10 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-serif font-bold border-b-2 mb-4">
          Customer Management
        </h2>
        <div className="flex gap-4 pb-8">
          <input
            type="text"
            placeholder="Search..."
            value={filters.keyword}
            onChange={(e) =>
              setFilters({ ...filters, keyword: e.target.value, page: 1 })
            }
            className="px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            className="flex items-center px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            onClick={() => {
              router.push(`/dashboard/customers/create`);
            }}
          >
            + Add New
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">No.</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Payment</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers?.customers?.map((customer: any, index: number) => (
                <tr key={customer.id}>
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{customer.name}</td>
                  <td className="px-4 py-2 border">{customer.customerEmail}</td>
                  <td className="px-4 py-2 border">{customer.type}</td>
                  <td className="px-4 py-2 border">{customer.address}</td>
                  <td className="text-center border px-1">
                    {customer.paymentMethod}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleSoftDelete(customer.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded-full"
                    >
                      Delete
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
              onClick={() =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  page: Math.max(prevFilters.page - 1, 1),
                }))
              }
              className={`p-2 border rounded-md shadow-sm bg-white hover:bg-gray-100 ${
                filters.page === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={filters.page === 1}
            >
              <GrFormPreviousLink />
            </button>
            <div className="px-4">
              {filters.page} / {customers.pages}
            </div>
            <button
              aria-label="right"
              onClick={() =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  page: Math.min(prevFilters.page + 1, customers.pages),
                }))
              }
              className={`p-2 border rounded-md shadow-sm bg-white hover:bg-gray-100 ${
                filters.page === customers.pages
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={filters.page === customers.pages}
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

'use client';

import { createCustomer } from '@/services/customer.service';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    customerEmail: '',
    address: '',
    type: 'Individual',
    paymentMethod: 'Cash',
  });

  type ChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>;

  const handleChange = (e: ChangeEvent) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [name]: type === 'radio' ? value : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) throw new Error('User not found in local storage');
      const { id: userId } = JSON.parse(storedUser);
      const updatedFormData = {
        ...formData,
        userId,
      };

      const user = await createCustomer(updatedFormData);
      if (!user) throw new Error('Create customer failed!');
      toast.success('Create customer success');
      router.push('/dashboard/customers');
    } catch (err) {
      console.error(err);
      toast.error('Create customer failed');
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="my-10 border-gray-800 bg-gradient-to-tr from-gray-800 via-gray-700 to-black rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-serif font-bold text-center text-teal-400 border-teal-950 border-b-2">
            Create New Customer
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 w-full rounded-xl p-6 my-6 justify-center">
              <div className="flex items-center space-x-4 justify-center">
                <label className="flex items-center" htmlFor="type">
                  <input
                    type="radio"
                    name="type"
                    value="Individual"
                    id="type"
                    className="form-radio text-blue-600 h-4 w-4"
                    checked={formData.type === 'Individual'}
                    onChange={handleChange}
                  />
                  <span className="mx-3 text-gray-50">Individual</span>
                </label>

                <label className="flex items-center" htmlFor="type">
                  <input
                    type="radio"
                    name="type"
                    value="Business"
                    className="form-radio text-blue-600 h-4 w-4"
                    id="type"
                    onChange={handleChange}
                    checked={formData.type === 'Business'}
                  />
                  <span className="mx-2 text-gray-50">Business</span>
                </label>
              </div>

              <div className="form-control">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-50"
                >
                  Name :
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3 bg-slate-500 text-white"
                  required
                />
              </div>

              <div className="form-control">
                <label
                  htmlFor="customerEmail"
                  className="block text-sm font-medium text-gray-50"
                >
                  Email :
                </label>
                <input
                  name="customerEmail"
                  placeholder="Email"
                  id="customerEmail"
                  type="text"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 bg-slate-500 text-white"
                  required
                />
              </div>

              <div className="form-control">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-50"
                >
                  Address :
                </label>
                <input
                  name="address"
                  placeholder="Address"
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 bg-slate-500 text-white"
                  required
                />
              </div>

              <div className="form-control">
                <label
                  htmlFor="paymentMethod"
                  className="block text-sm font-medium text-gray-50"
                >
                  Payment Method:
                </label>
                <select
                  name="paymentMethod"
                  id="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-5 bg-slate-500 text-white"
                  required
                >
                  <option value="" disabled>
                    Select a payment method
                  </option>
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Virtual Account">Virtual Account</option>
                  <option value="OVO">OVO</option>
                  <option value="Gopay">Gopay</option>
                </select>
              </div>

              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 justify-center">
                <button
                  type="button"
                  onClick={() => router.push('/dashboard/customers')}
                  className="w-full bg-red-400 text-white py-2 rounded-full hover:bg-red-500 p-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white py-2 rounded-full hover:bg-teal-700 p-4"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;

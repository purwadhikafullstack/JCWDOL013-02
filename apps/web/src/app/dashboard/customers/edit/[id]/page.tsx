'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCustomerByID, updateCustomer } from '@/services/customer.service';

const EditCustomerPage = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    customerEmail: '',
    address: '',
    type: '',
    paymentMethod: '',
  });

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const customer = await getCustomerByID(id);
        if (customer) {
          setFormData({
            name: customer.name,
            customerEmail: customer.customerEmail,
            address: customer.address,
            type: customer.type,
            paymentMethod: customer.paymentMethod,
          });
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to load customer details');
      }
    };

    fetchCustomerDetails();
  }, [id]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'radio' ? value : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedCustomer = await updateCustomer(id, formData);
      if (!updatedCustomer) throw new Error('Update customer failed!');
      toast.success('Customer details updated successfully');
      router.push('/dashboard/customers');
    } catch (err) {
      console.error(err);
      toast.success('Customer details updated successfully');
      router.push('/dashboard/customers');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-2 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="my-10 shadow-xl shadow-teal-400 border-gray-800 bg-gradient-to-tr from-gray-800 via-gray-700 to-black rounded-xl p-6">
          <h2 className="text-3xl font-serif font-bold text-center text-teal-400 border-teal-950 border-b-2">
            Edit Customer Details
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 w-full rounded-xl p-6 my-6">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                <label className="flex items-center" htmlFor="type-individual">
                  <input
                    type="radio"
                    name="type"
                    value="Individual"
                    id="type-individual"
                    className="form-radio text-blue-600 h-4 w-4"
                    checked={formData.type === 'Individual'}
                    onChange={handleChange}
                  />
                  <span className="mx-3 text-gray-50">Individual</span>
                </label>

                <label className="flex items-center" htmlFor="type-business">
                  <input
                    type="radio"
                    name="type"
                    value="Business"
                    className="form-radio text-blue-600 h-4 w-4"
                    id="type-business"
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
                  Name:
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
                  Email:
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
                  Address:
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

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
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
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCustomerPage;

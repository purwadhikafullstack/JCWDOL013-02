'use client';

import { createProduct } from '@/services/product.service';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    type: 'cm',
    price: 0,
  });

  type ChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>;

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [name]: value,
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
        price: Number(formData.price),
      };

      const user = await createProduct(updatedFormData);
      if (!user) throw new Error('Create product failed!');
      toast.success('Create product success');
      router.push('/dashboard/products');
    } catch (err) {
      console.error(err);
      toast.error('Create product failed');
    }
  };
  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="p-2 w-full max-w-2xl">
        <div className="my-10 border-gray-800 bg-gradient-to-tr from-gray-800 via-gray-700 to-black rounded-xl shadow-xl p-6 shadow-teal-400">
          <h2 className="text-3xl font-serif font-bold text-center text-teal-400 border-teal-950 border-b-2">
            Create New Product
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 w-full rounded-xl p-6 my-6">
              <div className="form-control">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-50"
                >
                  Name:
                </label>
                <input
                  name="name"
                  placeholder="Name"
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3 bg-slate-500 text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="unit-select"
                  className="block text-sm font-medium text-white"
                >
                  Select Type:
                </label>
                <select
                  id="unit-select"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-lg border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                >
                  <option value="cm">cm</option>
                  <option value="mm">mm</option>
                  <option value="ml">ml</option>
                  <option value="lt">lt</option>
                  <option value="kg">kg</option>
                  <option value="hr">hr</option>
                </select>
                <p className="mt-2 text-sm text-gray-500">
                  Selected unit: {formData.type}
                </p>
              </div>
              <div className="form-control">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-50"
                >
                  Price:
                </label>
                <input
                  name="price"
                  placeholder="Price"
                  type="number"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3 bg-slate-500 text-white"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                <button
                  type="button"
                  onClick={() => router.push('/dashboard/products')}
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

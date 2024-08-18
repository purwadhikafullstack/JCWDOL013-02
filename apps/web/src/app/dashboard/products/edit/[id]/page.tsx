'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getProductByID, updateProduct } from '@/services/product.service';

const EditProductPage = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    type: '',
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const product = await getProductByID(id);
        if (product) {
          setFormData({
            name: product.name,
            price: product.price,
            type: product.type,
          });
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to load product details');
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedProduct = await updateProduct(id, formData);
      if (!updatedProduct) throw new Error('Update product failed!');
      toast.success('Product details updated successfully');
      router.push('/dashboard/products');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update product details');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-2 w-4/6">
        <div className="my-10 shadow-xl shadow-teal-400 border-gray-800 bg-gradient-to-tr from-gray-800 via-gray-700 to-black rounded-xl p-6">
          <h2 className="text-3xl font-serif font-bold text-center text-teal-400 border-teal-950 border-b-2">
            Edit Product Details
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 w-full rounded-xl p-6 my-6 justify-center">
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
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-50"
                >
                  Type:
                </label>
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-5 bg-slate-500 text-white"
                  required
                >
                  <option value="" disabled>
                    Select a Type
                  </option>
                  <option value="cm">cm</option>
                  <option value="mm">mm</option>
                  <option value="ml">ml</option>
                  <option value="lt">lt</option>
                  <option value="kg">kg</option>
                  <option value="hr">hr</option>
                </select>
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
                  id="price"
                  type="text"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 bg-slate-500 text-white"
                  required
                />
              </div>

              <div className="flex space-x-4 justify-center">
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

export default EditProductPage;

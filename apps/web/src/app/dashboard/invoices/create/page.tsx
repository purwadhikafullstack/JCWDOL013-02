'use client';

import { TransitionLink } from '@/components/utils/transitionLink';
import { getCustomersByUserID } from '@/services/customer.service';
import { createInvoice } from '@/services/invoice.service';
import { getProductsByUserID } from '@/services/product.service';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CreateInvoicePage = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    invoiceNumber: '',
    dueDate: '',
    customerId: '',
    itemId: '',
    termsCondition: '',
    quantity: 1,
    totalPrice: 0,
    tax: 0,
  });

  type ChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>;

  useEffect(() => {
    const generateInvoiceNumber = () => {
      return ('INV-' + crypto.randomUUID().split('-')[0]).toUpperCase();
    };

    setFormData((prevData) => ({
      ...prevData,
      invoiceNumber: generateInvoiceNumber(),
    }));

    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) throw new Error('User not found in local storage');
        const { id: userId } = JSON.parse(storedUser);

        const [customerResult, productResult] = await Promise.all([
          getCustomersByUserID(userId),
          getProductsByUserID(userId),
        ]);

        if (customerResult) {
          setCustomers(customerResult.customers);
        } else {
          toast.error('Failed to fetch customers');
        }

        if (productResult) {
          setProducts(productResult.products);
        } else {
          toast.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
        toast.error('Failed to fetch customers');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateTotalAmount = () => {
    const selectedProduct = products.find(
      (product) => product.id === formData.itemId,
    );
    if (selectedProduct) {
      return selectedProduct.price * formData.quantity;
    }
    return 0;
  };

  const calculateSummary = () => {
    const selectedProduct = products.find(
      (product) => product.id === formData.itemId,
    );
    if (!selectedProduct) return { itemPrice: 0, taxAmount: 0, totalPrice: 0 };

    const itemPrice = selectedProduct.price * formData.quantity;
    const taxAmount = (formData.tax / 100) * itemPrice;
    const totalPrice = itemPrice + taxAmount;

    return { itemPrice, taxAmount, totalPrice };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) throw new Error('User not found in local storage');
      const { id: userId } = JSON.parse(storedUser);

      const isoDate = new Date(formData.dueDate).toISOString();

      const updatedFormData = {
        ...formData,
        userId,
        dueDate: isoDate,
        totalPrice: calculateTotalAmount(),
        quantity: Number(formData.quantity),
        tax: Number(formData.tax),
      };

      const invoice = await createInvoice(updatedFormData);
      if (!invoice) throw new Error('Create invoice failed!');
      toast.success('Invoice created successfully');
      router.push('/dashboard/invoices');
    } catch (err) {
      console.error(err);
      toast.error('Create invoice failed');
    }
  };

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

  return (
    <div className="flex items-center justify-center -mt-10">
      <div className="p-2 w-full">
        <div className="my-10 border-gray-800 bg-gradient-to-tr from-gray-800 via-gray-700 to-black rounded-xl shadow-2xl shadow-teal400 p-2">
          <h2 className="text-3xl font-serif font-bold text-teal-500 border-teal-950 border-b-2 text-center">
            Create New Invoice
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 w-full rounded-xl p-6 justify-center">
              <div className="form-control flex justify-center">
                <label
                  htmlFor="invoiceNumber"
                  className="block text-sm text-gray-50 text-center mr-4"
                >
                  Invoice Number:
                  <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3 text-white font-bold justify-center bg-slate-600 font-mono">
                    {formData.invoiceNumber}
                  </p>
                </label>
                <div className="form-control">
                  <label
                    htmlFor="dueDate"
                    className="block text-sm text-gray-50 text-center"
                  >
                    Due Date:
                  </label>
                  <input
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="items-center mt-1 block w-fit rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-slate-500 text-white"
                    required
                  />
                </div>
              </div>
              <div className="form-control">
                <div className="flex justify-between space-x-4">
                  {/* Select Customer */}
                  <div className="flex-1">
                    <label
                      htmlFor="customerId"
                      className="block text-sm font-medium text-gray-50"
                    >
                      Select Customer:
                    </label>
                    <div className="flex items-center">
                      <select
                        id="customerId"
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md text-md"
                        style={{ height: '30px' }}
                        required
                      >
                        <option value="" disabled>
                          Select a customer
                        </option>
                        {customers.map((customer) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name} - {customer.type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center justify-start">
                      <TransitionLink
                        href="/dashboard/customers/create"
                        className=""
                      >
                        <button className="text-white p-1 mt-2 text-sm bg-blue-500 rounded-md">
                          Create new Customer
                        </button>
                      </TransitionLink>
                    </div>
                  </div>

                  {/* Select Product */}
                  <div className="flex-1">
                    <label
                      htmlFor="itemId"
                      className="block text-sm font-medium text-gray-50"
                    >
                      Select Product:
                    </label>
                    <div className="flex items-center">
                      <select
                        id="itemId"
                        name="itemId"
                        value={formData.itemId}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md text-md"
                        style={{ height: '30px' }}
                        required
                      >
                        <option value="" disabled>
                          Select a product
                        </option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name} -{' '}
                            {'Rp. ' +
                              product.price.toLocaleString('id-ID', {
                                style: 'decimal',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center justify-start">
                      <TransitionLink
                        href="/dashboard/products/create"
                        className=""
                      >
                        <button className="text-white p-1 mt-2 text-sm bg-blue-500 rounded-md">
                          Create new Product
                        </button>
                      </TransitionLink>
                    </div>

                    {/* Quantity and Tax */}
                    <div className="flex justify-end gap-2 mt-5">
                      <div className="form-control">
                        <label
                          htmlFor="quantity"
                          className="block text-sm font-medium text-gray-50"
                        >
                          Quantity:
                        </label>
                        <input
                          name="quantity"
                          type="number"
                          placeholder="Quantity"
                          min="1"
                          value={formData.quantity}
                          onChange={handleChange}
                          className="mt-1 block w-20 rounded-md border-gray-300 text-md text-center text-black"
                          required
                        />
                      </div>
                      <div className="form-control">
                        <label
                          htmlFor="tax"
                          className="block text-sm font-medium text-gray-50"
                        >
                          Tax:
                        </label>
                        <div className="flex items-center">
                          <input
                            name="tax"
                            type="number"
                            placeholder="Tax"
                            min="1"
                            value={formData.tax}
                            onChange={handleChange}
                            className="mt-1 block w-20 rounded-md border-gray-300 text-md text-center text-black"
                            required
                          />
                          <span className="ml-2 text-white">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-control">
                <div className="flex justify-between items-start space-x-4">
                  {/* Terms and Conditions on the left */}
                  <div className="flex-1 -mt-10">
                    <label
                      htmlFor="termsCondition"
                      className="block text-sm font-medium text-gray-50"
                    >
                      Terms and Conditions:
                    </label>
                    <textarea
                      id="termsCondition"
                      name="termsCondition"
                      value={formData.termsCondition}
                      onChange={handleChange}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3 bg-slate-500 text-white"
                      placeholder="Enter terms and conditions here..."
                      required
                    />
                  </div>
                  {/* Total Price on the right */}
                  <div className="flex-1 flex justify-end mt-10">
                    <div>
                      <div>
                        <p className="text-md text-gray-50 border-b-2 mb-5 justify-end">
                          <strong>Tax Amount ({formData.tax}%):</strong>{' '}
                          {'Rp. ' +
                            calculateSummary().taxAmount.toLocaleString(
                              'id-ID',
                              {
                                style: 'decimal',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="totalPrice"
                          className="block text-sm font-medium text-gray-50 items-center mr-3"
                        >
                          Total Price:
                        </label>
                        <p
                          className="items-center mt-1 block w-full cursor-default rounded-md border-gray-300 shadow-sm p-2 text-white font-bold text-xl  bg-slate-600"
                          style={{ width: '200px' }}
                        >
                          {'Rp. ' +
                            (
                              calculateTotalAmount() *
                              (1 + formData.tax / 100)
                            ).toLocaleString('id-ID', {
                              style: 'decimal',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 justify-center">
                <button
                  type="button"
                  onClick={() => router.push('/dashboard/invoices')}
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

export default CreateInvoicePage;

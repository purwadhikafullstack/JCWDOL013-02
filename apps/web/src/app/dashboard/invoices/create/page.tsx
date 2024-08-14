'use client';

import { getCustomersByUserID } from '@/services/customer.service';
import { createInvoice } from '@/services/invoice.service';
import { getProductsByUserID } from '@/services/product.service';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CustomerSearch from '../../components/forms/invoice/customerSearch';
import Dates from '../../components/forms/invoice/dates';
import TermsCondition from '../../components/forms/invoice/termsCondition';
import ProductSelectionContainer from '../../components/forms/invoice/productSelectionContainer';
import TotalPrice from '../../components/forms/invoice/totalPrice';

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

  const handleCustomerSelect = (customerId: string) => {
    setFormData((prevData) => ({
      ...prevData,
      customerId,
    }));
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
      <div className="p-10 w-full">
        <div className="my-10 border-gray-800 bg-gradient-to-tr from-gray-800 via-gray-700 to-black rounded-xl shadow-2xl shadow-teal-400 p-10">
          <h2 className="text-3xl font-serif font-bold text-teal-500 border-teal-950 border-b-2 text-center">
            Create New Invoice
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 w-full rounded-xl p-6 justify-center">
              <div className="form-control flex justify-center gap-4">
                <CustomerSearch
                  customers={customers}
                  onCustomerSelect={handleCustomerSelect}
                />
                <Dates
                  formDataInvoice={formData.invoiceNumber}
                  formDataDueDate={formData.dueDate}
                  handleChange={handleChange}
                />
              </div>
              <div className="form-control">
                <div className="flex justify-between space-x-4">
                  <ProductSelectionContainer products={products} />
                </div>
              </div>
              <div className="form-control flex">
                <TermsCondition
                  formDataTnc={formData.termsCondition}
                  handleChange={handleChange}
                />
                <TotalPrice
                  formDataTax={formData.tax}
                  handleChangeTax={handleChange}
                  formDataItemId={formData.itemId}
                  formDataQuantity={formData.quantity}
                  products={products}
                />
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
                  Create and Send
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

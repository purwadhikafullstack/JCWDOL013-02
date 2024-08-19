'use client';

import React, { useEffect, useState } from 'react';
import { getProductsByUserID } from '@/services/product.service';
import { useRouter } from 'next/navigation';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { toast } from 'react-toastify';
import { IProduct } from '@/interfaces/product.interface';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import CustomerSearchBar from '@/components/searchBar/searchBar';
import Link from 'next/link';

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
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

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      type: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await getProductsByUserID({
          page,
          size,
          keyword: filters.keyword,
          type: filters.type,
        });

        if (result) {
          setProducts(result.products);
          setTotalPages(result.pages);
        } else {
          setProducts([]);
          setTotalPages(0);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, page, size]);

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
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/products/${id}/soft-delete`,
          { method: 'DELETE' },
        );
        toast.success('Product deleted successfully');
        setFilters((prev) => ({ ...prev }));
      } catch (error) {
        console.error('Failed to delete product:', error);
        toast.error('Failed to delete product');
      }
    }
  };

  return (
    <div className="p-4">
      <div className="my-10 border-gray-800 bg-slate-800 rounded-xl shadow-2xl shadow-teal-200 p-6">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold border-teal-900 border-b-2 mb-4 text-teal-400 tracking-tighter">
          Product & Service Management
        </h2>
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 pb-8 mt-8 justify-start">
            <CustomerSearchBar setFilters={setFilters} />
            <button
              className="flex items-center px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              onClick={() => {
                router.push(`/dashboard/products/create`);
              }}
            >
              + Add New
            </button>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col lg:items-center justify-center p-5">
            <label htmlFor="type" className="text-white mr-3 mb-1 lg:mb-2">
              Product Type:
            </label>
            <select
              value={filters.type || ''}
              onChange={handleTypeChange}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 text-lg"
              id="type"
            >
              <option value="">All</option>
              <option value="cm">cm</option>
              <option value="mm">mm</option>
              <option value="ml">ml</option>
              <option value="lt">lt</option>
              <option value="kg">kg</option>
              <option value="hr">hr</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-collapse table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border text-center">No.</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-10 border text-center text-gray-300 text-3xl"
                    colSpan={5}
                  >
                    No Products yet, Please add a new one
                  </td>
                </tr>
              )}
              {products?.map((product: any, index: number) => (
                <tr key={product.id}>
                  <td className="px-4 py-2 border text-gray-100 text-center">
                    {index + 1 + (page - 1) * size}
                  </td>
                  <td className="px-4 py-2 border text-gray-100">
                    {product.name}
                  </td>
                  <td className="px-4 py-2 border text-gray-100">
                    {product.type}
                  </td>
                  <td className="px-4 py-2 border text-gray-100">
                    {'Rp. ' +
                      product.price.toLocaleString('id-ID', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                  </td>
                  <td className="px-4 py-2 border text-end">
                    <div className="flex gap-4 justify-center">
                      <Link
                        href={`/dashboard/products/edit/${product.id}`}
                        prefetch={true}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-full font-extralight text-md flex items-center"
                      >
                        <FaRegEdit />
                      </Link>
                      <button
                        onClick={() => handleSoftDelete(product.id)}
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

export default ProductsPage;

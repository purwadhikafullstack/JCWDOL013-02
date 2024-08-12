'use client';

import React, { useEffect, useState } from 'react';
import { getProductsByUserID } from '@/services/product.service';
import { useRouter } from 'next/navigation';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { toast } from 'react-toastify';
import { IProduct } from '@/interfaces/product.interface';
import { FaRegTrashAlt } from 'react-icons/fa';

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filters, setFilters] = useState({
    keyword: '',
    userId: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.id) {
          const userId = user.id;
          const result = await getProductsByUserID({
            userId,
            page,
            size,
            keyword: filters.keyword,
          });

          if (result) {
            setProducts(result.products);
            setTotalPages(result.pages);
          } else {
            toast.error('Failed to fetch products');
            setProducts([]);
            setTotalPages(0);
          }
        } else {
          toast.error('User not found');
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, router]);

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
      <div className="my-10 border-gray-800 bg-slate-800 rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-serif font-bold border-teal-900 border-b-2 mb-4 text-teal-400 tracking-tighter">
          Product Management
        </h2>
        <div className="flex gap-4 pb-8 justify-end">
          <input
            type="text"
            placeholder="Search..."
            value={filters.keyword}
            onChange={(e) =>
              setFilters((filters) => ({
                ...filters,
                keyword: e.target.value,
                page: 1,
              }))
            }
            className="px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            className="flex items-center px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            onClick={() => {
              router.push(`/dashboard/products/create`);
            }}
          >
            + Add New
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-collapse table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">No.</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product: any, index: number) => (
                <tr key={product.id}>
                  <td className="px-4 py-2 border text-gray-100">
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
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleSoftDelete(product.id)}
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

export default ProductsPage;

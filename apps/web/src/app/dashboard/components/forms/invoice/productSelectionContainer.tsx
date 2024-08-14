import React, { useState, ChangeEvent } from 'react';
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { TransitionLink } from '@/components/utils/transitionLink';
import SelectProduct from './selectProduct';

type Product = {
  id: string;
  name: string;
  price: number;
};

const ProductSelectionContainer = ({ products }: { products: Product[] }) => {
  const [selectedProducts, setSelectedProducts] = useState([
    { formData: '', formDataQuantity: 1 },
  ]);

  const handleChange =
    (index: number) => (event: ChangeEvent<HTMLSelectElement>) => {
      const updatedProducts = [...selectedProducts];
      updatedProducts[index].formData = event.target.value;
      setSelectedProducts(updatedProducts);
    };

  const handleChangeQuantity =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const updatedProducts = [...selectedProducts];
      updatedProducts[index].formDataQuantity = Number(event.target.value);
      setSelectedProducts(updatedProducts);
    };

  const addProductSelection = () => {
    setSelectedProducts([
      ...selectedProducts,
      { formData: '', formDataQuantity: 1 },
    ]);
  };

  const removeProductSelection = (index: number) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
  };

  return (
    <div>
      {selectedProducts.map((product, index) => (
        <div key={index} className="flex items-center gap-4">
          <SelectProduct
            formData={product.formData}
            handleChange={handleChange(index)}
            products={products}
            formDataQuantity={product.formDataQuantity}
            handleChangeQuantity={handleChangeQuantity(index)}
          />
          {index > 0 && ( // Hide delete button for the first component
            <button
              onClick={() => removeProductSelection(index)}
              className="text-red-500 hover:text-red-700 mt-8"
            >
              <FaTrashAlt />
            </button>
          )}
        </div>
      ))}

      <div className="flex items-center justify-start mt-2 gap-4">
        <TransitionLink href="/dashboard/products/create" className="">
          <button className="text-white p-1 text-sm bg-blue-500 rounded-md">
            Create new Product
          </button>
        </TransitionLink>
        <button
          onClick={addProductSelection}
          className="flex items-center gap-2 bg-green-800 px-2 p-1 rounded-full"
        >
          <FaPlusCircle color="white" />
          <p className="text-white text-sm">Add multiple products</p>
        </button>
      </div>
    </div>
  );
};

export default ProductSelectionContainer;

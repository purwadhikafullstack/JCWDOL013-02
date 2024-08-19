import { TransitionLink } from '@/components/utils/transitionLink';
import React, { ChangeEventHandler } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

type Product = {
  formDataItemId: string;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  products: any[];
  formDataQuantity: number;
  handleChangeQuantity: ChangeEventHandler<HTMLInputElement>;
};

const SelectProduct = ({
  formDataItemId,
  handleChange,
  products,
  formDataQuantity,
  handleChangeQuantity,
}: Product) => {
  return (
    <div className="flex-1 mt-2">
      <label
        htmlFor="itemId"
        className="block text-sm font-medium text-gray-50"
      >
        Select Product:
      </label>
      <div className="flex items-center gap-4">
        <select
          id="itemId"
          name="itemId"
          value={formDataItemId}
          onChange={handleChange}
          className="mt-1 block w-fit border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md text-md"
          style={{ height: '30px', width: '370px' }}
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

        <div className="form-control -mt-5">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-50"
          >
            Quantity:
          </label>
          <input
            name="quantity"
            type="number"
            id="quantity"
            placeholder="Quantity"
            min="1"
            value={formDataQuantity}
            onChange={handleChangeQuantity}
            className="mt-1 block w-12 rounded-md border-gray-300 text-md text-center text-black"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default SelectProduct;

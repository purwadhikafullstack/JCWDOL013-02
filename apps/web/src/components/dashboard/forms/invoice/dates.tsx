import React, {
  ChangeEventHandler,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react';

type Dates = {
  formDataInvoice: any;
  formDataDueDate: any;
  handleChange: ChangeEventHandler<HTMLInputElement>;
};

const Dates = ({ formDataInvoice, formDataDueDate, handleChange }: Dates) => {
  return (
    <>
      <div className="block text-sm text-gray-50 text-center mr-5">
        Invoice Number:
        <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3 text-white font-bold justify-center bg-slate-600 font-mono">
          {formDataInvoice}
        </p>
      </div>
      <div className="block text-sm text-gray-50 text-center">
        Invoice Date:
        <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3 text-gray-300 font-bold justify-center  bg-slate-500 font-mono">
          {new Date().toLocaleDateString()}
        </p>
      </div>
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
          id="dueDate"
          value={formDataDueDate}
          onChange={handleChange}
          className="items-center mt-1 block w-fit rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-slate-500 text-white"
          required
        />
      </div>
    </>
  );
};

export default Dates;

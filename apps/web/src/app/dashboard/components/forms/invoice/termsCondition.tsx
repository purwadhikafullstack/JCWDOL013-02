import React, { ChangeEventHandler } from 'react';

type Terms = {
  formDataTnc: string;
  handleChange: ChangeEventHandler<HTMLTextAreaElement>;
};

const TermsCondition = ({ formDataTnc, handleChange }: Terms) => {
  return (
    <div className="form-control mt-20 w-2/4">
      <div className="flex justify-between space-x-4">
        {/* Left Section: Terms and Conditions */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Empty space to align with the right section */}
          <div></div>

          {/* Terms and Conditions textarea */}
          <div>
            <label
              htmlFor="termsCondition"
              className="block text-sm font-medium text-gray-50"
            >
              Terms and Conditions:
            </label>
            <textarea
              id="termsCondition"
              name="termsCondition"
              value={formDataTnc}
              onChange={handleChange}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3 bg-slate-500 text-white"
              placeholder="Enter terms and conditions here..."
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;

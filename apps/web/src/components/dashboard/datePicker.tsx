import React from 'react';
import CustomerSearchBar from '../searchBar/searchBar';

type Props = {
  setFilters: React.Dispatch<
    React.SetStateAction<{
      keyword: string;
      page: number;
      startDate: string;
      endDate: string;
      status: string;
      type: string;
      paymentMethod: string;
    }>
  >;
  router: any;
  filters: {
    keyword: string;
    page: number;
    startDate: string;
    endDate: string;
    status: string;
    type: string;
    paymentMethod: string;
  };
};

const DatePicker = ({ setFilters, router, filters }: Props) => {
  return (
    <div className="flex gap-4 pb-8 justify-end">
      <div>
        <label htmlFor="startDate" className="block text-center text-gray-200">
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          value={filters.startDate}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              startDate: e.target.value,
              page: 1,
            }))
          }
          className="border rounded-md text-gray-900"
        />
      </div>
      <div>
        <label htmlFor="endDate" className="block text-center text-gray-200">
          End Date:
        </label>
        <input
          type="date"
          id="endDate"
          value={filters.endDate}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              endDate: e.target.value,
              page: 1,
            }))
          }
          className="border rounded-md text-gray-900"
        />
      </div>
    </div>
  );
};

export default DatePicker;

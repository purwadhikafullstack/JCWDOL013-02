import { debounce } from '@/types/debounce';
import React, { useState, useCallback } from 'react';

interface CustomerSearchBarProps {
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
}

const CustomerSearchBar: React.FC<CustomerSearchBarProps> = ({
  setFilters,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = useCallback(
    debounce((keyword: string) => {
      setFilters((filters) => ({
        ...filters,
        keyword,
        page: 1,
      }));
    }, 500),
    [setFilters],
  );

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);

    if (keyword === '') {
      setFilters((filters) => ({
        ...filters,
        keyword: '',
        page: 1,
      }));
    } else {
      handleSearch(keyword);
    }
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={onChangeSearch}
      className="px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
  );
};

export default CustomerSearchBar;

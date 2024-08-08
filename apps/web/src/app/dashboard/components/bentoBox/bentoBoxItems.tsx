import React from 'react';

type BentoBoxItemProps = {
  title: string;
  description: string;
};

const BentoBoxItems = ({ title, description }: BentoBoxItemProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default BentoBoxItems;

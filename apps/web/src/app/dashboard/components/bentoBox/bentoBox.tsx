import React from 'react';

type BentoBoxProps = {
  children: React.ReactNode;
};

const BentoBox = ({ children }: BentoBoxProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg shadow-lg">
      {children}
    </div>
  );
};

export default BentoBox;

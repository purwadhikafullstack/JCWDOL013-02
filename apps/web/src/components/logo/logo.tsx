import Image from 'next/image';
import React from 'react';

const Logo = () => {
  return (
    <div className="flex gap-3 justify-center p-4 mb-5 border-b-2 hover:cursor-default">
      <Image
        src="/assets/image/invoice.png"
        alt="logo"
        width={50}
        height={50}
      />
      <h1 className="text-4xl font-bold text-teal-900 font-serif">
        invo<span className="text-teal-500">easy</span>
      </h1>
    </div>
  );
};

export default Logo;

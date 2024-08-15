import Link from 'next/link';
import React from 'react';

interface BentoBoxProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const BentoBox = ({ title, description, icon, href }: BentoBoxProps) => {
  return (
    <Link href={href}>
      <div className="flex flex-col items-center  bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-lg p-8 hover:scale-95 shadow-xl hover:shadow-teal-500">
        <div className="w-24 h-24 rounded-full flex items-center justify-center bg-teal-800">
          {icon}
        </div>
        <h2 className="text-2xl font-semibold mt-4 text-white">{title}</h2>
        <p className="text-gray-500 mt-2">{description}</p>
      </div>
    </Link>
  );
};

export default BentoBox;

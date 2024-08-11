import React from 'react';

interface CardProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const BentoBoxLarge = ({ title, description, icon }: CardProps) => {
  return (
    <div className="col-span-full lg:col-span-3 overflow-hidden relative p-8 rounded-xl border-gray-800 bg-gray-900">
      <div className="grid sm:grid-cols-2">
        <div className="flex flex-col justify-between relative z-10 space-y-12 lg:space-y-6">
          <div className="relative aspect-square rounded-full size-12 flex border dark:bg-white/5 dark:border-white/10 before:absolute before:-inset-2 before:border dark:before:border-white/5 dark:before:bg-white/5 before:rounded-full">
            {icon}
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 dark:text-white">
              {title}
            </h2>
            <p className="dark:text-gray-300 text-gray-700">{description}</p>
          </div>
        </div>
        <div className="overflow-hidden relative mt-6 sm:mt-auto h-fit -mb-[34px] -mr-[34px] sm:ml-6 py-6 p-6 border rounded-tl-lg dark:bg-white/5 dark:border-white/10">
          {/* Add your SVG here */}
        </div>
      </div>
    </div>
  );
};

export default BentoBoxLarge;

import React from 'react';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center space-x-2">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent border-t-4 rounded-full animate-spin"></div>
        <div className="text-4xl font-medium text-teal-600">Loading...</div>
      </div>
    </div>
  );
};

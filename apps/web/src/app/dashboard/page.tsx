import React from 'react';
import BentoBox from './components/bentoBox/bentoBox';
import BentoBoxItems from './components/bentoBox/bentoBoxItems';

const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-4">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome, to invoeasy</h1>
        <BentoBox>
          <BentoBoxItems title="Item 1" description="This is the first item." />
          <BentoBoxItems
            title="Item 2"
            description="This is the second item."
          />
          <BentoBoxItems title="Item 3" description="This is the third item." />
          <BentoBoxItems
            title="Item 4"
            description="This is the fourth item."
          />
        </BentoBox>
      </main>
    </div>
  );
};

export default page;

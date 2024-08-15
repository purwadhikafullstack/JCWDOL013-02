import Logo from '@/components/logo/logo';
import React from 'react';
import { LinkItems } from '@/constants/navbar.constant';
import NavItems from './navItems';

const SideBar = () => {
  return (
    <div className="fixed w-64 min-h-screen hidden lg:block bg-gradient-to-br from-teal-50 via-slate-300 to-green-500 shadow-2xl shadow-slate-500 z-10">
      <div className="flex items-center justify-center mx-10">
        <Logo />
      </div>
      {LinkItems.map((item) => (
        <NavItems
          key={item.key}
          icon={item.icon}
          href={item.href}
          children={item.name}
        />
      ))}
      <div className="text-center font-light cursor-default mt-72">
        <p className="font-bold">© invoeasy, v.0.0.1</p>
        <span className="border-b-2 border-teal-950">
          2024 All Rights Reserved
        </span>
      </div>
    </div>
  );
};

export default SideBar;

import Logo from '@/components/logo/logo';
import React from 'react';
import { LinkItems } from '@/constants/navbar.constant';
import NavItems from './navItems';

const SideBar = () => {
  return (
    <div className="absolute lg:relative w-64 min-h-screen hidden lg:block bg-gradient-to-br from-teal-50 via-slate-300 to-green-500 shadow-2xl shadow-slate-500">
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
    </div>
  );
};

export default SideBar;

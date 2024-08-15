import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactText, useEffect, useState } from 'react';
import { IconType } from 'react-icons';

interface Props {
  icon: IconType;
  href: string;
  children: ReactText;
}

const NavItems = ({ icon: IconComponent, href, children, ...rest }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <p
        className={`flex items-center p-4 mx-4 rounded-lg cursor-pointer transition duration-200 group no-underline 
            ${isActive ? 'bg-teal-400 text-white' : 'hover:bg-teal-400 hover:text-white'} m-2`}
        style={{ textDecoration: 'none' }}
      >
        {IconComponent && (
          <IconComponent
            className={`mr-4 text-2xl ${isActive ? 'text-white' : 'group-hover:text-white'}`}
          />
        )}
        {children}
      </p>
    </Link>
  );
};

export default NavItems;

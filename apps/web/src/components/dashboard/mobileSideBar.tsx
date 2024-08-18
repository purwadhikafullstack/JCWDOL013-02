import { signOut } from '@/lib/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { IoNewspaperOutline } from 'react-icons/io5';
import { MdOutlineDesignServices } from 'react-icons/md';
import { SiHomebridge } from 'react-icons/si';
import Logo from '../logo/logo';

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileSideBar = ({ show, setShow }: Props) => {
  const { status, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <div
      className={
        show
          ? 'w-full h-full absolute z-40  transform  translate-x-0 '
          : '   w-full h-full absolute z-40  transform -translate-x-full'
      }
      id="mobile-nav"
    >
      <div
        className="bg-gray-800 opacity-50 absolute h-full w-full lg:hidden"
        onClick={() => setShow(!show)}
      />
      <div className="absolute z-40 sm:relative w-64 md:w-96 shadow pb-4 bg-gray-100 lg:hidden transition duration-150 ease-in-out h-full">
        <div className="flex flex-col justify-between h-full w-full">
          <div>
            <div className="flex items-center justify-between px-8">
              <div className="w-fit flex items-center">
                <Logo />
              </div>
            </div>
            <ul id="sideBar" className=" py-6">
              <li className="pl-6 cursor-pointer text-sm leading-3 tracking-normal pb-4 pt-5 text-indigo-700 focus:text-indigo-700 focus:outline-none">
                <Link href="/dashboard" className="flex items-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 items-center">
                    <SiHomebridge size={24} />
                  </div>
                  <span className="ml-2 xl:text-base md:text-2xl text-base">
                    Home
                  </span>
                </Link>
              </li>
              <li className="pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-4 mb-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                <Link href="/dashboard/products" className="flex items-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 items-center">
                    <MdOutlineDesignServices size={24} />
                  </div>
                  <span className="ml-2 xl:text-base md:text-2xl text-base">
                    Products & Services
                  </span>
                </Link>
              </li>
              <li className="pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mb-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                <Link href="/dashboard/invoices" className="flex items-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 items-center">
                    <IoNewspaperOutline size={24} />
                  </div>
                  <span className="ml-2 xl:text-base md:text-2xl text-base">
                    Invoices
                  </span>
                </Link>
              </li>
              <li className="pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                <Link href="/dashboard/customers" className="flex items-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 items-center">
                    <IoIosPeople size={24} />
                  </div>
                  <span className="ml-2 xl:text-base md:text-2xl text-base">
                    Customers
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full">
            <div className="border-t border-gray-300">
              <div className="w-full flex items-center justify-between px-6 pt-1">
                <div className="flex items-center">
                  <Image
                    alt="profile-pic"
                    src="/assets/svg/avatar.svg"
                    className="w-8 h-8 rounded-md"
                    width={24}
                    height={24}
                  />
                  <p className="md:text-xl text-gray-800 text-base leading-4 ml-2">
                    {user.name}
                  </p>
                </div>
                <Link href="/" onClick={() => dispatch(signOut())}>
                  Sign Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSideBar;

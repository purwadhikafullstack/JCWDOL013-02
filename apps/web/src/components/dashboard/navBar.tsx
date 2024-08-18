import React from 'react';
import Notification from './notification';
import { FaBell } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/features/auth/authSlice';
import Image from 'next/image';

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  profile: boolean;
  setProfile: React.Dispatch<React.SetStateAction<boolean>>;
  notif: boolean;
  setNotif: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBar = ({
  show,
  setShow,
  profile,
  setProfile,
  notif,
  setNotif,
}: Props) => {
  const { status, user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <nav className="h-20 flex items-center lg:items-stretch justify-end lg:justify-end bg-gradient-to-l from-teal-500 to-slate-300 relative">
      <div className="hidden lg:flex w-full pr-6 justify-end">
        <div className="w-1/2 hidden lg:flex">
          <div className="w-full flex items-center pl-8 justify-end">
            <div className="h-full w-20 flex items-center justify-center">
              <div
                className="relative cursor-pointer text-gray-600"
                onClick={() => setNotif(!notif)}
              >
                <FaBell size={27} color="white" />
                <div className="w-2 h-2 rounded-full bg-red-400 border border-white absolute inset-0 mt-1 mr-1 m-auto" />
                <Notification notif={notif} setNotif={setNotif} />
              </div>
            </div>
            <div
              className="flex items-center relative cursor-pointer"
              onClick={() => setProfile(!profile)}
            >
              <div className="rounded-full">
                {profile ? (
                  <ul className="p-2 w-full border-r bg-white absolute rounded left-0 shadow mt-12 sm:mt-16 ">
                    <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-user"
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <circle cx={12} cy={7} r={4} />
                          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        </svg>
                        <span className="text-sm ml-2">My Profile</span>
                      </div>
                    </li>
                    <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mt-2">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-logout"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                          <path d="M7 12h14l-3 -3m0 6l3 -3" />
                        </svg>
                        <span
                          className="text-sm ml-2"
                          onClick={() => {
                            dispatch(signOut());
                            router.push('/');
                          }}
                        >
                          Sign out
                        </span>
                      </div>
                    </li>
                  </ul>
                ) : (
                  ''
                )}
              </div>
              {status.isLogin ? (
                <>
                  <div className="relative">
                    <Image
                      className="rounded-full h-10 w-10 object-cover bg-white"
                      src="/assets/svg/avatar.svg"
                      alt="avatar"
                      width={40}
                      height={40}
                    />
                    <div className="w-2 h-2 rounded-full bg-green-400 border border-white absolute inset-0 mb-0 mr-0 m-auto" />
                  </div>
                  <div>
                    <p className="text-gray-800 text-sm mx-3 font-bold">
                      {user.name}
                    </p>
                    <p className="text-gray-800 text-sm mx-3">{user.email}</p>
                  </div>
                  <div className="cursor-pointer text-gray-600">
                    <svg
                      aria-haspopup="true"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-chevron-down"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="text-gray-600 mr-8 visible lg:hidden relative"
        onClick={() => setShow(!show)}
      >
        {show ? (
          ' '
        ) : (
          <svg
            aria-label="Main Menu"
            aria-haspopup="true"
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-menu cursor-pointer"
            width={30}
            height={30}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1={4} y1={8} x2={20} y2={8} />
            <line x1={4} y1={16} x2={20} y2={16} />
          </svg>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

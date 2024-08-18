'use client';

import { getUserByID } from '@/services/user.service';
import Link from 'next/link';
import React, { useEffect } from 'react';

const UserProfile = ({ params: { id } }: { params: { id: string } }) => {
  const [userDetails, setUserDetails] = React.useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    birthDate: '',
  });

  useEffect(() => {
    (async () => {
      const data = await getUserByID(id);
      setUserDetails({
        name: data?.name || '',
        email: data?.email || '',
        phone: data?.phone || '',
        gender: data?.gender || '',
        birthDate: data?.birthDate || '',
      });
    })();
  }, [id]);

  return (
    <div className="flex items-center justify-center">
      <div className="p-2 w-4/6">
        <div className="my-10 border-gray-800 bg-gradient-to-tr from-gray-800 via-gray-700 to-black rounded-xl shadow-teal-400 p-6 shadow-xl">
          <h2 className="text-3xl font-serif font-bold text-center text-teal-400 border-b-2 border-teal-950 py-4">
            User Profile
          </h2>
          <div className="space-y-6 w-full rounded-xl p-6 my-6 justify-center">
            <div className="form-control">
              <label className="block text-sm font-medium text-gray-50">
                Name:
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 bg-slate-500 text-white">
                {userDetails.name}
              </p>
            </div>
            <div className="form-control">
              <label className="block text-sm font-medium text-gray-50">
                Email:
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 bg-slate-500 text-white">
                {userDetails.email}
              </p>
            </div>
            <div className="form-control">
              <label className="block text-sm font-medium text-gray-50">
                Phone:
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 bg-slate-500 text-white">
                {userDetails.phone}
              </p>
            </div>
            <div className="form-control">
              <label className="block text-sm font-medium text-gray-50">
                Gender:
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 bg-slate-500 text-white">
                {userDetails.gender}
              </p>
            </div>
            <div className="form-control">
              <label className="block text-sm font-medium text-gray-50">
                Birth Date:
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 bg-slate-500 text-white mb-5">
                {new Date(userDetails.birthDate).toLocaleDateString()}
              </p>
            </div>
            <button className="w-full bg-teal-500 text-white py-2 rounded-full hover:bg-teal-600">
              <Link href={`/dashboard/users/edit/${id}`} prefetch={true}>
                Edit Profile
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

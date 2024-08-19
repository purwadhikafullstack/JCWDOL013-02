'use client';

import { getUserByID, updateUser } from '@/services/user.service';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    birthDate: '',
  });

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getUserByID(id);

      const formattedDate = data?.birthDate
        ? new Date(data.birthDate).toISOString().split('T')[0]
        : '';

      setFormData({
        name: data?.name || '',
        email: data?.email || '',
        phone: data?.phone || '',
        gender: data?.gender || '',
        birthDate: formattedDate || '',
      });
    })();
  }, [id]);

  type ChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>;

  const handleChange = (e: ChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const isoBirthDate = new Date(formData.birthDate).toISOString();
      const updatedFormData = {
        ...formData,
        birthDate: isoBirthDate,
      };

      const address = await updateUser(id, updatedFormData);
      if (!address) throw new Error('Update user failed!');
      toast.success('Update user success');
      router.push(`/dashboard/users/${id}`);
    } catch (err) {
      console.error(err);
      toast.error('Update user failed');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-2 w-4/6">
        <div className="my-10 border-gray-800 bg-gradient-to-tr from-gray-800 via-gray-700 to-black rounded-xl shadow-xl p-6 shadow-teal-300">
          <h2 className="text-3xl font-serif font-bold text-center text-teal-400 border-b-2 border-teal-950">
            Edit User Profile
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 w-full rounded-xl p-6 my-6 justify-center">
              <div className="form-control">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-50"
                >
                  Name:
                </label>
                <input
                  name="name"
                  placeholder="Name"
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className=" cursor-default mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3 bg-slate-500 text-white"
                  required
                />
              </div>
              <div className="form-control">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-50"
                >
                  Email:
                </label>
                <input
                  name="email"
                  placeholder="Email"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className=" cursor-default mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3 bg-slate-500 text-white"
                  disabled
                />
              </div>
              <div className="form-control">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-50"
                >
                  Phone:
                </label>
                <input
                  name="phone"
                  placeholder="Phone"
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className=" cursor-default mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3 bg-slate-500 text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="gender-select"
                  className="block text-sm font-medium text-white"
                >
                  Gender:
                </label>
                <select
                  id="gender-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 cursor-default w-full pl-3 pr-10 py-2 text-lg border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  required
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-control">
                <label
                  htmlFor="birthDate"
                  className="block text-sm font-medium text-gray-50"
                >
                  Birth Date:
                </label>
                <input
                  name="birthDate"
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="mt-1 cursor-default block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3 bg-slate-500 text-white"
                  required
                />
              </div>
              <div className="flex space-x-4 justify-center">
                <button
                  type="button"
                  onClick={() => router.push(`/dashboard/users/${id}`)}
                  className="w-full bg-red-400 text-white py-2 rounded-full hover:bg-red-500 p-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white py-2 rounded-full hover:bg-teal-700 p-4"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;

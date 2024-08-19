import React, { useState } from 'react';
import { FormikProps, Form, Field } from 'formik';
import { FormValues } from '@/types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { TransitionLink } from '@/components/utils/transitionLink';
import Link from 'next/link';

export default function InnerForm(props: FormikProps<FormValues>) {
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    props;
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div className=" bg-white rounded-lg">
      <h2 className="text-3xl font-extrabold text-slate-700 mb-4 text-center">
        Sign In
      </h2>
      <Form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700">
              Email:
            </label>
            <Field
              name="email"
              type="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              value={values.email}
              className="p-2 border border-gray-300 rounded-md"
            />
            {touched.email && errors.email && (
              <span className="mt-2 text-center text-red-500">
                {errors.email}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700">
              Password:
            </label>
            <div className="relative">
              <input
                name="password"
                id="password"
                type={show ? 'text' : 'password'}
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
              <button
                type="button"
                onClick={handleClick}
                className="absolute inset-y-0 right-0 flex items-center px-3 bg-gray-200 rounded-md"
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {touched.password && errors.password && (
              <span className="mt-2 text-center text-red-500">
                {errors.password}
              </span>
            )}
          </div>
          <div className="text-center pb-4 border-b-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 mt-4 bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 p-2"
            >
              Submit
            </button>
          </div>
          <div className="text-center">
            <TransitionLink
              href="/sign-up"
              className="text-blue-500 hover:text-blue-600"
            >
              Don&#39;t have an account yet?
            </TransitionLink>
          </div>
          <div className="text-center">
            <TransitionLink
              href="/forgot-password"
              className="text-blue-500 hover:text-blue-600"
            >
              Forgot Password?
            </TransitionLink>
          </div>
        </div>
      </Form>
    </div>
  );
}

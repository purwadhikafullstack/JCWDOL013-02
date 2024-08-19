import React, { useState } from 'react';
import { FormikProps, Form, Field } from 'formik';
import { FormValues } from '@/types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function InnerForm(props: FormikProps<FormValues>) {
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    props;

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [show1, setShow1] = useState(false);
  const handleClick1 = () => setShow1(!show1);

  const validateConfirmPassword = (pass: string, value: string) => {
    let error = '';
    if (pass && value) {
      if (pass !== value) {
        error = 'Password not matched';
      }
    }
    return error;
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-md -space-y-px">
          <h2 className="text-2xl font-bold text-gray-900 text-center mt-5 mb-10">
            Set Password
          </h2>
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            {touched.password && errors.password && (
              <p className="absolute -top-6 left-8 text-sm text-red-600">
                {errors.password}
              </p>
            )}
            <Field
              id="password"
              name="password"
              type={show ? 'text' : 'password'}
              autoComplete="new-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              onChange={handleChange}
              value={values.password}
            />
            <button
              type="button"
              onClick={handleClick}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <label htmlFor="password1" className="sr-only">
              Confirm Password
            </label>
            <Field
              id="password1"
              name="password1"
              type={show1 ? 'text' : 'password'}
              autoComplete="new-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm z-0"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={values.password1}
              validate={() =>
                validateConfirmPassword(values.password, values.password1)
              }
            />
            <button
              type="button"
              onClick={handleClick1}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            >
              {show1 ? <FaEyeSlash /> : <FaEye />}
            </button>
            {touched.password1 && errors.password1 && (
              <p className="absolute mt-2 text-sm text-red-600 left-10">
                {errors.password1}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative rounded-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5"
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}

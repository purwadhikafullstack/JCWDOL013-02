'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { FormValues, FormProps } from './types';
import InnerForm from './innerForm';
import { resetPassword } from '@/services/auth.service';
import { toast } from 'react-toastify';

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .required('Password is required')
    .min(8, 'Password should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

const ResetPassword = () => {
  const params = useSearchParams();
  const token = params.toString().replace('token=', '');
  const router = useRouter();

  const ResetPasswordForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.initialEmail || '',
      password: props.initialPassword || '',
      password1: props.initialPassword1 || '',
    }),
    validationSchema: PasswordSchema,
    enableReinitialize: true,
    async handleSubmit({ password }: FormValues, { resetForm }) {
      try {
        const data = await resetPassword({ token, password });
        if (data) {
          localStorage.removeItem('resetPassword');
        }
        resetForm();
        toast.success(data.message);
        router.push('/');
      } catch (err: any) {
        toast.error(err.message);
      }
    },
  })(InnerForm);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg w-full p-6 sm:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Reset Password</h2>
        </div>
        <hr className="border-gray-300 dark:border-gray-600 mb-8" />
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-12 flex justify-center">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

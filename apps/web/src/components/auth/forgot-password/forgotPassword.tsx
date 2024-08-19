'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { FormValues, FormProps } from './types';
import InnerForm from './innerForm';
import { forgotPassword } from '@/services/auth.service';
import { toast } from 'react-toastify';
import AuthUser from '../authUser';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const router = useRouter();

  const ForgotPasswordForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.initialEmail || '',
    }),
    validationSchema: ForgotPasswordSchema,
    enableReinitialize: true,
    async handleSubmit({ email }: FormValues, { resetForm }) {
      try {
        const data = await forgotPassword({ email });
        if (localStorage.getItem('resetPassword') === 'true') {
          toast.error('Please check your email to reset your password first');
          return;
        } else {
          resetForm();
          toast.success(data.message);
          router.push('/');
          localStorage.setItem('resetPassword', 'true');
        }
      } catch (err: any) {
        console.error(err);
        toast.error('Email not found');
      }
    },
  })(InnerForm);

  return (
    <AuthUser>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 shadow-2xl">
        <div className="w-full max-w-lg p-6">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold">Forgot Password</h2>
            <div className="w-full h-px bg-gray-300 my-6"></div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </AuthUser>
  );
};

export default ForgotPassword;

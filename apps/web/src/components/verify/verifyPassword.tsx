'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { FormValues, FormProps } from '@/types';
import { IUsers } from '@/interfaces/user.interface';
import InnerForm from './components/innerForm';
import instance from '@/utils/axiosInstance';
import { toast } from 'react-toastify';
import Logo from '../logo/logo';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  password1: Yup.string().required('Confirm Password is required'),
});

const VerifyPassword = () => {
  const params = useSearchParams();
  const router = useRouter();
  const container = useRef(null);
  gsap.registerPlugin(useGSAP);

  const verify = async ({ password }: IUsers) => {
    try {
      const param = params.toString().replace('token=', '');
      await instance.post(
        '/auth/verify',
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${param}`,
          },
        },
      );
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  const LoginForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.initialEmail || '',
      password: props.initialPassword || '',
      password1: props.initialPassword1 || '',
    }),
    validationSchema: PasswordSchema,
    enableReinitialize: true,
    handleSubmit({ email, password }: FormValues, { resetForm }) {
      verify({ email, password });
      resetForm();
      toast.success('Account verified, please Sign In');
      router.push('/');
    },
  })(InnerForm);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

      tl.fromTo(
        '.logo__image',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
      );
      tl.fromTo(
        '.form__verify',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
      );
    },
    { scope: container },
  );

  return (
    <div className="min-h-screen bg-gray-50 xl:p-40" ref={container}>
      <div className="flex text-center justify-center logo__image">
        <Logo />
      </div>
      <div className="flex items-center justify-center form__verify">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default VerifyPassword;

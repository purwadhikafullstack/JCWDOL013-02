'use client';

import React from 'react';
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
import AuthUser from '../auth/authUser';

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
});

const RegisterView = () => {
  const router = useRouter();
  const container = useRef(null);
  gsap.registerPlugin(useGSAP);

  const register = async ({ email }: IUsers) => {
    try {
      const form = new FormData();
      form.append('email', email);
      const { data } = await instance.post('/auth/register', form);
      toast.success(data?.message);
      router.push('/');
    } catch (err) {
      console.error(err);
      toast.error('Email already exist, please Sign in or Verify your email');
    }
  };

  const RegisterForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.initialEmail || '',
      password: props.initialPassword || '',
      password1: props.initialPassword || '',
    }),
    validationSchema: RegisterSchema,
    enableReinitialize: true,
    handleSubmit({ email, password }: FormValues, { resetForm }) {
      register({ email, password });
      resetForm();
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
        '.form__register',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
      );
    },
    { scope: container },
  );

  return (
    <AuthUser>
      <div
        className="flex min-h-screen items-center justify-center bg-gray-50 w-full"
        ref={container}
      >
        <div className="m-0 logo__image">
          <Logo />
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-12 flex justify-center form__register">
            <div className="space-y-8">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </AuthUser>
  );
};

export default RegisterView;

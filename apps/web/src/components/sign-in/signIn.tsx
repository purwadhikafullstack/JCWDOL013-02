'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '@/lib/hooks';
import { signIn } from '@/lib/features/auth/authSlice';
import { FormValues, FormProps } from '@/types';
import InnerForm from './components/innerForm';
import { toast } from 'react-toastify';
import Logo from '../logo/logo';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

type Props = {
  callbackUrl?: string;
  authError?: string | null;
};

const LoginView = ({ callbackUrl, authError }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const container = useRef(null);
  gsap.registerPlugin(useGSAP);

  const LoginForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.initialEmail || '',
      password: props.initialPassword || '',
      password1: props.initialPassword || '',
    }),
    validationSchema: LoginSchema,
    enableReinitialize: true,
    async handleSubmit({ email, password }: FormValues, { resetForm }) {
      try {
        const result = await dispatch(signIn({ email, password }));
        if (!result) throw new Error('Email or Password incorrect');
        resetForm();
        router.push('/dashboard');
      } catch (err: any) {
        console.error(err);
        toast.error(err.message);
      }
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
        '.form__login',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
      );
    },
    { scope: container },
  );

  return (
    <div
      className="min-h-screen flex items-center justify-end bg-gray-50 login__form"
      ref={container}
    >
      <div className="space-y-0 lg:mx-40">
        <div className="text-center logo__image">
          <Logo />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-12 flex justify-center form__login">
          <div className="space-y-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;

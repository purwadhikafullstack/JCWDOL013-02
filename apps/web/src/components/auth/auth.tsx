'use client';

import React, { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { checkToken } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';

export default function Auth({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem('token');
      if (token) {
        dispatch(checkToken(token));
      } else {
        router.push('/');
      }
    }
  }, [dispatch, router]);

  return <>{children}</>;
}

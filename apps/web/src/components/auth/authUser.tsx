'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { checkToken } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  url?: string;
};

export default function AuthUser({ children, url = '/' }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (typeof window !== undefined) {
        const token = localStorage.getItem('token');

        const result = await dispatch(checkToken(token as string));
        if (result) router.push(url);

        setIsLoading(false);
      }
    })();
  }, [dispatch, router, url]);

  if (isLoading) return <></>;

  return <>{children}</>;
}

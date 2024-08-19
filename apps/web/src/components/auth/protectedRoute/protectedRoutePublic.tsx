'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoutePublic: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) {
      router.push('/');
    } else {
      router.push('/dashboard');
    }
  }, [token, router]);

  return token ? <>{children}</> : null;
};

export default ProtectedRoutePublic;

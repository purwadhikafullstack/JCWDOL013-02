'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoutePublic: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  return <>{children}</>;
};

export default ProtectedRoutePublic;

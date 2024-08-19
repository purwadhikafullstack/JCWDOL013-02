'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRouteUser: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      router.push('/dashboard');
    }
  }, [token, router]);

  return <>{children}</>;
};

export default ProtectedRouteUser;

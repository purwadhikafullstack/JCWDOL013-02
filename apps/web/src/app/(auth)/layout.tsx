import React from 'react';
import AuthUser from '@/components/auth/authUser';
import Hero from '@/components/hero/hero';
import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthUser>
      <div className="w-full h-48 min-h-screen flex">
        {children}
        <Image
          src="/assets/image/register.png"
          alt="register"
          className="object-cover mx-40"
          width={1220}
          height={90}
        />
      </div>
    </AuthUser>
  );
}

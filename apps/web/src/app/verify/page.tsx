import VerifyPassword from '@/components/verify/verifyPassword';
import Image from 'next/image';
import { Suspense } from 'react';

export default function VerifyPage() {
  return (
    <Suspense>
      <div className="w-full h-48 min-h-screen flex">
        <VerifyPassword />
        <Image
          src="/assets/image/verify.png"
          alt="register"
          className="object-cover mx-30"
          width={520}
          height={900}
        />
      </div>
    </Suspense>
  );
}

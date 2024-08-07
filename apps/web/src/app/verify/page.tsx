import VerifyPassword from '@/components/verify/verifyPassword';
import { Suspense } from 'react';

export default function VerifyPage() {
  return (
    <Suspense>
      <div className="w-full h-48 min-h-screen flex">
        <VerifyPassword />
        <img
          src="/assets/image/verify.png"
          alt="register"
          className="object-cover mx-40"
        />
      </div>
    </Suspense>
  );
}

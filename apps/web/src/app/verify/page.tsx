import ProtectedRouteUser from '@/components/auth/protectedRoute/protectedRouteUser';
import VerifyPassword from '@/components/verify/verifyPassword';
import Image from 'next/image';
import { Suspense } from 'react';

export default function VerifyPage() {
  return (
    <ProtectedRouteUser>
      <Suspense>
        <div className="w-full h-48 min-h-screen flex">
          <VerifyPassword />
          <Image
            src="/assets/image/verify.png"
            alt="register"
            className="object-cover mx-40"
            width={920}
            height={90}
          />
        </div>
      </Suspense>
    </ProtectedRouteUser>
  );
}

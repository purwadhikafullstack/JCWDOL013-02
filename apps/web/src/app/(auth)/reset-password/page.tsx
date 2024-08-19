import ResetPassword from '@/components/auth/reset-password/resetPassword';
import { Suspense } from 'react';

const Page = () => {
  return (
    <Suspense>
      <div className="w-full shadow-xl">
        <ResetPassword />
      </div>
    </Suspense>
  );
};

export default Page;

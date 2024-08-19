import React from 'react';
import SignIn from '@/components/sign-in/signIn';
import AuthUser from '@/components/auth/authUser';

const SignInPage = () => {
  return (
    <AuthUser>
      <div className="flex-end">
        <SignIn />
      </div>
    </AuthUser>
  );
};

export default SignInPage;

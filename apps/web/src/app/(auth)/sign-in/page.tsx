import React from 'react';
import SignIn from '@/components/sign-in/signIn';
import AuthUser from '@/components/auth/authUser';
import ProtectedRouteUser from '@/components/auth/protectedRoute/protectedRouteUser';

const SignInPage = () => {
  return (
    <AuthUser>
      <ProtectedRouteUser>
        <div className="flex-end">
          <SignIn />
        </div>
      </ProtectedRouteUser>
    </AuthUser>
  );
};

export default SignInPage;

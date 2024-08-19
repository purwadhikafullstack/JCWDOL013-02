import Hero from '@/components/hero/hero';
import SignInPage from './(auth)/sign-in/page';
import AuthUser from '@/components/auth/authUser';

export default function Home() {
  return (
    <AuthUser>
      <div className="flex">
        <Hero />
        <SignInPage />
      </div>
    </AuthUser>
  );
}

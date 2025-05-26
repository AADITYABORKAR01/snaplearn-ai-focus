
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/hooks/useAuth';

const Auth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Logo className="mx-auto" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to SnapLearn
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Learn anything, anytime with AI-powered education
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;

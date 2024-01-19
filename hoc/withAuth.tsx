import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/utils/auth';

const withAuth = (WrappedComponent: React.FC) => {
  return () => {
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated()) {
        router.push('/login');
      }
    }, []);

    return <WrappedComponent />;
  };
};

export default withAuth;
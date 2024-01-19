import { useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

interface User {
  name: string;
  exp: number;
}

const withAuth = (WrappedComponent: React.FC) => {
  return () => {
    const router = useRouter();

    useEffect(() => {
      const token = sessionStorage.getItem('token');
      const user = jwt.decode(token as string) as User | null;

      if (!user || user.exp < Math.floor(Date.now() / 1000)) {
        router.push('/login');
      }
    }, [router]);

    return <WrappedComponent />;
  };
};

export default withAuth;

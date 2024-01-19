import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='grid place-items-center h-full bg-cyan-400'>
      <main className='p-4 bg-white rounded-lg flex flex-col gap-2'>{children}</main>
    </div>
  );
};

export default AuthLayout;

import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='h-full'>
      <Navbar/>
      <main className='h-calc-5rem'>{children}</main>
    </div>
  );
};

export default DefaultLayout;

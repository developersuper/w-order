import React from 'react';
import NavTop from 'layouts/NavTop';
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
export interface MasterLayoutProps {
  type: string,
  className?: string,
}

const MasterLayout: React.FC<MasterLayoutProps> = ({ type, className }: MasterLayoutProps) => {
  return (
    <div className={`pt-[63px] ${className} bg-[#F0F2F6] min-h-[calc(100vh)]`}>
      <div className='w-full block'>
        <NavTop />
      </div>
      <div className='flex md:px-4 pt-9'>
        <main className='w-full mt-0'>
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MasterLayout;
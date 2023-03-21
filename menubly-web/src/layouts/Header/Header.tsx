import React, { ReactNode, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useAppDispatch } from 'store/hooks';
import { useNavigate } from 'react-router-dom';

const Header = ({children, isbell=true, className}: {children?: ReactNode, isbell?: boolean, className?: string}) => {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  
  return (
    <>
      <div className={`${className} flex mb-8`}>
        {children}
      </div>
    </>
  )
}

export default Header;
import React from 'react';
import logo from 'assets/svg/logo.svg';
import {
  Link
} from 'react-router-dom';
import NavItem from './NavItem';
import { HelpIcon } from 'assets/icons/Help';
import Profile from './Profile';
import { DeleteIcon, HamburgerIcon } from 'assets/icons';
import { Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useAuth } from 'contexts/Auth/AuthContext';


const NavTop: React.FC = () => {
  let [isShowing, setIsShowing] = useState(false);
  const auth = useAuth();

  return (<>
    <div className='NavTop flex fixed z-10 items-center top-0 w-full px-4 py-2.5 bg-white'>
      <Link to="/">
        <img src={logo} alt="Menubly" />
      </Link>
      <ul className='hidden lg:flex lg:ml-[58px] space-x-8'>
        <li>
          <NavItem name="Places" url="/" childrenUrl="/places/:id" />
        </li>
        <li>
          <NavItem name="Items Collection" url="/items-collection" />
        </li>
      </ul>
      <div className='lg:hidden ml-auto items-center text-primary-light' onClick={() => setIsShowing(!isShowing)}>
        <HamburgerIcon />
      </div>
      <div className='hidden lg:flex ml-auto items-center'>
        <a href='https://menubly.notion.site/Menubly-Help-Center-8d57772f81384f2f910f539f812bdfcb' target="_blank" rel="noreferrer" >
          <HelpIcon />
        </a>
        <div className='flex w-10 h-10 ml-5 bg-orange-40 rounded-full items-center 
          justify-center font-bold text-white text-sm'>
          <Profile />
        </div>
      </div>
    </div>

    {isShowing && <div className='fixed lg:hidden w-full h-full bg-black/70 z-10 top-0'></div>}
    <div className={`lg:hidden fixed w-11/12 md:w-9/12 h-full top-0 ${isShowing ? 'z-20': '-z-[20]'}`}>
      <Transition
        as={Fragment}
        show={isShowing}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 -translate-x-full"
        enterTo="opacity-100 translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-100 -translate-x-full"
        
      >
        <div className="h-full w-full bg-white p-4">
          <div className='flex h-[46px] items-center mb-4'>
            <Link to="/">
              <img src={logo} alt="Menubly" className='max-h-[30px]' />
            </Link>
            <button className='ml-auto' onClick={() => setIsShowing(false)}>
              <DeleteIcon />
            </button>
          </div>
          <div className='border-t border-b border-neutral-10'>
            <ul className='py-8'>
              <li className='w-full mb-8' onClick={() => setIsShowing(false)}>
                <NavItem name="Places" url="/" childrenUrl="/places/:id" />
              </li>
              <li className='w-full' onClick={() => setIsShowing(false)}>
                <NavItem name="Items Collection" url="/items-collection" />
              </li>
            </ul>
          </div>
          <div className='mt-8'>
            <div className='flex items-center space-x-4'>
              <div className='flex w-10 h-10 bg-orange-40 rounded-full items-center justify-center font-bold text-white text-sm'>
                {auth?.user?.firstName?.charAt(0)}
              </div>
              <span className='text-neutral-80 text-base'>{auth?.user?.firstName}</span>
            </div>
            <div className='mt-8'>
              <div className='w-full' onClick={() => setIsShowing(false)}>
                <Link to="/account" className='text-neutral-60'>Account</Link>
              </div>
              <div className='w-full mt-4'>
                <a href='https://menubly.notion.site/Menubly-Help-Center-8d57772f81384f2f910f539f812bdfcb' target="_blank" rel="noreferrer" className='text-neutral-60'>Guides</a>
              </div>
            </div>
            <div className='mt-8 border-t border-neutral-10 pt-6'>
              <div className='w-full'>
                <button className='text-default-error' onClick={() => {auth.logout(); setIsShowing(false)}}>Sign Out</button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </>)
};

export default NavTop;
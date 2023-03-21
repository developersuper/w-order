
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from 'contexts/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    return (
        <div className="">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="p-2">
                        {auth?.user?.firstName?.charAt(0)}
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute -right-2 mt-2 min-w-[180px] p-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-dropdown focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => navigate('/account')}
                                        className="text-neutral-80 !font-normal text-left cursor-pointer text-sm hover:bg-neutral-10 w-full p-2 rounded-md transition"
                                    >
                                        <span className='text-neutral-80'>Account</span>
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => auth.logout()}
                                        className="text-red-60 !font-normal text-left cursor-pointer text-sm hover:bg-neutral-10 w-full p-2 rounded-md transition"
                                    >
                                        <span className='text-red-60'>Log Out</span>
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default Profile;
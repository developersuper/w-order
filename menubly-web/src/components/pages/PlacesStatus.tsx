import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from '@headlessui/react';
import { CaretDown } from "assets/icons/CaretDown";
import { STATUS } from "constant/status.contant";

const PlacesStatus = ({value, onChange}: {value: number, onChange: (value: number) => void}) => {
    const [select, setSelect] = useState<any>();
    useEffect(() => {
        setSelect(value);
    }, [value]);

    return <Menu as="div" className="relative inline-block text-left">
        <div>
            <Menu.Button className={`flex items-center px-3  rounded-full text-sm font-bold w-[95px] h-[25px]
                ${select == 2 && 'bg-teal-10 text-primary-light'}
                ${select == 1 && 'bg-orange-10 text-orange-60'}
                ${select == 0 && 'bg-neutral-10 text-neutral-60'}
            `}>
                <span className="whitespace-nowrap">{STATUS[select]}</span>
                <span className="ml-auto"><CaretDown /></span>
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
            <Menu.Items className="absolute right-0 mt-1 min-w-[123px] p-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-dropdown z-10 focus:outline-none">
                <div className="px-1 py-1 ">
                    <Menu.Item>
                        {({ active }) => (
                            <div onClick={(e) => onChange(2)} className="text-neutral-80 cursor-pointer text-sm hover:bg-neutral-10 w-full p-2 rounded-md transition">Active</div>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <div onClick={(e) => onChange(1)} className="text-neutral-80 cursor-pointer text-sm hover:bg-neutral-10 w-full p-2 rounded-md transition">Sold out</div>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <div onClick={(e) => onChange(0)} className="text-neutral-80 cursor-pointer text-sm hover:bg-neutral-10 w-full p-2 rounded-md transition">Hidden</div>
                        )}
                    </Menu.Item>
                </div>
            </Menu.Items>
        </Transition>
    </Menu>
}

export default PlacesStatus;
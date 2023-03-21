import React, { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDown } from 'assets/icons/ChevronDown';
import { Value } from 'sass';
import { languages, getEmojiFlag } from 'countries-list';

const SelectLanguage = ({ selectDefault, onSelected }: {
    selectDefault?: any,
    onSelected: (data: any) => void
}) => {
    const [selected, setSelected] = useState<any>();
    useEffect(() => {
        if(selectDefault) {
            setSelected(selectDefault);
        } else {
            {/*@ts-ignore*/}
            var userLang = navigator.language || navigator.userLanguage; 
            
            setSelected(userLang.split('-')[0]);
            onSelected(userLang.split('-')[0]);
        }
    }, [selectDefault]);

    const onchange = (data: Value) => {
        onSelected(data);
        setSelected(data);
    }

    return (
        <div className="rounded-md border border-neutral-30 text-base mt-2 min-h-[41px]">
            <Listbox value={selected} onChange={onchange}>
                <div className="relative pt-0.5">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-transparent py-2 pl-2 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="flex items-center truncate">
                            <i className="flag flag-us"></i>
                            {/*@ts-ignore*/}
                            
                            <span className=''>{languages[selected]?.name}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 -top-1">
                            <ChevronDown
                                className="h-5 w-5 text-neutral-80"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute z-10 mt-4 bottom-12 p-3 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-dropdown focus:outline-none sm:text-sm">
                            {Object.keys(languages)?.map((item, index: number) => (
                                <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative select-none!font-normal text-left cursor-pointer text-sm hover:bg-neutral-10 w-full p-2 rounded-md transition${active ? 'text-primary-light' : 'text-gray-900'
                                        }`
                                    }
                                    value={item}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'text-primary-light font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                <span>
                                                    {/*@ts-ignore*/
                                                        languages[item].name}</span>
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">

                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

export { SelectLanguage };
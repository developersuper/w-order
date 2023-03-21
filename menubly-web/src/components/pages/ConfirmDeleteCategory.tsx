
import React from "react";

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ButtonDefault, ButtonPrimary } from "components/form/Buttton";
import H3 from "components/headings/H3";

const ConfirmDeleteCategory = ({ isOpen, closeModal, name }: { isOpen: boolean, closeModal: (data?: boolean) => void, name?: string }) => {

    return (
        <>
            
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => {}}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25 pointer-events-none" aria-hidden="true" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className=""
                                    >
                                        <H3>Delete category {name}?</H3>
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <p className="text-base text-neutral-80">
                                        All items belong to this category will also be deleted permanently and cannot be recovered. Your customers won’t be able to see this category and its items on the menu anymore.
                                        </p>
                                    </div>

                                    <div className="flex mt-8">
                                        <div className="flex flex-col sm:flex-row ml-auto w-full sm:w-auto">
                                            <ButtonDefault size="small" styles="!w-auto sm:mr-4 !text-default-error !border-default-error !font-medium" onClick={() => closeModal(true)}>
                                                Yes, delete this category
                                            </ButtonDefault>
                                            <ButtonPrimary size="small" onClick={() => closeModal(false)} styles="!font-medium mt-4 sm:mt-0">
                                                No, keep this category
                                            </ButtonPrimary>
                                        </div>
                                        
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ConfirmDeleteCategory;
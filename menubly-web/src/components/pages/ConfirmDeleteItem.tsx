
import React from "react";

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ButtonDefault, ButtonPrimary } from "components/form/Buttton";
import H3 from "components/headings/H3";

const ConfirmDeleteItem = ({ isOpen, closeModal, name }: {
    isOpen: boolean, 
    closeModal: (data?: boolean) => void, 
    name?: string
}) => {
    return (
        <>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { }}>
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
                                        <H3>Delete item {name}?</H3>
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <p className="text-base text-neutral-80">
                                            The item will be deleted permanently and cannot be recovered. Your customers won’t be able to see this item on the menu anymore.
                                        </p>
                                    </div>

                                    <div className="flex mt-8">
                                        <div className="flex ml-auto">
                                            <ButtonDefault size="small" styles="!w-auto mr-4 !text-default-error !border-default-error !font-medium" onClick={() => closeModal(true)}>
                                                Yes, delete this item
                                            </ButtonDefault>
                                            <ButtonPrimary size="small" onClick={() => closeModal(false)} styles="!font-medium">
                                                No, keep this item
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

export default ConfirmDeleteItem;
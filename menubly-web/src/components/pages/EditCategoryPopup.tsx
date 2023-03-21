import { Dialog, Transition } from "@headlessui/react";
import { AlertIcon } from "assets/icons";
import { ButtonDefault, ButtonPrimary, Input, Label } from "components/form";
import H3 from "components/headings/H3";
import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";

export const EditCategoryPopup = ({ isOpen, closeModal, name, indexPlace }: { isOpen: boolean, closeModal: (data?: any) => void, name?: string, indexPlace?: number }) => {
    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        trigger,
        reset,
        getFieldState,
        formState: { errors, isValid, isDirty },
    } = useForm<any>({
        defaultValues: {
            name
        },
        mode: "onChange"
    });

    useEffect(() => {
        setValue('name', name, {shouldDirty: false});
        reset(getValues());
    }, [name])
    const onSubmit = async (data: any, e: any) => {
        closeModal({value: data?.name, indexPlace: indexPlace});
    }

    return <>
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
                                    <H3>Edit Category</H3>
                                </Dialog.Title>
                                <div className="mt-4">
                                    <form className="p-0" onSubmit={handleSubmit(onSubmit)}>
                                        <div className='md:pr-2'>
                                            <Label name="Category name" />
                                            <Input control={control} name="name" rules={{
                                                required: 'This is required.',
                                            }} placeholder="Enter Category name" type="text" />
                                            {errors.name && getFieldState('name').isTouched && <span className="text-sm text-default-error mt-2 flex items-center space-x-2">
                                                <span className="flex-none"><AlertIcon /></span>
                                                <span>This is required.</span>
                                            </span>}
                                        </div>
                                        <div className="flex mt-8">
                                            <div className="flex flex-col sm:flex-row ml-auto w-full sm:w-auto">
                                                <ButtonDefault size="small" styles="!w-auto sm:mr-4 !font-medium min-w-[71px]" onClick={() => closeModal(true)}>
                                                    Cancel
                                                </ButtonDefault>
                                                <ButtonPrimary type="submit" size="small" disabled={!isDirty} styles="!font-medium mt-4 sm:mt-0">
                                                    Change
                                                </ButtonPrimary>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
}
import { AlertIcon } from "assets/icons/Alert";
import * as React from "react";
import { useForm, useController, UseControllerProps } from "react-hook-form";

function InputPrefix(props: UseControllerProps | any) {
    const { field, fieldState, formState } = useController(props);

    return (
        <div className="mt-2">
            <div className="bg-white px-2 py-2 flex items-center rounded-md border border-neutral-30 overflow-hidden">
                <span className="flex-none text-neutral-30 text-base">
                    {props.prefix}
                </span>
                <input {...field}
                    placeholder={props.placeholder}
                    type={props.type}
                    disabled={props.disabled}
                    className={`block w-full font-normal bg-white text-base focus:outline-0
                    ${fieldState.invalid ? 'border-default-error' : 'border-neutral-30'}`} />

            </div>
            {fieldState?.error?.message && <span className="text-sm text-default-error mt-2.5 flex items-center space-x-2">
                <AlertIcon />
                <span>{fieldState?.error?.message}</span>
            </span>}
        </div>
    );
}

export {InputPrefix};
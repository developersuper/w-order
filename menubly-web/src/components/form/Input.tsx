import { AlertIcon } from "assets/icons/Alert";
import * as React from "react";
import { useForm, useController, UseControllerProps } from "react-hook-form";

function Input(props: UseControllerProps | any) {
    const { field, fieldState, formState } = useController(props);

    return (
        <div className="mt-2">
            <div className="relative">
                <input {...field}
                    placeholder={props.placeholder}
                    onChange={field.onChange} 
                    type={props.type}
                    value={field.value}
                    disabled={props?.disabled}
                    className={`px-2 py-2  block w-full font-normal rounded-md border border-neutral-30 text-base
                ${fieldState.invalid ? 'border-default-error' : 'border-neutral-30'}
                ${props?.disabled ? '': 'bg-white'} ${props.className}`} 
                
                />
                {props?.suffix && <button type="button" onClick={props.onSuffix} className="absolute right-2.5 top-2.5">
                    {props?.suffix}
                </button>}
            </div>
            {fieldState?.error?.message && <span className="text-sm text-default-error mt-2.5 flex items-center space-x-2">
                <span className="flex-none"><AlertIcon /></span>
                <span dangerouslySetInnerHTML={{ __html: fieldState?.error?.message }} />
            </span>}
        </div>
    );
}

export { Input };
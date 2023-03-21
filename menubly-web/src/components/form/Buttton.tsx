import React, { ReactNode } from "react"
export const ButtonPrimary = ({ children, onClick, styles, size, disabled, type }: { 
    children: ReactNode, onClick?: () => void, styles?: string, size?: string, disabled?: boolean, type?: any }
    ) => {
    return (
        <button type={type || "button"} disabled={disabled} className={`flex items-center justify-center rounded-xl border border-primary-light 
        hover:bg-teal-70 bg-primary-light font-semibold text-white transition  ${styles}
        ${size == 'small' ? 'text-sm py-2 px-3.5 h-10' : 'text-sm py-2 px-3.5 h-10'}
        ${disabled && 'opacity-70 cursor-not-allowed'}
        `}
        onClick={onClick}
        >
            {children}
        </button>
    )
}

export const ButtonDefault = ({ children, onClick, styles, size, disabled , type="button" }: 
{ children: ReactNode, onClick?: () => void, styles?: string, size?: string, disabled?: boolean, type?: any }) => {
    return (
        <button type={type} onClick={onClick} disabled={disabled} className={`flex items-center justify-center space-x-2.5 
            rounded-xl border border-neutral-30 text-neutral-80 font-semibold hover:bg-neutral-30/10 transition
            ${styles}
            ${size == 'small' ? 'text-sm py-2 px-1 md:px-3.5 h-10' : 'text-sm py-2 px-1 md:px-3.5 h-10'}
            ${disabled && 'opacity-70 !text-neutral-40 cursor-not-allowed'}
            `}>
            {children}
        </button>
    )
}
import React from "react";
export const ChevronLeft = ({className}: {className?: string}) => {
    return (
        <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M19.943 24.276C19.4223 24.7967 18.5781 24.7967 18.0574 24.276L10.724 16.9426C10.2033 16.4219 10.2033 15.5777 10.724 15.057L18.0574 7.7237C18.5781 7.203 19.4223 7.203 19.943 7.7237C20.4637 8.24439 20.4637 9.08862 19.943 9.60931L13.5524 15.9998L19.943 22.3904C20.4637 22.9111 20.4637 23.7553 19.943 24.276Z" fill="currentColor"/>
        </svg>        

    )
}
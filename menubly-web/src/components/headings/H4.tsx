import React, { ReactNode } from "react";

const H4 = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <h4 className={`${className} text-neutral-80 text-lg font-normal`}>
            {children}
        </h4>
    )
}

export default H4;
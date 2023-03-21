import React, { ReactNode } from "react";

const H3 = ({ title, className, children }: { title?: string, className?: string, children?: ReactNode }) => {
    return (
        <h3 className={`${className} font-bold text-neutral-80 text-22px`}>
            {title || children}
        </h3>
    )
}

export default H3;
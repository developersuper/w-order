import React, { ReactNode } from "react";

const DangerPanel = ({children}: {children: ReactNode}) => {
    return (
        <div className="bg-red-30 p-5 text-sm text-neutral-80 text-base rounded-sm shadow-medium">
            {children}
        </div>
    )
}

export default DangerPanel;
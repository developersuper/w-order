import React from "react";

export const Spinner = ({name='loader01', color}: {name?: string, color?: string}) => {
    return <div className={`${name} ${color}`}></div>
}
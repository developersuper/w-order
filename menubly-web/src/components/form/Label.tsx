import React  from "react";

const Label = ({name, isRequired}: {name: string, isRequired?: boolean}) => {
    return(
        <>
            <label className="text-base text-neutral-80 font-medium">
                {name}
                {isRequired && <span className="text-default-error ml-1 inline-block">*</span>}
            </label>
        </>
    )
}

export{ Label };
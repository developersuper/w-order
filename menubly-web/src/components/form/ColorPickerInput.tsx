import React, { useEffect, useState } from "react";
import 'rc-color-picker/assets/index.css';
var ColorPicker = require('rc-color-picker');

const ColorPickerInput = ({color, onChange}: {color: string, onChange: (color: string) => void}) => {
    const [select, setSelect] = useState<string>();

    useEffect(() => {
        let colorDefault = color;
        if(!color) {
            colorDefault = '#30A9A6';
        }
        setSelect(colorDefault);
    }, [color]);

    const onSelect = (value: string) => {
        setSelect(value);
        onChange(value);
    }

    return (
        <>
            <div className="relative px-2 py-2 bg-white block w-full font-normal rounded-md border border-neutral-30 text-base">
                <input type='text' value={select} onChange={(event) => {onSelect(event?.target.value)}} className="focus:outline-none border-0 w-full pr-4" />
                <div className="absolute right-2 top-2.5">
                    <ColorPicker
                        animation="slide-up"
                        color={select}
                        onClose={(color: any) => { onSelect(color.color) }}
                    />
                </div>
            </div>
        </>
    )
}

export {ColorPickerInput};
import React, { useEffect, useState } from "react";
import { ButtonDefault, ButtonPrimary } from "components/form/Buttton";
import { Label, ColorPickerInput, Input, SelectList } from "components/form";
import { Currencies } from "constant/currencies";
import { useAuth } from "contexts/Auth/AuthContext";
import { useForm } from "react-hook-form";
import PlaceService from "services/places.service";
import ImageUpload from "./ImageUpload";
import { Spinner } from "components/spinner/Spinner";
import customToast from "components/Toast/ToastSuccess";

const InforAndBrandForm = ({
    id,
    headerColor = '#30A9A6',
    headerImage,
    themeColor = '#30A9A6',
    textColor = '#000000',
    backgroundColor = '#ffffff',
    logo,
    onSaved }: any) => {
    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        trigger,
        register,
        reset,
        formState: { errors, isValid, isDirty },
    } = useForm<any>({
        defaultValues: {
            headerColor,
            headerImage,
            themeColor,
            logo,
            textColor,
            backgroundColor
        },
        mode: "onChange"
    });
    const auth = useAuth();
    const [header, setHeader] = useState('color');
    const [logoImage, setLogoImage] = useState('image');
    const [currencies, setCurrencies] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: any, e: any) => {
        try {
            if (loading || !isValid) {
                return;
            }
            if(header == 'color') {
                delete data.headerImage;
            } else {
                delete data.headerColor;
            }
            setLoading(true);
            await PlaceService.updatePlacesById(auth?.user?.userId, id, data);
            setLoading(false);
            customToast.success(`${name} is updated successfully`);
            onSaved();
            reset(getValues());

        } catch {
            customToast.error(`${name} is updated failure`);
            setLoading(false);
        }
    };

    useEffect(() => {
        const currencies = Currencies.map(item => {
            return {
                ...item,
                label: item?.name + ' (' + item?.symbol + ')',
                value: item?.code
            }
        });
        setCurrencies(currencies);

    }, [])

    useEffect(() => {
        setHeader('color');
        if (headerImage) {
            setHeader('image');
        }
    }, [headerImage]);

    useEffect(() => {
        setLogoImage('none');
        if (logo) {
            setLogoImage('image');
        }
    }, [logo]);

    useEffect(() => {
        if(headerColor){
            setValue('headerColor', headerColor);
        }
        if(headerImage) {
            setValue('headerImage', headerImage);
        }
        setValue('themeColor', themeColor);
        setValue('textColor', textColor);
        setValue('backgroundColor', backgroundColor);
        setValue('logo', logo);
        reset(getValues());
    }, [id])

    return (
        <>
            <form className="p-4 md:p-0" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row mt-6">
                    <div className="md:w-1/2">
                        <div className='md:max-w-[300px] md:pr-4'>
                            <Label name="Theme color" isRequired={true} />
                            <div className="mt-2">
                                <ColorPickerInput color={themeColor} onChange={(color: string) => {
                                    setValue('themeColor', color, { shouldDirty: true });
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-4 md:mt-0">
                        <div className='md:max-w-[300px]'>
                            <Label name="Text color" isRequired={true} />
                            <div className="mt-2">
                                <ColorPickerInput color={textColor} onChange={(color: string) => {
                                    setValue('textColor', color, { shouldDirty: true });
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row mt-6">
                    <div className="w-full md:w-1/2">
                        <div className='md:pr-4 md:max-w-[300px]'>
                            <Label name="Background color" isRequired={true} />
                            <div className="mt-2">
                                <ColorPickerInput color={backgroundColor} onChange={(color: string) => {
                                    setValue('backgroundColor', color, { shouldDirty: true });
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 mt-4 md:mt-0">
                    </div>
                </div>
                <div className="flex flex-col md:flex-row mt-6">
                    <div className="md:w-1/2">
                        <div className='md:max-w-[300px] md:pr-4'>
                            <Label name="Header" />
                            <div className="flex mt-2">
                                <div className="flex items-center mr-4">
                                    <input
                                        type="radio"
                                        name="header"
                                        value="color"
                                        id="color"
                                        checked={header == 'color'}
                                        onChange={() => {
                                            setHeader('color');
                                            setValue('headerColor', headerColor, { shouldDirty: true });
                                            setValue('headerImage', '', { shouldDirty: true });
                                            trigger('headerColor');
                                        }}
                                    />
                                    <label className="body-default ml-2 cursor-pointer" htmlFor="color">Color</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="header"
                                        value="image"
                                        checked={header == 'image'}
                                        id="image"
                                        onChange={() => {
                                            setHeader('image');
                                            setValue('headerColor', headerColor, {
                                                shouldDirty: true
                                            });
                                            trigger();
                                        }}
                                    />
                                    <label className="body-default ml-2 cursor-pointer" htmlFor="image">Image</label>
                                </div>
                            </div>
                            <div className="mt-2.5">
                                {header == 'color' && <ColorPickerInput color={headerColor} onChange={(color: string) => {
                                    setValue('headerColor', color, { shouldDirty: true });
                                    setValue('headerImage', headerImage || '', { shouldDirty: true });
                                }
                                } />}
                                {header == 'image' && <ImageUpload imageDefault={headerImage} onSelect={(data) => {
                                    setValue('headerImage', data, { shouldDirty: true });
                                    setValue('headerColor', '', { shouldDirty: true });
                                }
                                } />}
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-4 md:mt-0">
                        <div className='md:max-w-[300px]'>
                            <Label name="Logo image" />
                            <div className="flex mt-2">
                                <div className="flex items-center mr-4">
                                    <input
                                        type="radio"
                                        name="logo"
                                        value="none"
                                        id="none"
                                        checked={logoImage == 'none'}
                                        onChange={() => {
                                            setLogoImage('none');
                                            setValue('logo', '', { shouldDirty: true });
                                        }}
                                    />
                                    <label className="body-default ml-2" htmlFor="none">None</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="logo"
                                        value="image"
                                        id="logo_image"
                                        checked={logoImage == 'image'}
                                        onChange={() => setLogoImage('image')}
                                    />
                                    <label className="body-default ml-2" htmlFor="logo_image">Image</label>
                                </div>
                            </div>
                            <div className="mt-2.5">
                                {logoImage == 'image' && <ImageUpload imageDefault={logo} onSelect={(data) => setValue('logo', data, { shouldDirty: true })} type="image" />}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex mt-6 pl-2">
                    <div className="ml-auto flex">
                        <ButtonDefault type="button" size="small" disabled={!isDirty}>
                            Discard Changes
                        </ButtonDefault>
                        <ButtonPrimary type="submit" size="small" styles="flex ml-4" disabled={!isDirty}>
                            {loading && <Spinner />}
                            <span>{loading && 'Please wait...' || 'Save'}</span>
                        </ButtonPrimary>
                    </div>
                </div>
            </form>
        </>
    )
}

export default InforAndBrandForm;
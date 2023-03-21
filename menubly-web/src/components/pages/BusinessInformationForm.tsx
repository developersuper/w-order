import React, { useEffect, useState } from "react";
import { ButtonDefault, ButtonPrimary } from "components/form/Buttton";
import { Label, Input, SelectList } from "components/form";
import { Currencies } from "constant/currencies";
import { useAuth } from "contexts/Auth/AuthContext";
import { useForm } from "react-hook-form";
import PlaceService from "services/places.service";
import { Spinner } from "components/spinner/Spinner";
import customToast from "components/Toast/ToastSuccess";

const BusinessInformationForm = ({
    id,
    name,
    phoneNumber,
    address,
    currency,
    footerNote,
    note,
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
            name,
            phoneNumber,
            address,
            footerNote,
            currency,
            note
        },
        mode: "onChange"
    });
    const auth = useAuth();
    const [currencies, setCurrencies] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: any, e: any) => {
        try {
            if (loading || !isValid) {
                return;
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
        setValue('name', name);
        setValue('phoneNumber', phoneNumber);
        setValue('address', address);
        setValue('footerNote', footerNote);
        setValue('note', note);
        reset(getValues());
    }, [name])

    useEffect(() => {
        setValue('currency', currency || currencies[0]?.value);
    }, [name, currencies]);

    return (
        <>
            <form className="p-4 md:p-0" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col md:flex-row mt-6">
                    <div className="w-full md:w-1/2">
                        <div className='md:pr-4 md:max-w-[300px]'>
                            <Label name="Place Name" isRequired={true} />
                            <Input control={control} name="name" rules={{
                                required: 'This is required.',
                            }} placeholder="Enter Place Name" type="text" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 mt-6 md:mt-0">
                        <div className='md:max-w-[300px]'>
                            <Label name="Currency" isRequired={true} />
                            {<SelectList data={currencies} selectDefault={getValues('currency')} onSelected={(data) => {
                                setValue('currency', data?.value, { shouldDirty: true });
                                trigger('currency');
                            }} />}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row mt-6">
                    <div className="md:w-1/2">
                        <div className='md:max-w-[300px] md:pr-4'>
                            <Label name="Phone number" />
                            <Input control={control} name="phoneNumber" placeholder="Enter Phone number" type="tel" />
                        </div>
                        <div className="md:max-w-[300px] md:pr-4 mt-6">
                            <Label name="Address" />
                            <div className="mt-2">
                                <textarea
                                    {...register('address')}
                                    onChange={(e) => { setValue('address', e?.target?.value, { shouldDirty: true }); trigger('address') }}
                                    name="description"
                                    className="rounded-md border border-neutral-30 text-base w-full py-2 px-2.5"
                                    placeholder="Your address here"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-4 md:mt-0">
                        <div className='md:max-w-[300px]'>
                            <Label name="Header Note" />
                            <div className="mt-2">
                                <textarea
                                    {...register('note')}
                                    name="description"
                                    onChange={(e) => { setValue('note', e?.target?.value, { shouldDirty: true }); trigger('note') }}
                                    className="rounded-md border border-neutral-30 text-base w-full py-2 px-2.5 min-h-[71px]"
                                    placeholder="Add extra information such as wifi password, delivery policy..."></textarea>
                            </div>
                        </div>
                        <div className='md:max-w-[300px] mt-6'>
                            <Label name="Foot note" />
                            <div className="mt-2">
                                <textarea
                                    {...register('footerNote')}
                                    name="footerNote"
                                    onChange={(e) => { setValue('footerNote', e?.target?.value, { shouldDirty: true }); trigger('footerNote') }}
                                    className="rounded-md border border-neutral-30 text-base w-full py-2 px-2.5 min-h-[71px]"
                                    placeholder="Add extra information such as VAT inclusive or not"></textarea>
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

export default BusinessInformationForm;
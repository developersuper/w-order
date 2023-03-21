import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {Label, Input, InputPrefix, ButtonPrimary} from 'components/form';
import { Spinner } from 'components/spinner/Spinner';
import { Logo } from 'assets/icons/Logo';
import H3 from 'components/headings/H3';
import { useAuth } from 'contexts/Auth/AuthContext';
import PlaceService from 'services/places.service';
import { convert_vi_to_en } from 'utils';
import { SelectLanguage } from 'components/pages/SelectLanguage';

const SetupMenu: React.FC = () => {
    const { t: translator } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    const [error, setError] = useState<any>();
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        setValue
    } = useForm({
        defaultValues: {
            placeName: "",
            placeUrl: "",
            language: ""
        },
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<any> = async (value) => {
        try {
            if (loading) {
                return;
            }
            setLoading(true);
            const response = await PlaceService.createPlacesServiceFirst(auth.user?.userId, { ...value });
            if(response?.data) {
                auth.update({...auth.user, hasPlace: true});
            }
            return navigate('/');
        } catch (error: any) {
            setError(error?.response?.data?.error || 'fail');
            setLoading(false);
        }
    }

    const business_name = useWatch({
        control,
        name: "placeName"
      });
    useEffect(() => {
        setValue('placeUrl', convert_vi_to_en(business_name)?.toLowerCase().replaceAll(' ', '-'))
    }, [business_name]);

    return (
        <div className="max-w-[390px] px-4 m-auto py-[120px] w-full">
            <div className="flex justify-center text-center">
                <Logo />
            </div>
            <H3 title="Let’s set up your menu" className="my-6 text-center" />
            <div className="SetupMenuPage">
                <form>

                    {error && <div className='bg-red-30 px-8 py-5 text-neutral-80 text-base mb-6 rounded-md'>
                        {error?.message || "Opps, something wrong, Please try again."}
                    </div>}
                    <div className='mb-[29px]'>
                        <Label name="Business Name" isRequired={true}/>
                        <Input control={control} name="placeName"
                            rules={{
                                required: 'This is required.',
                            }} placeholder="John" type="text"
                            className="!bg-transparent" />
                    </div>
                    <div className='mb-2.5'>
                        <Label name="URL " isRequired={true}/>
                        <InputPrefix prefix="menubly.com/" control={control} name="placeUrl" disabled={true} rules={{ required: 'This is required.' }} placeholder="" type="text" />
                    </div>
                    <p className='body-small'>This is your menu link, you can change later.</p>
                    <div className='mb-2.5 mt-[29px]'>
                        <Label name="Primary Language " isRequired={true}/>
                        <SelectLanguage selectDefault="" onSelected={(value) => {setValue('language', value)}} />
                    </div>
                    <div className='mt-6'>
                        <ButtonPrimary onClick={handleSubmit(onSubmit)} styles="w-full">
                            <div className='flex items-center justify-center'>
                                {loading && <Spinner />}
                                <span>{loading && 'Please wait...' || 'Create my menu'}</span>
                            </div>
                        </ButtonPrimary>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SetupMenu;

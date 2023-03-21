import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FORM_CONST } from 'constant/form.const';
import {Label, Input, ButtonPrimary} from 'components/form';
import { Spinner } from 'components/spinner/Spinner';
import { Logo } from 'assets/icons/Logo';
import H3 from 'components/headings/H3';
import AuthService from 'services/auth.service';
import { GeneralView } from 'assets/icons/GeneralView';
import { GeneralHide } from 'assets/icons/GeneralHide';

const ResetPassword: React.FC = () => {
    const { t: translator } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [searchParams] = useSearchParams();
    const [showPassword, setShowPassword] = useState(true);
    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            business_name: "",
            url: ""
        },
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<any> = async (value) => {
        try {
            setError(null);
            if (loading) {
                return;
            }
            setLoading(true);
            await AuthService.resetPassword({ password: value.password, code: searchParams.get('code') || '' });
            setLoading(false);
            navigate(`/change-password-success`);

        } catch (error: any) {
            console.error(error);
            setError({
                error: error?.response?.data?.error,
                status: error?.response?.status
            });
            setLoading(false);
        }
    }

    return (
        <div className="max-w-[390px] px-4 m-auto py-[120px] w-full">
            <div className="flex justify-center text-center">
                <Logo />
            </div>
            <H3 title="Enter new password" className="my-6 text-center" />
            <div className="ResetPasswordPage">
                <form>
                    {error && <div className='bg-red-30 px-8 py-5 text-neutral-80 text-base mb-6 rounded-md'>
                        {error?.error?.message || "The link was expired, please try other link"}
                    </div>}
                    <div className='mb-[29px]'>
                        <Label name="New Password" isRequired={true} />
                        <Input control={control} name="password" rules={{
                            required: 'This is required.',
                            pattern: {
                                value: FORM_CONST.PASSWORD_REGEX,
                                message: 'Need at least:<br />- 1 special characters<br /> - 1 uppercase letter<br /> - 1 lowercase letter'
                            },
                            minLength: {
                                value: 8,
                                message: "Need at least 8 characters"
                            }
                        }} placeholder="New Password" type={showPassword ? 'password' : 'text'}
                            suffix={showPassword ? <GeneralHide /> : <GeneralView />}
                            onSuffix={() => setShowPassword(!showPassword)}
                        />
                    </div>
                    <div className='mt-6'>
                        <ButtonPrimary onClick={handleSubmit(onSubmit)} styles="w-full">
                            <div className='flex items-center justify-center'>
                                {loading && <Spinner />}
                                <span>{loading && 'Please wait...' || 'Set new password'}</span>
                            </div>
                        </ButtonPrimary>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;

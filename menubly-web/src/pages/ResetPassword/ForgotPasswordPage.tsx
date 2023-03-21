import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FORM_CONST } from 'constant/form.const';
import {Label, Input, ButtonPrimary} from 'components/form';
import { Spinner } from 'components/spinner/Spinner';
import { Logo } from 'assets/icons/Logo';
import H3 from 'components/headings/H3';
import AuthService from 'services/auth.service';
import { AlertIcon } from 'assets/icons/Alert';

const ForgotPassword: React.FC = () => {
    const { t: translator } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
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
            await AuthService.forgotPassword({ username: value.email });
            setLoading(false);
            navigate(`/check-your-mail?email=${value.email}`);

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
            <H3 title="Reset password" className="my-6 text-center" />
            <div className="ForgotPasswordPage">
                <form>
                    {error && error?.status != 404 && <div className='bg-red-30 px-8 py-5 text-neutral-80 text-base mb-6 rounded-md'>
                        {error?.message || "The email doesn't exist in the system"}
                    </div>}
                    <div className='mb-[29px]'>
                        <Label name="Email" isRequired={true} />
                        <Input control={control} name="email"
                            rules={{
                                required: 'This is required.',
                                pattern: {
                                    value: FORM_CONST.EMAIL_REGEX,
                                    message: 'Invalid email address.'
                                }
                            }} placeholder="johndoe@mail.com" type="text" />
                        {error?.status == 404 && 
                        <span className="text-sm text-default-error mt-2.5 flex items-center space-x-2">
                            <span className="flex-none"><AlertIcon /></span>
                            <div>
                                Email is not registered yet. <Link className='text-default-error underline hover:text-primary-light' to="/signup">Sign up</Link>  instead.
                            </div>
                        </span>}
                    </div>
                    <div className='mt-6'>
                        <ButtonPrimary onClick={handleSubmit(onSubmit)} styles="w-full">
                            <div className='flex items-center justify-center'>
                                {loading && <Spinner />}
                                <span>{loading && 'Please wait...' || 'Email me reset link'}</span>
                            </div>
                        </ButtonPrimary>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;

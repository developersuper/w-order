import React, { useState } from "react";
import H3 from "components/headings/H3";
import { AuthLoginType } from "types/Auth.type";
import { useForm, SubmitHandler } from 'react-hook-form';
import {Label, Input, ButtonDefault, ButtonPrimary } from "components/form";
import { FORM_CONST } from "constant/form.const";
import { Spinner } from "components/spinner/Spinner";
import { GoogleIcon, Logo, GeneralHide, GeneralView } from "assets/icons";
import { Link } from 'react-router-dom';
import AuthService from "services/auth.service";
import { ToastContainer } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import customToast from "components/Toast/ToastSuccess";
import { useAuth } from "contexts/Auth/AuthContext";

const Signup = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>();

    const [showPassword, setShowPassword] = useState(true);
    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors, isValid },
    } = useForm<AuthLoginType>({
        defaultValues: {
            username: "",
            password: "" 
        },
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<AuthLoginType> = async ({ firstName, email, password }: AuthLoginType) => {
        if(loading) {
            return;
        }
        setLoading(true);
        try {
            await AuthService.signup({
                firstName,
                email,
                password
            });
            customToast.success('Created user successfuly!');
            login(email, password, true);
        } catch (error: any) {
            setError(error?.response?.data?.error)
            setLoading(false);
        }
    }
    return (<>
        <div className="max-w-[390px] px-4 m-auto py-[120px]">
            <div className="flex justify-center text-center">
                <Logo />
            </div>
            <H3 title="Get started for free" className="my-6 text-center" />
            <div className='mt-4 hidden'>
                <ButtonDefault>
                    <GoogleIcon /> <span className='aligin-center mt-1'>Sign up with Google</span>
                </ButtonDefault>
            </div>
            <div className="flex items-center my-6 hidden">
                <div className="w-full h-[1px] bg-neutral-30 mt-1"></div>
                <div className="flex-none px-4 text-base text-neutral-80">or</div>
                <div className="w-full h-[1px] bg-neutral-30 mt-1"></div>
            </div>
            <form>
                {error?.message && <div className='bg-red-30 px-8 py-5 text-neutral-80 text-base mb-6 rounded-md'>
                    {error?.message}
                </div>}
                <div className='mb-[29px]'>
                    <Label name="First Name" isRequired={true} />
                    <Input control={control} name="firstName"
                        rules={{
                            required: 'This is required.',
                        }} placeholder="Type your name here" type="text" />
                </div>
                <div className='mb-[29px]'>
                    <Label name="Email" isRequired={true} />
                    <Input control={control} name="email" rules={{
                        required: 'This is required.',
                        pattern: {
                            value: FORM_CONST.EMAIL_REGEX,
                            message: 'Invalid email address.'
                        }
                    }} placeholder="name@domain.com" type="email" />
                </div>
                <div className='mb-6'>
                    <Label name="Password" isRequired={true} />
                    <Input control={control} name="password" rules={{
                        required: 'This is required.',
                        minLength: {
                            value: 8,
                            message: "Need at least 8 characters"
                        }
                    }} placeholder="at least 8 characters" type={showPassword ? 'password' : 'text'}
                        suffix={showPassword ? <GeneralHide /> : <GeneralView />}
                        onSuffix={() => setShowPassword(!showPassword)}
                    />
                </div>
                <p className="body-small max-w-[290px]">By signing up, you confirm that you&apos;ve read
                    and accepted Menubly&apos;s <a href="https://www.menubly.com/terms/" target="_blank" rel="noreferrer">Terms of Service</a> and <a href="https://www.menubly.com/privacy-policy/" target="_blank" rel="noreferrer">Privacy Policy.</a></p>
                <div className='mt-6'>
                    <ButtonPrimary onClick={handleSubmit(onSubmit)} styles="w-full">
                        <div className='flex items-center justify-center'>
                            {loading && <Spinner />}
                            <span>{loading && 'Please wait...' || 'Get Started'}</span>
                        </div>
                    </ButtonPrimary>
                </div>
                <div className="body-small mt-6">
                    Already have an account? <Link to="/login">Log in</Link>
                </div>
            </form>
        </div>
        <ToastContainer />
    </>)
}

export default Signup;
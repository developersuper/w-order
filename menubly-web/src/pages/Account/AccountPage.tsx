import React, { useState } from "react";
import H2 from "components/headings/H2";
import { useParams } from "react-router-dom";
import { useAuth } from "contexts/Auth/AuthContext";
import 'react-tooltip/dist/react-tooltip.css';
import { useAppDispatch } from "store/hooks";
import { useForm } from "react-hook-form";
import { AuthLoginType } from "types/Auth.type";
import { ButtonPrimary, Input, Label } from "components/form";
import { FORM_CONST } from "constant/form.const";
import { Spinner } from "components/spinner/Spinner";
import AuthService from "services/auth.service";
import customToast from "components/Toast/ToastSuccess";
const AccountPage = () => {
    const auth = useAuth();
    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors, isValid },
        watch
    } = useForm<AuthLoginType>({
        defaultValues: {
            firstName: auth?.user?.firstName,
            email: auth?.user?.email
        },
        mode: "onChange"
    });
    const [loading, setLoading] = useState(false);
    const watchFirstName = watch("firstName");
    const onSubmit = async ({ firstName }: any) => {
        try {
            setLoading(true);
            await AuthService.updateProfileByUserId(auth.user.userId, {
                firstName
            });
            auth.update({firstName, userId: auth.user.userId, email: auth?.user?.email});
            setLoading(false);
            customToast.success(`Your account is updated successfully`);
        } catch {
            setLoading(false);
            customToast.error(`Your account is updated failure`);
        }
        
    };

    return (<>
        <div className="accountPage px-4 md:px-0">
            <H2>Account</H2>
            <div className="flex items-center my-[35px]">
                <form className="w-full md:max-w-[320px]" onSubmit={handleSubmit(onSubmit)}>

                    <div className='mb-[29px]'>
                        <Label name="Name" />
                        <Input control={control} name="firstName"
                            rules={{
                                required: 'This is required.',
                            }} placeholder="Type your name here" type="text" />
                    </div>
                    <div className='mb-[29px]'>
                        <Label name="Email" />
                        <Input control={control}
                            name="email"
                            disabled={true}
                            rules={{
                                required: 'This is required.',
                            }} placeholder="Type your name here" type="text" />
                    </div>
                    <div className='mt-6 flex'>
                        <ButtonPrimary size="small" type='submit' styles="ml-auto md:ml-0 lg:ml-auto" disabled={auth.user.firstName == watchFirstName?.trim()}>
                            <div className='flex items-center justify-center'>
                                {loading && <Spinner />}
                                <span>{loading && 'Please wait...' || 'Save'}</span>
                            </div>
                        </ButtonPrimary>
                    </div>
                </form>
            </div>
        </div>
    </>)
}

export default AccountPage;
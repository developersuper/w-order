import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ButtonPrimary } from 'components/form/Buttton';
import { Logo } from 'assets/icons/Logo';
import H3 from 'components/headings/H3';

const CheckYourMail: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    return (
        <div className="max-w-[390px] px-4 m-auto py-[120px] w-full">
            <div className="flex justify-center text-center">
                <Logo />
            </div>
            <H3 title="Please check your email" className="my-6 text-center" />
            <p className='body-default my-6 text-center'>Email to reset password has been sent to {searchParams.get('email')}.</p>
            <div className="CheckYourMail">
                <form>
                    <div>
                        <ButtonPrimary onClick={() => navigate('/login')} styles="w-full">
                            <div className='flex items-center justify-center'>
                                Back to Sign in page
                            </div>
                        </ButtonPrimary>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckYourMail;

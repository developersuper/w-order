import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ButtonPrimary } from 'components/form/Buttton';
import { Logo } from 'assets/icons/Logo';
import H3 from 'components/headings/H3';

const ChangePasswordSuccess: React.FC = () => {
    const { t: translator } = useTranslation();
    const navigate = useNavigate();
    return (
        <div className="max-w-[390px] px-4 m-auto py-[120px] w-full">
            <div className="flex justify-center text-center">
                <Logo />
            </div>
            <H3 title="Password is changed successfully!" className="my-6 text-center" />
            <div className="ChangePasswordSuccess">
                <form>
                    
                    <div className='mt-6'>
                        <ButtonPrimary onClick={() => navigate('/login')} styles="w-full">
                            <div className='flex items-center justify-center'>
                                <span>Sign in</span>
                            </div>
                        </ButtonPrimary>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordSuccess;

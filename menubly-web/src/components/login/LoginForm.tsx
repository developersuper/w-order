import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

import { useAuth } from 'contexts/Auth/AuthContext';
import { FORM_CONST } from 'constant/form.const';
import styles from "./index.module.scss";
import { AuthLoginType } from 'types/Auth.type';
import { Label, Input, ButtonDefault, ButtonPrimary } from 'components/form';
import { GoogleIcon } from 'assets/icons/Google';
import { Spinner } from 'components/spinner/Spinner';
import { GeneralHide } from 'assets/icons/GeneralHide';
import { GeneralView } from 'assets/icons/GeneralView';

const LoginForm: React.FC = () => {
  const { t: translator } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const { user, login, loading, refreshToken, error, setError } = useAuth();
  let keep_logged: any = localStorage.getItem('keep_logged');
  let token = localStorage.getItem('refreshToken');
  if(keep_logged) {
    keep_logged = JSON.parse(keep_logged);
  }
  if(token) {
    keep_logged = true;
  }
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<AuthLoginType | any>({
    defaultValues: {
      username: "",
      password: "",
      keepLogged: keep_logged
    },
    mode: "onChange"
  });

  useEffect(() => {
    setError(null)
  }, [getValues('password'), getValues('username')]);

  useEffect(() => {
    if (user?.has_login_account) {
      i18n.changeLanguage(user?.language ?? process.env.REACT_APP_LANGUAGE_DEFAULT);
    }
  }, [user]);

  useEffect(() => {
    if(token) {
      refreshToken(JSON.parse(token))
    }
  }, [token]);

  const onSubmit: SubmitHandler<AuthLoginType> = ({ username, password, keepLogged }: AuthLoginType) => {
    try {
      if (loading) {
        return;
      }
      login(username, password);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.loginForm}>
      {error && <div className='bg-red-30 px-8 py-5 text-neutral-80 text-base mb-6 rounded-md'>
        {error?.message || 'Incorrect Username or Password, Please try again.'}
      </div>}
      <form>
        <div className='mb-[29px]'>
          <Label name="Email" />
          <Input control={control} name="username"
            rules={{
              required: 'This is required.',
              pattern: {
                value: FORM_CONST.EMAIL_REGEX,
                message: 'Invalid email address.'
              }
            }} placeholder="Type your email here" type="text" />
        </div>
        <div className='mb-[29px]'>
          <Label name="Password " />
          <Input control={control} name="password" rules={{ required: 'This is required.' }} placeholder="Type your password here"
            type={showPassword ? 'password' : 'text'}
            suffix={showPassword ? <GeneralHide /> : <GeneralView />}
            onSuffix={() => setShowPassword(!showPassword)}
          />
        </div>
        <div>
          <label className='flex items-center space-x-2 cursor-pointer'>
            <input type="checkbox"
              {...register('keepLogged')}
              onChange={event=> {
                if(event?.target.checked) {
                  localStorage.setItem('keep_logged', JSON.stringify(true));
                } else {
                  localStorage.removeItem('keep_logged');
                }
              }}
              className='w-4 h-4 border border-neutral-30 rounded algin-center rounded' />
            <span className='p-body-default text-neutral-80'>Keep me logged in</span>
          </label>
        </div>
        <div className='mt-6'>
          <ButtonPrimary onClick={handleSubmit(onSubmit)} styles="w-full">
            <div className='flex items-center justify-center'>
              {loading && <Spinner />}
              <span>{loading && 'Please wait...' || 'Log in'}</span>
            </div>
          </ButtonPrimary>
        </div>
        <div className='mt-4 hidden'>
          <ButtonDefault>
            <GoogleIcon /> <span className='aligin-center mt-1'>Sign in with Google</span>
          </ButtonDefault>
        </div>
        <p className='body-default text-center mt-6'>Don’t have an account?
          <Link to='/signup' className='text-primary-light font-bold hover:underline ml-1'>Sign up</Link></p>
        <p className='text-center mt-2'>
          <Link to='/forgot-password' className='text-primary-light font-bold hover:underline'>Forgot password?</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

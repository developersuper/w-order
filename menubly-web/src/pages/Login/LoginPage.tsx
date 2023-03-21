import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "contexts/Auth/AuthContext";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectForgotEmail, setForgotEmail } from "store/slices/user/userSlice";
import LoginForm from "components/login/LoginForm";
import H3 from "components/headings/H3";
import { Logo } from "assets/icons/Logo";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [sentForgotPassword, setSentForgotPassword] = useState(false);
  const auth = useAuth();
  const location = useLocation();
  const forgotEmail = useAppSelector(selectForgotEmail);
  useEffect(() => {
    if (forgotEmail) {
      setSentForgotPassword(true);
    }
  }, [forgotEmail]);

  const handleCheck = async () => {
    await dispatch(setForgotEmail({ email: null }));
    setSentForgotPassword(false);
  }

  if (auth?.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return (<>
    <div className="max-w-[390px] px-4 m-auto py-[120px]">
      <div className="flex justify-center text-center">
        <Logo />
      </div>
      <H3 title="Welcome back" className="my-6 text-center" />
      <LoginForm />
    </div>
  </>)
}

export default LoginPage;
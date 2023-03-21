import React, { useState, ReactNode, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError, AxiosRequestConfig } from "axios";
import AuthContext from "./AuthContext";
import { UserType } from "types/User.type";
import { NormalResponseError } from "types/Common.type";
import AuthService from "services/auth.service";
import axiosInstance from "services/restful.service";
import { AUTH_CONST } from "constant/auth.const";
import { useAppDispatch } from "store/hooks";

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<UserType>();
  const [error, setError] = useState<NormalResponseError | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const navigate = useNavigate();

  const axiosInstanceIntceptorWithCookie = (config: AxiosRequestConfig) => {
    let user = localStorage.getItem('user');
    let token;
    if(user) {
      token = JSON.parse(user).accessToken;
    }

    const newHeaders = { ...config } as any;
    if (token) {
      newHeaders.headers["Authorization"] = 'Bearer '+ token;
    }
    return newHeaders;
  };

  useEffect(() => {
    setError(null);
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
    }
    setLoadingInitial(false);
  }, []);

  React.useEffect(() => {
    let idInteceptor;
    if (user?.accessToken) {
      idInteceptor = axiosInstance.interceptors.request.use(
        axiosInstanceIntceptorWithCookie,
        function (error: any) {
          return Promise.reject(error);
        }
      );
    } else {
      if (idInteceptor) {
        axiosInstance.interceptors.request.eject(idInteceptor);
      }
    }
    axiosInstance.interceptors.response.use(
      function (response: any) {
        return response;
      },
      function (error: AxiosError) {
        const { data, status } = error.response as any;
        if (
          (status === 401 || data?.error?.code === 401) &&
          localStorage.getItem("user")) {
          localStorage.removeItem("user");
          setUser(undefined);
          logout();
        }
        if (status === 404 || data?.error?.code === 404) {
          navigate("/404");
        }
        if (
          (status === 403 || data?.error?.code === 403) &&
          data?.error?.name === AUTH_CONST.UNAUTHORIZED
        ) {
          setError(data);
        }
        return Promise.reject(error);
      }
    );
  }, [user?.accessToken]);

  const login = (username: string, password: string, isSignUp?: boolean) => {
    try {
      setLoading(true);
      setError(null);
      AuthService.login({ username, password })
        .then(async (response: any) => {
          if (response?.data) {
            
            checkLogin(response, isSignUp);
          }
        })
        .catch((error: any) => {
          setError(error?.response?.data?.errors || error?.response?.data?.error);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const refreshToken = (refreshToken: string) => {
    try {
      setLoading(true);
      setError(null);
      AuthService.refreshToken({ refreshToken })
        .then(async (response: any) => {
          if (response?.data) {
            checkLogin(response);
          }
        })
        .catch((error: any) => {
          setError(error?.response?.data?.errors || error?.response?.data?.error);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const logout = () => {
    let keep_logged = localStorage.getItem('keep_logged');
    let user: any = localStorage.getItem('user');
    let refreshToken = '';
    if(keep_logged && user) {
      keep_logged = JSON.parse(keep_logged);
      user = JSON.parse(user);
      refreshToken = user?.refreshToken;
    }
    localStorage.clear();
    
    setUser(undefined);
    navigate("/login");
  };

  const keepLogin = () => {
    let keep_logged = localStorage.getItem('keep_logged');
    let user: any = localStorage.getItem('user');
    let refreshToken = '';
    if(keep_logged && user) {
      keep_logged = JSON.parse(keep_logged);
      user = JSON.parse(user);
      refreshToken = user?.refreshToken;
    }
    if(keep_logged) {
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken)); 
    }
  }

  const update = (value: UserType) => {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    localStorage.setItem('user', JSON.stringify({...user, ...value}));
    setUser(value);
  };

  const checkLogin = async (response: any, isSignUp?:boolean) => {
    let config = {
      headers: {'Authorization': 'Bearer '+ response?.data.accessToken}
    }
    
    const responseProfile = await AuthService.getProfileByUserId(response.data.userId, config);  

    localStorage.setItem("user", JSON.stringify({...response.data, ...responseProfile.data}));
    keepLogin();
    setUser({...response.data, ...responseProfile.data});
    // if(response?.data?.hasPlace) {
    //   return navigate('/');
    // }
    // navigate("/setup-menu");
    if(isSignUp) {
      return navigate('/setup-menu');
    }
    navigate('/');
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
      refreshToken,
      setError,
      update,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

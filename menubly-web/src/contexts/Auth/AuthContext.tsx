import React from 'react';
import { UserType } from 'types/User.type';
import { NormalResponseError } from 'types/Common.type';

interface AuthContextType {
  user?: UserType;
  loading: boolean;
  error?: NormalResponseError;
  setError?: (payload: any) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  update: (value: UserType) => void;
}

const AuthContext = React.createContext<AuthContextType | any>({} as AuthContextType);

export function useAuth() {
  return React.useContext(AuthContext);
}

export default AuthContext;
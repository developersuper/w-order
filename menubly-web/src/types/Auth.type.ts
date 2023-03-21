import {
  IObjectKeys
} from './Common.type';

export type AuthLoginType = {
  username?: string | undefined;
  password: string | undefined;
  firstName?: string | undefined;
  email?: string | undefined;
  keepLogged?: boolean | undefined;
};

export interface AuthLocalStorageType extends IObjectKeys {
  access_token: string | undefined;
  avatar_url: string | undefined;
  name: string | undefined;
  email: string;
  has_login_account: boolean | undefined;
  id: number | undefined;
  time_zone: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  display_name: string | undefined;
  country: string | undefined;
  language: string | undefined;
  dob: string | undefined;
}
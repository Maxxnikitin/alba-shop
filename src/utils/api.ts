import axios, { AxiosResponse } from 'axios';

import { TAuthSetPhone, TAuthSetPhoneRes } from '.';

import { URL } from './constants';

export const checkResponse: <T>(res: Response) => Promise<T> = res => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err: Error) => Promise.reject(err));
};

export const authSetPhone = (data: TAuthSetPhone) =>
  axios.post(`${URL}/auth/otp_request/`, data).then((res: AxiosResponse<TAuthSetPhoneRes>) => {
    if (res.status === 200) {
      return res.data;
    }
    return Promise.reject(res);
  });

import axios, { AxiosResponse } from 'axios';

import { TAuthSetPhone, TAuthSetPhoneRes } from '.';

import { URL } from './constants';
import { TGetFaqDataRes } from './types';

export const checkResponse: <T>(res: AxiosResponse<T>) => T | Promise<T> = res => {
  if (res.status === 200) {
    return res.data;
  }
  return Promise.reject(res);
};

export const authSetPhone = (data: TAuthSetPhone) =>
  axios
    .post(`${URL}/auth/otp_request/`, data)
    .then((res: AxiosResponse<TAuthSetPhoneRes>) => checkResponse(res));

export const getFaqData = () =>
  axios.get(`${URL}/pages/faq/`).then((res: AxiosResponse<TGetFaqDataRes[]>) => checkResponse(res));

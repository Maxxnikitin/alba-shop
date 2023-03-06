import axios, { AxiosResponse } from 'axios';

import { TAuthSetPhoneDto, TAuthSetPhoneRes } from '.';

import { URL } from './constants';

import type { TGetCategoriesRes, TGetFaqDataRes, TGetProductRes } from './types';

export const checkResponse: <T>(res: AxiosResponse<T>) => T | Promise<T> = res => {
  if (res.status === 200) {
    return res.data;
  }
  return Promise.reject(res);
};

export const authSetPhone = (data: TAuthSetPhoneDto) =>
  axios
    .post(`${URL}/auth/otp_request/`, data)
    .then((res: AxiosResponse<TAuthSetPhoneRes>) => checkResponse(res));

export const getFaqData = () =>
  axios.get(`${URL}/pages/faq/`).then((res: AxiosResponse<TGetFaqDataRes[]>) => checkResponse(res));

export const getProduct = (id: string) =>
  axios
    .get(`${URL}/products/${id}/`)
    .then((res: AxiosResponse<TGetProductRes>) => checkResponse(res));

export const getCategories = () =>
  axios
    .get(`${URL}/categories/`)
    .then((res: AxiosResponse<TGetCategoriesRes>) => checkResponse(res));

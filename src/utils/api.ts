import axios, { AxiosResponse } from 'axios';

import { TAuthSetPhoneDto, TAuthSetPhoneRes, URL } from '.';

import type {
  TGetAboutInfoRes,
  TGetCategoriesRes,
  TContacts,
  TGetFaqDataRes,
  TGetProductRes,
  TItemsWithPagination,
  ResWithData,
  TBrand,
  TMainSlide,
} from './types';

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

export const getAboutInfo = () =>
  axios
    .get(`${URL}/pages/about/`)
    .then((res: AxiosResponse<TGetAboutInfoRes>) => checkResponse(res));

export const getContacts = () =>
  axios.get(`${URL}/pages/contacts/`).then((res: AxiosResponse<TContacts>) => checkResponse(res));

export const getLatestItems = (query = '') =>
  axios
    .get(`${URL}/products/latest/${query}`)
    .then((res: AxiosResponse<TItemsWithPagination>) => checkResponse(res));

export const getBestsellersItems = (query = '') =>
  axios
    .get(`${URL}/products/bestsellers/${query}`)
    .then((res: AxiosResponse<TItemsWithPagination>) => checkResponse(res));

export const getDiscountItems = (query = '') =>
  axios
    .get(`${URL}/products/latest/${query}`)
    .then((res: AxiosResponse<TItemsWithPagination>) => checkResponse(res));

export const getBrandsItems = () =>
  axios
    .get(`${URL}/brands/`)
    .then((res: AxiosResponse<ResWithData<TBrand[]>>) => checkResponse(res));

export const getMainSlides = () =>
  axios
    .get(`${URL}/pages/mainslider/`)
    .then((res: AxiosResponse<ResWithData<TMainSlide[]>>) => checkResponse(res));

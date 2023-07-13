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
  TCategory,
  TAuthEmailDto,
  TAuthResult,
  TUser,
  TLoyalties,
  TEditData,
} from './types';

export const checkResponse: <T>(res: AxiosResponse<T>) => T | Promise<T> = res => {
  if (res.status === 200) {
    return res.data;
  }
  return Promise.reject(res);
};

const headersWithAuth = () => ({
  // 'Content-Type': 'application-json',
  Authorization: `Bearer ${localStorage.getItem('access')}`,
});

export const authSetPhone = (data: TAuthSetPhoneDto) =>
  axios
    .post(`${URL}/auth/otp_request/`, data)
    .then((res: AxiosResponse<TAuthSetPhoneRes>) => checkResponse(res));

export const authSetEmail = (data: TAuthEmailDto) =>
  axios
    .post(`${URL}/auth/login/`, data)
    .then((res: AxiosResponse<TAuthResult>) => checkResponse(res));

export const getFaqData = () =>
  axios
    .get(`${URL}/pages/faq/`, {
      headers: headersWithAuth(),
    })
    .then((res: AxiosResponse<TGetFaqDataRes[]>) => checkResponse(res));

export const getProduct = (id: string) =>
  axios
    .get(`${URL}/products/${id}/`, {
      headers: headersWithAuth(),
    })
    .then((res: AxiosResponse<TGetProductRes>) => checkResponse(res));

export const getCategories = () =>
  axios
    .get(`${URL}/categories/`, {
      headers: headersWithAuth(),
    })
    .then((res: AxiosResponse<ResWithData<TGetCategoriesRes>>) => checkResponse(res));

export const getAboutInfo = () =>
  axios
    .get(`${URL}/pages/about/`, {
      headers: headersWithAuth(),
    })
    .then((res: AxiosResponse<TGetAboutInfoRes>) => checkResponse(res));

export const getContacts = () =>
  axios
    .get(`${URL}/pages/contacts/`, {
      headers: headersWithAuth(),
    })
    .then((res: AxiosResponse<ResWithData<TContacts>>) => checkResponse(res));

export const getLatestItems = (query = '') =>
  axios
    .get(`${URL}/products/latest/${query}`, {
      headers: headersWithAuth(),
    })
    .then((res: AxiosResponse<TItemsWithPagination>) => checkResponse(res));

export const getBestsellersItems = (query = '') =>
  axios
    .get(`${URL}/products/bestsellers/${query}`, {
      headers: headersWithAuth(),
    })
    .then((res: AxiosResponse<TItemsWithPagination>) => checkResponse(res));

export const getDiscountItems = (query = '') =>
  axios
    .get(`${URL}/products/discount/${query}`, {
      headers: headersWithAuth(),
    })
    .then((res: AxiosResponse<TItemsWithPagination>) => checkResponse(res));

export const getBrandsItems = () =>
  axios
    .get(`${URL}/brands/`, {
      headers: headersWithAuth(),
    })
    .then((res: AxiosResponse<ResWithData<TBrand[]>>) => checkResponse(res));

export const getBrandCategories = (id: string | number) =>
  axios
    .get(`${URL}/brands/${id}/categories`, {
      headers: headersWithAuth(),
    })
    .then((res: AxiosResponse<ResWithData<TCategory[]>>) => checkResponse(res));

export const getMainSlides = () =>
  axios
    .get(`${URL}/pages/mainslider/`, {
      headers: headersWithAuth(),
    })
    .then((res: AxiosResponse<ResWithData<TMainSlide[]>>) => checkResponse(res));

export const getUser = () =>
  axios
    .get(`${URL}/customers/me/`, {
      headers: headersWithAuth(),
    })
    .then((res: AxiosResponse<ResWithData<TUser>>) => checkResponse(res));

export const getUserLoyalties = () =>
  axios
    .get(`${URL}/pages/loyalties/`, {
      headers: headersWithAuth(),
    })
    .then((res: AxiosResponse<ResWithData<TLoyalties[]>>) => checkResponse(res));

export const updateUserData = (data: TEditData) =>
  axios
    .patch(
      `${URL}/customers/me/update/`,
      { data },
      {
        headers: headersWithAuth(),
      },
    )
    .then((res: AxiosResponse<ResWithData<TUser>>) => checkResponse(res));

export const getFavoriteItems = () =>
  axios
    .get(`${URL}/customers/me/favorites/`, {
      headers: headersWithAuth(),
    })
    .then((res: AxiosResponse<TItemsWithPagination>) => checkResponse(res));

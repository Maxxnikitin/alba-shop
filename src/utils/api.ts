import axios, { AxiosResponse } from 'axios';

import { TAuthSetPhoneDto, TAuthSetPhoneRes, URL } from '.';

import { axiosInstance } from './api-interceptor';

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
  TOrdersWithPagination,
  TCart,
  TConfirmOrderData,
  TOrder,
  TCategoryChild,
  TItemsWithPaginationAndFilters,
  TLiveSearchRes,
  TCartCreate,
  TOrderContent,
} from './types';

export const checkResponse: <T>(res: AxiosResponse<T>) => T | Promise<T> = res => {
  if (res.status.toString().startsWith('2')) {
    return res.data;
  }
  return Promise.reject(res);
};

export const authSetPhone = (data: TAuthSetPhoneDto) =>
  axios
    .post(`${URL}/auth/otp_request/`, data)
    .then((res: AxiosResponse<TAuthSetPhoneRes>) => checkResponse(res));

export const authSetEmail = (data: TAuthEmailDto) =>
  axios
    .post(`${URL}/auth/login/`, data)
    .then((res: AxiosResponse<TAuthResult>) => checkResponse(res));

export const getFaqData = () =>
  axiosInstance
    .get(`${URL}/pages/faq/`)
    .then((res: AxiosResponse<TGetFaqDataRes[]>) => checkResponse(res));

export const getProducts = (id: string | number, ...queries: string[]) => {
  const queryString = '?' + queries.filter(item => item !== '').join('&');

  return axiosInstance
    .get(`${URL}/categories/${id}/products/${queries.length ? queryString : ''}`)
    .then((res: AxiosResponse<TItemsWithPaginationAndFilters>) => checkResponse(res));
};

export const getProduct = (id: string) =>
  axiosInstance
    .get(`${URL}/products/${id}/`)
    .then((res: AxiosResponse<ResWithData<TGetProductRes>>) => checkResponse(res));

export const getCategories = () =>
  axiosInstance
    .get(`${URL}/categories/`)
    .then((res: AxiosResponse<ResWithData<TGetCategoriesRes>>) => checkResponse(res));

export const getCategory = (id: string | number) =>
  axiosInstance
    .get(`${URL}/categories/${id}/`)
    .then((res: AxiosResponse<ResWithData<TCategory>>) => checkResponse(res));

export const getCategoryChilds = (id: string | number) =>
  axiosInstance
    .get(`${URL}/categories/${id}/child/`)
    .then((res: AxiosResponse<ResWithData<TCategoryChild[]>>) => checkResponse(res));

export const getAboutInfo = () =>
  axiosInstance
    .get(`${URL}/pages/about/`)
    .then((res: AxiosResponse<TGetAboutInfoRes>) => checkResponse(res));

export const getContacts = () =>
  axiosInstance
    .get(`${URL}/pages/contacts/`)
    .then((res: AxiosResponse<ResWithData<TContacts>>) => checkResponse(res));

export const getLatestItems = (query = '') =>
  axiosInstance
    .get(`${URL}/products/latest/${query}`)
    .then((res: AxiosResponse<TItemsWithPagination>) => checkResponse(res));

export const getBestsellersItems = (query = '') =>
  axiosInstance
    .get(`${URL}/products/bestsellers/${query}`)
    .then((res: AxiosResponse<TItemsWithPagination>) => checkResponse(res));

export const getDiscountItems = (query = '') =>
  axiosInstance
    .get(`${URL}/products/discount/${query}`)
    .then((res: AxiosResponse<TItemsWithPagination>) => checkResponse(res));

export const getBrandsItems = () =>
  axiosInstance
    .get(`${URL}/brands/`)
    .then((res: AxiosResponse<ResWithData<TBrand[]>>) => checkResponse(res));

export const getBrandCategories = (id: string | number) =>
  axiosInstance
    .get(`${URL}/brands/${id}/categories/`)
    .then((res: AxiosResponse<ResWithData<TCategory[]>>) => checkResponse(res));

export const getMainSlides = () =>
  axiosInstance
    .get(`${URL}/pages/mainslider/`)
    .then((res: AxiosResponse<ResWithData<TMainSlide[]>>) => checkResponse(res));

export const getUser = () =>
  axiosInstance
    .get(`${URL}/customers/me/`)
    .then((res: AxiosResponse<ResWithData<TUser>>) => checkResponse(res));

export const getUserLoyalties = () =>
  axiosInstance
    .get(`${URL}/pages/loyalties/`)
    .then((res: AxiosResponse<ResWithData<TLoyalties[]>>) => checkResponse(res));

export const updateUserData = (data: TEditData) =>
  axiosInstance
    .patch(`${URL}/customers/me/update/`, data)
    .then((res: AxiosResponse<ResWithData<TUser>>) => checkResponse(res));

export const getFavoriteItems = () =>
  axiosInstance
    .get(`${URL}/customers/me/favorites/`)
    .then((res: AxiosResponse<TItemsWithPagination>) => checkResponse(res));

export const getFavoritesCount = () =>
  axiosInstance
    .get(`${URL}/customers/me/favorites/count/`)
    .then((res: AxiosResponse<ResWithData<number>>) => checkResponse(res));

export const setFavorite = (data: Omit<TCartCreate, 'quantity'>) =>
  axiosInstance
    .post(`${URL}/customers/me/favorites/create/`, data)
    .then((res: AxiosResponse<ResWithData<TOrderContent>>) => checkResponse(res));

export const deleteFavorite = (id: string | number) =>
  axiosInstance
    .delete(`${URL}/customers/me/favorites/${id}/delete/`)
    .then((res: AxiosResponse<ResWithData<TOrderContent>>) => checkResponse(res));

export const getCartCount = () =>
  axiosInstance
    .get(`${URL}/cart/positions/count/`)
    .then((res: AxiosResponse<ResWithData<number>>) => checkResponse(res));

export const createCartPosition = (data: TCartCreate) =>
  axiosInstance
    .post(`${URL}/cart/positions/create/`, data)
    .then((res: AxiosResponse<ResWithData<TOrderContent>>) => checkResponse(res));

export const updateCartPosition = ({ characteristic_id, quantity }: TCartCreate) =>
  axiosInstance
    .patch(`${URL}/cart/positions/${characteristic_id}/update/`, { quantity })
    .then((res: AxiosResponse<ResWithData<TOrderContent>>) => checkResponse(res));

export const deleteCartPosition = (id: string | number) =>
  axiosInstance
    .delete(`${URL}/cart/positions/${id}/delete/`)
    .then((res: AxiosResponse<ResWithData<TOrderContent>>) => checkResponse(res));

export const getOrders = () =>
  axiosInstance
    .get(`${URL}/orders/`)
    .then((res: AxiosResponse<TOrdersWithPagination>) => checkResponse(res));

export const getCart = () =>
  axiosInstance
    .get(`${URL}/cart/`)
    .then((res: AxiosResponse<ResWithData<TCart | null>>) => checkResponse(res));

export const createOrder = (data: TConfirmOrderData) =>
  axiosInstance
    .post(`${URL}/orders/create/`, data)
    .then((res: AxiosResponse<ResWithData<TOrder>>) => checkResponse(res));

export const removeCart = () =>
  axiosInstance.delete(`${URL}/cart/delete/`).then((res: AxiosResponse) => checkResponse(res));

export const removeCartItem = (id: string | number) =>
  axiosInstance
    .delete(`${URL}/cart/positions/${id}/delete/`)
    .then((res: AxiosResponse) => checkResponse(res));

export const getSearchLive = (q: string) =>
  axiosInstance
    .get(`${URL}/products/live_search/?q=${q}`)
    .then((res: AxiosResponse<TLiveSearchRes>) => checkResponse(res));

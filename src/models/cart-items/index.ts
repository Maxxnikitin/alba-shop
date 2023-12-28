import { createEffect, createEvent, createStore } from 'effector';

import { updateCartCount, updateCartFx } from '../cart-count';

import { TStore } from '../types';

import {
  ResWithData,
  TCart,
  TCartCreate,
  createCartPosition,
  getCart,
  removeCart,
  updateCartPosition,
  updateCartPositionInCart,
} from '~utils';

export const $cartItemsStore = createStore<TStore<ResWithData<TCart | null>>>({
  status: 'NONE',
  data: null,
  error: null,
});

export const startCartItemsRequest = createEvent();
export const removeCartItems = createEvent();

export const getCartItemsFx = createEffect(async () => {
  startCartItemsRequest();
  const response = await getCart();
  return response;
});

export const updateCartItemsFx = createEffect(async (params: TCartCreate) => {
  startCartItemsRequest();
  const response = await updateCartPositionInCart(params);
  await updateCartFx();
  return response;
});

export const removeCartFx = createEffect(async () => {
  startCartItemsRequest();
  const response = await removeCart();
  updateCartCount(0);
  return response;
});

export const createCartItemsCatalogFx = createEffect(async (params: TCartCreate) => {
  startCartItemsRequest();
  const response = await createCartPosition(params);
  await updateCartFx();
  return response;
});

export const updateCartItemsCatalogFx = createEffect(async (params: TCartCreate) => {
  startCartItemsRequest();
  const response = await updateCartPosition(params);
  await updateCartFx();
  return response;
});

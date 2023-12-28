import { createEffect, createEvent, createStore } from 'effector';

import { TStore } from '../types';

import { TItemsWithPagination, TParams, getFavoriteItems } from '~utils';

export const $favoriteItemsStore = createStore<TStore<TItemsWithPagination>>({
  status: 'NONE',
  data: null,
  error: null,
});

export const startFavoriteItemsRequest = createEvent();
export const removeFavoriteItems = createEvent();

export const getFavoriteItemsFx = createEffect(async ({ queries }: TParams) => {
  startFavoriteItemsRequest();
  const response = await getFavoriteItems(queries);
  return response;
});

export const updateFavoriteItemsBtnFx = createEffect(async ({ queries }: TParams) => {
  startFavoriteItemsRequest();
  const response = await getFavoriteItems(queries);
  return response;
});

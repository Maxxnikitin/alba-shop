import { createEffect, createEvent, createStore } from 'effector';

import { TStore } from '../types';

import { TItemsWithPaginationAndFilters, TParams, getProducts } from '~utils';

export const $catalogItemsStore = createStore<TStore<TItemsWithPaginationAndFilters>>({
  status: 'NONE',
  data: null,
  error: null,
});

export const startItemsRequest = createEvent();
export const updateDataAfterFilters = createEvent<TItemsWithPaginationAndFilters>();
export const updateFiltersAfterFilters = createEvent<TItemsWithPaginationAndFilters>();
export const removeCatalogItems = createEvent();

export const getCatalogItemsFx = createEffect(async ({ id, queries }: TParams) => {
  startItemsRequest();
  const response = await getProducts(id!, ...queries);
  return response;
});

export const updateCatalogItemsBtnFx = createEffect(async ({ id, queries }: TParams) => {
  startItemsRequest();
  const response = await getProducts(id!, ...queries);
  return response;
});

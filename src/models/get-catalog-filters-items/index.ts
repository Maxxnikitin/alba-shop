import { createEffect, createEvent, createStore } from 'effector';

import { updateFiltersAfterFilters } from '../get-catalog-items';
import { TStore } from '../types';

import { TItemsWithPaginationAndFilters, TParams, getProducts } from '~utils';

export const $filtersItemsStore = createStore<TStore<TItemsWithPaginationAndFilters>>({
  status: 'NONE',
  data: null,
  error: null,
});

export const startFiltersRequest = createEvent();
export const removeFilterItems = createEvent();

export const getFiltersItemsFx = createEffect(async ({ id, queries }: TParams) => {
  startFiltersRequest();
  const response = await getProducts(id!, ...queries);
  updateFiltersAfterFilters(response);
  return response;
});
